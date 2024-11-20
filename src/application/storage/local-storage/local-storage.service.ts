import { Injectable } from '@container/decorators/injectable.decorator';
import { StorageInterface } from '../storage.interface';
import { LocalStorageInterface } from './local-storage.interface';

@Injectable()
export class LocalStorageService implements StorageInterface {
  constructor(private readonly localStorage: LocalStorageInterface) {}

  save(value: string): void {
    this.localStorage.setItem('storage', this.get() + value);
  }

  get(): string {
    return this.localStorage.getItem('storage') ?? '';
  }
}
