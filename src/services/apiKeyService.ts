let apiKey: string | null = null;

export function setApiKey(key: string): void {
  if (key && key.trim()) {
    apiKey = key.trim();
  }
}

export function getApiKey(): string | null {
  return apiKey;
}
