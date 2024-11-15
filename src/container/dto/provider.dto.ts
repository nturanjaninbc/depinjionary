import { Token } from "@container/types/token.type";

export interface Provider<T = any> {
  provide: Token<T>;
  useClass?: T;
  useValue?: T;
  injectTokens?: Token[];
  useFactory?: (...args: any[]) => T;
}
