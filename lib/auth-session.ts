const SESSION_VALUE = "authenticated";
const encoder = new TextEncoder();

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not defined");
  }

  return secret;
}

async function getSigningKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex: string) {
  if (!/^[0-9a-f]{64}$/i.test(hex)) {
    return null;
  }

  return Uint8Array.from(hex.match(/.{2}/g) ?? [], (byte) =>
    Number.parseInt(byte, 16),
  );
}

export async function createSessionToken() {
  const key = await getSigningKey(getAuthSecret());
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(SESSION_VALUE),
  );

  return bytesToHex(new Uint8Array(signature));
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const signature = hexToBytes(token);
  const secret = process.env.AUTH_SECRET;

  if (!signature || !secret) {
    return false;
  }

  const key = await getSigningKey(secret);
  return crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoder.encode(SESSION_VALUE),
  );
}
