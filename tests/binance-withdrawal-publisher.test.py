"""Offline tests only. No exchange credentials or requests are used."""
from decimal import Decimal
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("withdrawals", Path(__file__).resolve().parents[1] / "scripts/publish-binance-withdrawals.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def withdrawal(**changes):
    row = {"id": "synthetic", "coin": "USDC", "amount": "39.5", "transactionFee": "0.5", "status": 6, "transferType": 0, "applyTime": "2026-10-10 08:15:34", "address": "private-address", "txId": "private-txid"}
    row.update(changes)
    return row


class PublisherTests(unittest.TestCase):
    observed = module.utc_ms("2026-10-10T08:30:00Z")

    def project(self, rows, price=lambda *args: Decimal("2")):
        return module.project(rows, self.observed, price)

    def test_completed_withdrawal_adds_sent_amount_and_fee_once(self):
        row = withdrawal()
        result = self.project([row, dict(row)])
        self.assertEqual(result["completed_withdrawal_count"], 25)
        self.assertEqual(result["total_net_sent_usdt_equivalent_estimate"], 5972.60577308)
        self.assertEqual(result["withdrawal_fee_usdt_equivalent_estimate"], 10.26783582)
        self.assertEqual(result["total_account_outflow_usdt_equivalent_estimate"], 5982.8736089)

    def test_pending_rejected_internal_and_baseline_are_excluded(self):
        result = self.project([withdrawal(id="pending", status=4), withdrawal(id="rejected", status=3), withdrawal(id="internal", transferType=1), withdrawal(id="baseline", applyTime="2026-09-25 05:29:15")])
        self.assertEqual(result["completed_withdrawal_count"], 24)
        self.assertEqual(result["total_account_outflow_usdt_equivalent_estimate"], 5942.8736089)

    def test_conflicting_duplicates_fail(self):
        with self.assertRaises(ValueError):
            self.project([withdrawal(), withdrawal(amount="40")])

    def test_invalid_amounts_fail(self):
        for amount in ["NaN", "Infinity", "-1", "0", 39.5]:
            with self.subTest(amount=amount), self.assertRaises(ValueError):
                self.project([withdrawal(amount=amount)])

    def test_nonstablecoin_uses_historical_price_and_is_an_estimate(self):
        calls = []
        def price(coin, applied):
            calls.append((coin, applied))
            return Decimal("2")
        result = self.project([withdrawal(coin="XRP", amount="10", transactionFee="0.1")], price)
        self.assertEqual(result["live_market_valued_withdrawal_count"], 1)
        self.assertEqual(result["total_account_outflow_usdt_equivalent_estimate"], 5963.0736089)
        self.assertEqual(calls[0][0], "XRP")

    def test_privacy_and_payload_checksum(self):
        result = self.project([withdrawal()])
        checksum = result.pop("telemetry_sha256")
        text = json.dumps(result, sort_keys=True, separators=(",", ":"))
        self.assertNotIn("private-address", text)
        self.assertNotIn("private-txid", text)
        self.assertNotIn("synthetic", text)
        self.assertEqual(checksum, hashlib.sha256(text.encode()).hexdigest())
        self.assertIs(result["external_action_permitted"], False)

    def test_regression_leaves_previous_publication_unchanged(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "withdrawals.json"
            module.atomic_publish(output, self.project([withdrawal()]))
            before = output.read_bytes()
            with self.assertRaises(ValueError):
                module.atomic_publish(output, self.project([]))
            self.assertEqual(output.read_bytes(), before)

    def test_network_allowlist_rejects_mutation_endpoints(self):
        reader = object.__new__(module.BinanceReader)
        with self.assertRaises(ValueError):
            reader.get("/sapi/v1/capital/withdraw/apply", {})


if __name__ == "__main__":
    unittest.main()
