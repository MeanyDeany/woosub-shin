export const TRAFFIC_ADMIN_USERNAME = "meanydeany";

const DEFAULT_PASSWORD_SHA256 =
  "64a52b5c32b0e46cecfe0511a86404bdc6057617ef8dad92ea015e9a7fa84c0d";

function expectedPasswordHash() {
  const configured = process.env.ADMIN_TRAFFIC_PASSWORD_SHA256?.trim().toLowerCase();
  return configured && /^[0-9a-f]{64}$/.test(configured)
    ? configured
    : DEFAULT_PASSWORD_SHA256;
}

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function constantTimeTextEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return mismatch === 0;
}

function decodeBasicCredentials(header: string) {
  if (!header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6).trim());
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export async function verifyTrafficAdminAuthorization(
  authorization: string | null,
) {
  if (!authorization) return false;
  const credentials = decodeBasicCredentials(authorization);
  if (!credentials) return false;
  if (!constantTimeTextEqual(credentials.username, TRAFFIC_ADMIN_USERNAME)) {
    return false;
  }
  const candidateHash = await sha256Hex(credentials.password);
  return constantTimeTextEqual(candidateHash, expectedPasswordHash());
}
