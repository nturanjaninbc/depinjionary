import { Injectable } from '@container/decorators/injectable.decorator';
import { StorageInterface } from '../storage.interface';
import { DocumentInterface } from './document.interface';

@Injectable()
export class CookieStorageService implements StorageInterface {
  constructor(private readonly document: DocumentInterface) {}

  save(value: string): void {
    this.document.cookie = 'storage=' + this.get() + value;
  }

  get(): string {
    const cookieMatchRegEx = '(?:^|; )storage=([^;]*)';
    const matches = this.document.cookie.match(new RegExp(cookieMatchRegEx));

    if (!matches) {
      return '';
    }

    if (!decodeURIComponent(matches[1])) {
      return '';
    }

    return decodeURIComponent(matches[1]);
  }
}
