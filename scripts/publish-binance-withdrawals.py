#!/usr/bin/env python3
"""Read completed Binance withdrawals and publish an aggregate without identifiers."""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
from decimal import Decimal
import hashlib
import hmac
import json
import os
from pathlib import Path
import re
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

BASELINE_LAST = "2026-09-25T05:29:15Z"
BASELINE_COUNT = 24
BASELINE_NET = Decimal("5933.10577308")
BASELINE_FEE = Decimal("9.76783582")
BASELINE_FIRST = "2025-04-12T22:44:30Z"
ALLOWED_PATHS = {"/api/v3/time", "/api/v3/klines", "/sapi/v1/capital/withdraw/history"}
WINDOW_MS = 89 * 86400000


def utc_ms(value: str) -> int:
    return int(datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp() * 1000)


def utc_text(value: int) -> str:
    return datetime.fromtimestamp(value / 1000, timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def positive_decimal(value: object, *, allow_zero: bool = False) -> Decimal:
    if not isinstance(value, str):
        raise ValueError("INVALID_SOURCE_AMOUNT")
    result = Decimal(value)
    if not result.is_finite() or result < 0 or (not allow_zero and result == 0):
        raise ValueError("INVALID_SOURCE_AMOUNT")
    return result


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise ValueError("SOURCE_REDIRECT_REFUSED")


class BinanceReader:
    def __init__(self):
        self.key = os.environ["BINANCE_USDM_READONLY_API_KEY"]
        self.secret = os.environ["BINANCE_USDM_READONLY_SECRET_KEY"].encode()
        self.opener = urllib.request.build_opener(NoRedirect())
        clock = self.get("/api/v3/time", {})
        if not isinstance(clock, dict) or type(clock.get("serverTime")) is not int:
            raise ValueError("INVALID_SOURCE_CLOCK")
        self.server_ms = clock["serverTime"]
        self.started = time.monotonic()

    def get(self, path: str, params: dict):
        if path not in ALLOWED_PATHS:
            raise ValueError("READ_ONLY_PATH_REFUSED")
        headers = {}
        params = dict(params)
        if path.startswith("/sapi/"):
            params.update(timestamp=self.server_ms + int((time.monotonic() - self.started) * 1000), recvWindow=5000)
            headers["X-MBX-APIKEY"] = self.key
        query = urllib.parse.urlencode(params)
        if headers:
            query += "&signature=" + hmac.new(self.secret, query.encode(), hashlib.sha256).hexdigest()
        request = urllib.request.Request("https://api.binance.com" + path + "?" + query, headers=headers, method="GET")
        try:
            with self.opener.open(request, timeout=10) as response:
                raw = response.read(4 * 1024 * 1024 + 1)
                if len(raw) > 4 * 1024 * 1024:
                    raise ValueError("SOURCE_RESPONSE_TOO_LARGE")
                return json.loads(raw)
        except urllib.error.HTTPError as exc:
            # Never log request URLs, signatures, API headers or raw exchange responses.
            raise ValueError("SOURCE_HTTP_" + str(exc.code)) from None
        except urllib.error.URLError:
            raise ValueError("SOURCE_CONNECTION_FAILED") from None

    def withdrawals(self):
        rows = []
        start = utc_ms(BASELINE_LAST) + 1000
        for _ in range(32):
            if start > self.server_ms:
                return rows
            end = min(start + WINDOW_MS - 1, self.server_ms)
            for page in range(20):
                data = self.get("/sapi/v1/capital/withdraw/history", {"startTime": start, "endTime": end, "offset": page * 1000, "limit": 1000})
                if not isinstance(data, list) or len(data) > 1000:
                    raise ValueError("INVALID_WITHDRAWAL_RESPONSE")
                rows.extend(data)
                if len(data) < 1000:
                    break
            else:
                raise ValueError("WITHDRAWAL_PAGE_LIMIT")
            start = end + 1
        raise ValueError("WITHDRAWAL_WINDOW_LIMIT")

    def price(self, coin: str, applied_ms: int) -> Decimal:
        if not re.fullmatch(r"[A-Z0-9]{1,20}", coin):
            raise ValueError("INVALID_SOURCE_ASSET")
        minute = applied_ms // 60000 * 60000
        data = self.get("/api/v3/klines", {"symbol": coin + "USDT", "interval": "1m", "startTime": minute, "endTime": minute + 59999, "limit": 1})
        if not isinstance(data, list) or len(data) != 1 or len(data[0]) < 7:
            raise ValueError("ASSET_VALUATION_UNAVAILABLE")
        row = data[0]
        if type(row[0]) is not int or row[0] != minute or type(row[6]) is not int or row[6] >= self.server_ms:
            raise ValueError("CLOSED_VALUATION_BAR_UNAVAILABLE")
        return positive_decimal(row[4])


def project(rows: list, observed_ms: int, price) -> dict:
    seen = {}
    live_net = Decimal(0)
    live_fee = Decimal(0)
    count = market_count = 0
    last = utc_ms(BASELINE_LAST)
    for row in rows:
        if not isinstance(row, dict) or not isinstance(row.get("id"), str) or not row["id"]:
            raise ValueError("INVALID_WITHDRAWAL_ID")
        identity = (row.get("coin"), row.get("amount"), row.get("transactionFee"), row.get("status"), row.get("applyTime"), row.get("transferType"))
        if row["id"] in seen:
            if seen[row["id"]] != identity:
                raise ValueError("CONFLICTING_WITHDRAWAL_ROWS")
            continue
        seen[row["id"]] = identity
        if type(row.get("status")) is not int or type(row.get("transferType")) is not int or row["transferType"] not in (0, 1):
            raise ValueError("INVALID_WITHDRAWAL_STATUS")
        applied = int(datetime.strptime(row["applyTime"], "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc).timestamp() * 1000)
        if applied <= utc_ms(BASELINE_LAST):
            continue
        if applied > observed_ms:
            raise ValueError("WITHDRAWAL_OUTSIDE_OBSERVATION")
        if row["status"] != 6 or row["transferType"] != 0:
            continue
        amount = positive_decimal(row["amount"])
        fee = positive_decimal(row["transactionFee"], allow_zero=True)
        coin = row["coin"]
        if not isinstance(coin, str) or not re.fullmatch(r"[A-Z0-9]{1,20}", coin):
            raise ValueError("INVALID_SOURCE_ASSET")
        rate = Decimal(1) if coin in ("USDT", "USDC") else price(coin, applied)
        if not isinstance(rate, Decimal) or not rate.is_finite() or rate <= 0:
            raise ValueError("INVALID_ASSET_VALUATION")
        live_net += amount * rate
        live_fee += fee * rate
        count += 1
        market_count += coin not in ("USDT", "USDC")
        last = max(last, applied)
    number = lambda value: float(value.quantize(Decimal("0.00000001")))
    payload = {
        "schema_version": 1,
        "dataset_id": "binance_public_external_withdrawals_v1",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z"),
        "observed_at_utc": utc_text(observed_ms),
        "coverage_start_utc": BASELINE_FIRST,
        "historical_base_through_utc": BASELINE_LAST,
        "last_withdrawal_at_utc": utc_text(last),
        "completed_withdrawal_count": BASELINE_COUNT + count,
        "live_completed_withdrawal_count": count,
        "live_market_valued_withdrawal_count": market_count,
        "total_net_sent_usdt_equivalent_estimate": number(BASELINE_NET + live_net),
        "withdrawal_fee_usdt_equivalent_estimate": number(BASELINE_FEE + live_fee),
        "total_account_outflow_usdt_equivalent_estimate": number(BASELINE_NET + BASELINE_FEE + live_net + live_fee),
        "valuation_label": "HISTORICAL_USDT_EQUIVALENT_ESTIMATE",
        "live_valuation_method": "STABLECOIN_PAR_OTHER_ASSETS_APPLY_TIME_1M_CLOSE_ESTIMATE",
        "freshness_ttl_seconds": 900,
        "external_action_permitted": False,
    }
    payload["telemetry_sha256"] = hashlib.sha256(json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    return payload


def atomic_publish(output: Path, payload: dict):
    if output.is_symlink():
        raise ValueError("SYMLINK_OUTPUT_REFUSED")
    if output.exists():
        previous = json.loads(output.read_text())
        if payload["completed_withdrawal_count"] < previous["completed_withdrawal_count"] or utc_ms(payload["observed_at_utc"]) < utc_ms(previous["observed_at_utc"]):
            raise ValueError("WITHDRAWAL_REGRESSION_REFUSED")
    with tempfile.NamedTemporaryFile(mode="w", dir=output.parent, delete=False) as handle:
        temporary = Path(handle.name)
        try:
            json.dump(payload, handle, sort_keys=True, separators=(",", ":"), allow_nan=False)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
            temporary.replace(output)
        finally:
            temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    os.umask(0o077)
    try:
        reader = BinanceReader()
        payload = project(reader.withdrawals(), reader.server_ms, reader.price)
        atomic_publish(args.output, payload)
    except Exception as exc:
        reason = str(exc) if isinstance(exc, ValueError) and re.fullmatch(r"[A-Z_0-9]+", str(exc)) else "WITHDRAWAL_REFRESH_FAILED"
        print(json.dumps({"status": "WITHDRAWAL_REFRESH_FAILED", "reason": reason}))
        return 1
    print(json.dumps({"status": "WITHDRAWAL_REFRESH_COMPLETE", "completed_withdrawal_count": payload["completed_withdrawal_count"], "observed_at_utc": payload["observed_at_utc"], "total_account_outflow_usdt_equivalent_estimate": payload["total_account_outflow_usdt_equivalent_estimate"]}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
