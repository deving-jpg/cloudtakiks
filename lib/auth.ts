import { cookies } from "next/headers";
import crypto from "crypto";

// Set ADMIN_PASSWORD in .env.local to override this default.
const PASSWORD = process.env.ADMIN_PASSWORD || "cloudtaktiks";

export const COOKIE = "ct_admin";

export function tokenFor(pw: string): string {
  return crypto.createHash("sha256").update(`${pw}::ct-admin-v1`).digest("hex");
}

const EXPECTED = tokenFor(PASSWORD);

export function checkPassword(pw: string): boolean {
  return pw === PASSWORD;
}

/** The cookie value to set after a correct password. */
export function sessionToken(): string {
  return EXPECTED;
}

/** True if the current request carries a valid admin session cookie. */
export function isAuthed(): boolean {
  return cookies().get(COOKIE)?.value === EXPECTED;
}
