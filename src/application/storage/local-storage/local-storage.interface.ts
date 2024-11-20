export interface LocalStorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const LocalStorageInterface = Symbol('LocalStorageInterface');
