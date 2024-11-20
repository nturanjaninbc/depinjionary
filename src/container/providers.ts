import { Provider } from '@container/dto/provider.dto';
import { App } from '../app';
import { LoggerInterface } from '@application/logger/logger.interface';
import { ConsoleLoggerService } from '@application/logger/console/console-logger.service';
import { LocalStorageInterface } from '@application/storage/local-storage/local-storage.interface';
import { LocalStorageService } from '@application/storage/local-storage/local-storage.service';
import { DocumentInterface } from '@application/storage/cookie/document.interface';
import { CookieStorageService } from '@application/storage/cookie/cookie-storage.service';
import { StorageInterface } from '@application/storage/storage.interface';
import { CalculatorService } from '@application/calculator/calculator.service';
import { CalculatorConfig } from '../config/calculator-config.dto';

export const providers: Provider[] = [
  {
    provide: App,
  },
  {
    provide: ConsoleLoggerService,
  },
  {
    provide: LoggerInterface,
    useClass: ConsoleLoggerService,
  },
  {
    provide: LocalStorageInterface,
    useValue: localStorage,
  },
  {
    provide: LocalStorageService,
    injectTokens: [LocalStorageInterface],
    useFactory: (localStorage: LocalStorageInterface) => {
      return new LocalStorageService(localStorage);
    }
  },
  {
    provide: DocumentInterface,
    useValue: document,
  },
  {
    provide: CookieStorageService,
    injectTokens: [DocumentInterface],
    useFactory: (document: DocumentInterface) => {
      return new CookieStorageService(document);
    }
  },
  {
    provide: StorageInterface,
    useClass: CookieStorageService,
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
