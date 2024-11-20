export interface LoggerInterface {
  debug(data: string): void;
  log(data: string): void;
}

export const LoggerInterface = Symbol('LoggerInterface');
