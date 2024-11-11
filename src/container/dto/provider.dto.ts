export interface Provider<T = any> {
  provide: T | string | symbol;
  useClass?: T;
  useValue?: any;
  injectTokens?: (T | string)[];
  useFactory?: (...args: any[]) => T;
}
