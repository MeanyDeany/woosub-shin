import assert from "node:assert/strict";
import test from "node:test";

import {
  isOwnerBrowserExcluded,
  markOwnerBrowserExcluded,
  OWNER_ANALYTICS_STORAGE_KEY,
} from "../lib/owner-analytics.ts";

function fakeStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}

test("authenticated admin visit can mark this browser as owner-excluded", () => {
  const storage = fakeStorage();
  assert.equal(isOwnerBrowserExcluded(storage), false);
  markOwnerBrowserExcluded(storage);
  assert.equal(storage.getItem(OWNER_ANALYTICS_STORAGE_KEY), "1");
  assert.equal(isOwnerBrowserExcluded(storage), true);
});
