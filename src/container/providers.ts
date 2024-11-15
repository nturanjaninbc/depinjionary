import { Provider } from '@container/dto/provider.dto';
import { App } from '../app';
import { AsyncShit, BlackBool, ConcreteBlackBool, Config, ConfigToken, MasterChef } from '@application/service';
import { VoiceService } from '@application/voice.service';
import { HelloService } from '@application/hello.service';

export const providers: Provider[] = [
  {
    provide: App,
  },
  {
    provide: HelloService,
  },
  {
    provide: VoiceService,
  },
  {
    provide: ConfigToken,
    useValue: Config,
  },
  {
    provide: MasterChef,
    injectTokens: [ConfigToken],
    useFactory: (config: { hi: string, hey: number }) => {
      return new MasterChef(config);
    }
  },
  {
    provide: AsyncShit,
    useFactory: async () => {
      const as = new AsyncShit();

      await as.init();

      return as;
    }
  },
  {
    provide: ConcreteBlackBool,
  },
  {
    provide: BlackBool,
    useClass: ConcreteBlackBool,
  }
];
