export interface Resolved<T = any> {
  provide: T | string | symbol;
  resolution: T | undefined;
}
