#!/usr/bin/env bash
# Publish only the separate read-only external-withdrawal aggregate.
set -Eeuo pipefail
umask 077
WITHDRAWALS_CODE="${WITHDRAWALS_CODE:?a release checkout is required}"
WITHDRAWALS_EXPECTED_HEAD="${WITHDRAWALS_EXPECTED_HEAD:?a release commit is required}"
if [[ "${WITHDRAWALS_LOCKED:-0}" != 1 ]]; then
  exec /usr/bin/flock -n -E 75 /tmp/binance_external_withdrawals_public.lock \
    /usr/bin/timeout --signal=TERM --kill-after=5s 90s \
    /usr/bin/env WITHDRAWALS_LOCKED=1 /bin/bash "$0"
fi
test "$(git -C "$WITHDRAWALS_CODE" rev-parse HEAD)" = "$WITHDRAWALS_EXPECTED_HEAD"
test -z "$(git -C "$WITHDRAWALS_CODE" status --porcelain)"
WITHDRAWALS_PRIVATE="/home/ubuntu/systematic_execution_gateway_runtime/lifetime_performance_v2/private/external-withdrawals.json"
WITHDRAWALS_WEB="/var/www/btc-public-execution/external-withdrawals.json"
WITHDRAWALS_TMP="/var/www/btc-public-execution/.external-withdrawals.json.tmp.$$"
WITHDRAWALS_CREDS="/etc/systematic_execution_gateway/binance_usdm_read_only_probe.env"
test -f "$WITHDRAWALS_CREDS"
test ! -L "$WITHDRAWALS_CREDS"
trap 'unset BINANCE_USDM_READONLY_API_KEY BINANCE_USDM_READONLY_SECRET_KEY; rm -f -- "$WITHDRAWALS_TMP"' EXIT
set -a
. "$WITHDRAWALS_CREDS"
set +a
/home/ubuntu/systematic_execution_gateway_binance_probe/.venv/bin/python \
  "$WITHDRAWALS_CODE/scripts/publish-binance-withdrawals.py" --output "$WITHDRAWALS_PRIVATE"
unset BINANCE_USDM_READONLY_API_KEY BINANCE_USDM_READONLY_SECRET_KEY
install -m 0644 "$WITHDRAWALS_PRIVATE" "$WITHDRAWALS_TMP"
mv -f -- "$WITHDRAWALS_TMP" "$WITHDRAWALS_WEB"
echo WITHDRAWAL_PUBLICATION_COMPLETE
