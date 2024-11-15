import { Token } from "@container/types/token.type";

export interface Resolved<T = any> {
  provide: Token;
  resolution: T | undefined;
}
