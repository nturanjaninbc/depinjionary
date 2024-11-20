import { Injectable } from "@container/decorators/injectable.decorator";
import { LoggerInterface } from "../logger.interface";

@Injectable()
export class ConsoleLoggerService implements LoggerInterface {
  debug(data: string): void {
    console.log('[DEBUG] ' + data);
  }

  log(data: string): void {
    console.log('[LOG] ' + data);
  }
}
