const API_KEY_SESSION_STORAGE = 'gemini-api-key';

export function setApiKey(key: string): void {
  if (key && key.trim()) {
    sessionStorage.setItem(API_KEY_SESSION_STORAGE, key.trim());
  }
}

export function getApiKey(): string | null {
  return sessionStorage.getItem(API_KEY_SESSION_STORAGE);
}
