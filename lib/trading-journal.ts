/** Private, browser-local daily records. Never an exchange performance source. */
export const JOURNAL_KEY = "meanydeany.trading-journal.v1";
export const TRACKING_START = "2026-08-01";
export const MAX_IMPORT_BYTES = 2_000_000;
export type JournalEntry = {
  date: string;
  pnlUsd: number | null;
  returnPct: number | null;
  note: string;
  updatedAt: string;
};
export type Journal = { version: 1; timezone: "UTC"; entries: JournalEntry[] };

export function emptyJournal(): Journal {
  return { version: 1, timezone: "UTC", entries: [] };
}
export function utcDay(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}
export function isDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}
export function parseOptionalNumber(value: string): number | null {
  const text = value.trim();
  if (!text) return null;
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) throw new Error("Enter a number without commas, currency signs or percentages.");
  const number = Number(text);
  if (!Number.isFinite(number) || Math.abs(number) > 1e12) throw new Error("Amount is outside the supported range.");
  return number === 0 ? 0 : number;
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function validNumber(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value) && Math.abs(value) <= 1e12);
}
export function parseJournal(value: unknown, today = utcDay()): Journal {
  if (!record(value) || value.version !== 1 || value.timezone !== "UTC" || !Array.isArray(value.entries) || value.entries.length > 5000) {
    throw new Error("This is not a supported UTC journal backup.");
  }
  const seen = new Set<string>();
  const entries = value.entries.map((item): JournalEntry => {
    if (!record(item) || !isDateKey(item.date) || item.date < TRACKING_START || item.date > today || seen.has(item.date)
      || !validNumber(item.pnlUsd) || !validNumber(item.returnPct) || typeof item.note !== "string" || item.note.length > 3000
      || typeof item.updatedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T.*Z$/.test(item.updatedAt) || !Number.isFinite(Date.parse(item.updatedAt))) {
      throw new Error("Backup contains an invalid, future or duplicate daily record.");
    }
    seen.add(item.date);
    return { date: item.date, pnlUsd: item.pnlUsd === 0 ? 0 : item.pnlUsd, returnPct: item.returnPct === 0 ? 0 : item.returnPct, note: item.note, updatedAt: item.updatedAt };
  });
  return { version: 1, timezone: "UTC", entries: entries.sort((a, b) => a.date.localeCompare(b.date)) };
}
export function calendarDays(month: string): string[] {
  if (!/^\d{4}-\d{2}$/.test(month) || !isDateKey(`${month}-01`)) throw new Error("Invalid month.");
  const first = new Date(`${month}-01T00:00:00Z`);
  const mondayOffset = (first.getUTCDay() + 6) % 7;
  first.setUTCDate(first.getUTCDate() - mondayOffset);
  return Array.from({ length: 42 }, (_, index) => new Date(first.getTime() + index * 86_400_000).toISOString().slice(0, 10));
}
export function shiftMonth(month: string, delta: number): string {
  if (!isDateKey(`${month}-01`) || !Number.isInteger(delta)) throw new Error("Invalid month shift.");
  const date = new Date(`${month}-01T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + delta);
  return date.toISOString().slice(0, 7);
}
export function monthSummary(journal: Journal, month: string) {
  const records = journal.entries.filter((entry) => entry.date.startsWith(`${month}-`));
  const measured = records.filter((entry) => entry.pnlUsd !== null);
  const net = measured.reduce((sum, entry) => sum + (entry.pnlUsd ?? 0), 0);
  return { days: records.length, pnlDays: measured.length, net: measured.length ? net : null, positive: measured.filter(e => e.pnlUsd! > 0).length, negative: measured.filter(e => e.pnlUsd! < 0).length, flat: measured.filter(e => e.pnlUsd === 0).length };
}
export function mergeJournal(current: Journal, incoming: Journal): Journal {
  const byDate = new Map(current.entries.map(entry => [entry.date, entry]));
  for (const entry of incoming.entries) byDate.set(entry.date, entry);
  return parseJournal({ version: 1, timezone: "UTC", entries: [...byDate.values()] });
}
