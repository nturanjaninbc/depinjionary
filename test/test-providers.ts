import { CalculatorService } from "@application/calculator/calculator.service";
import { ConsoleLoggerService } from "@application/logger/console/console-logger.service";
import { LoggerInterface } from "@application/logger/logger.interface";
import { LocalStorageInterface } from "@application/storage/local-storage/local-storage.interface";
import { LocalStorageService } from "@application/storage/local-storage/local-storage.service";
import { StorageInterface } from "@application/storage/storage.interface";
import { Provider } from "@container/dto/provider.dto";
import { CalculatorConfig } from "../src/config/calculator-config.dto";

export const mockProviders: Provider[] = [
  {
    provide: ConsoleLoggerService,
  },
  {
    provide: LoggerInterface,
    useClass: ConsoleLoggerService,
  },
  {
    provide: LocalStorageInterface,
    useValue: new class implements LocalStorageInterface {
      getItem(key: string): string | null {
        return '';
      }
      setItem(key: string, value: string): void {}
    },
  },
  {
    provide: LocalStorageService,
    injectTokens: [LocalStorageInterface],
    useFactory: (localStorage: LocalStorageInterface) => {
      return new LocalStorageService(localStorage);
    }
  },
  {
    provide: StorageInterface,
    useClass: LocalStorageService,
  },
  {
    provide: 'CalculatorConfig',
    useValue: { shouldLog: true, shouldStore: true },
  },
  {
    provide: CalculatorService, 
    injectTokens: [LoggerInterface, StorageInterface, 'CalculatorConfig'],
    useFactory: (logger: LoggerInterface, storage: StorageInterface, config: CalculatorConfig) => {
      return new CalculatorService(logger, storage, config);
    }
  },
]
