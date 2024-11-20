import { LoggerInterface } from "@application/logger/logger.interface";
import { StorageInterface } from "@application/storage/storage.interface";
import { CalculatorConfig } from "../../config/calculator-config";
import { Injectable } from "@container/decorators/injectable.decorator";

@Injectable()
export class CalculatorService {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly storage: StorageInterface,
    private readonly config: CalculatorConfig
  ) {
  }

  add(a: number, b: number): number {
    const result = a + b;

    if (this.config.shouldLog) {
      this.logger.log(`${a} plus ${b} equals ${result}`);
    }

    if (this.config.shouldStore) {
      this.storage.save(`|${a} + ${b} = ${result}|`)
    }

    return result;
  }

  sub(a: number, b: number): number {
    const result = a - b;

    if (this.config.shouldLog) {
      this.logger.log(`${a} minus ${b} equals ${result}`);
    }

    if (this.config.shouldStore) {
      this.storage.save(`|${a} - ${b} = ${result}|`)
    }

    return result;
  }

  showHistory(): void {
    const history: string = this.storage.get();

    this.logger.debug(history);
  }
}
