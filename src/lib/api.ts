export const AUTH_API = "https://functions.poehali.dev/594402c3-9853-4c14-a1a8-341075f31ccf";
export const CABINET_API = "https://functions.poehali.dev/ed55853b-bfc3-4b2d-a223-f0accbd0d123";

export const SESSION_KEY = "kwt_session_token";

export function getSessionToken(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function setSessionToken(token: string) {
  localStorage.setItem(SESSION_KEY, token);
}

export function clearSessionToken() {
  localStorage.removeItem(SESSION_KEY);
}
