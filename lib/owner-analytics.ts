export const OWNER_ANALYTICS_STORAGE_KEY =
  "meanydeany.analytics.owner-excluded.v1";
export const OWNER_ANALYTICS_STORAGE_VALUE = "1";

export function markOwnerBrowserExcluded(storage: Storage) {
  storage.setItem(OWNER_ANALYTICS_STORAGE_KEY, OWNER_ANALYTICS_STORAGE_VALUE);
}

export function isOwnerBrowserExcluded(storage: Storage) {
  return (
    storage.getItem(OWNER_ANALYTICS_STORAGE_KEY) ===
    OWNER_ANALYTICS_STORAGE_VALUE
  );
}
