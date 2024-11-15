import { Constructable } from "@container/types/constructable.type";
import { Token } from "@container/types/token.type";

export interface Provider<T = any> {
  provide: Token;
  useClass?: Constructable<T>;
  useValue?: T;
  injectTokens?: Token[];
  useFactory?: (...args: any[]) => T;
}
