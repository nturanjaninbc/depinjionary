export interface StorageInterface {
  get(): string;
  save(value: string): void;
}

export const StorageInterface = Symbol('StorageInterface');
