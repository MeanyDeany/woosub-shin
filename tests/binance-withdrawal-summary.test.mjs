import assert from "node:assert/strict";
import test from "node:test";
import { BINANCE_WITHDRAWAL_SUMMARY as s } from "../lib/binance-withdrawal-summary.ts";

test("withdrawal summary is internally consistent", () => {
  assert.equal(s.completed_withdrawal_count, 24);
  assert.equal(s.stablecoin_withdrawal_count + s.xrp_withdrawal_count, s.completed_withdrawal_count);
  assert.equal(s.stablecoin_withdrawal_count, 12);
  assert.equal(s.xrp_withdrawal_count, 12);
  assert.equal(
    Number((s.total_net_sent_usdt_equivalent_estimate + s.withdrawal_fee_usdt_equivalent_estimate).toFixed(8)),
    s.total_account_outflow_usdt_equivalent_estimate,
  );
  assert.ok(s.total_net_sent_usdt_equivalent_estimate > 5900);
  assert.ok(s.total_net_sent_usdt_equivalent_estimate < 6000);
  assert.equal(s.valuation_label, "HISTORICAL_USDT_EQUIVALENT_ESTIMATE");
});
