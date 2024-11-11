import 'reflect-metadata'
import { App } from './src/app';
import { Provider } from "@container/dto/provider.dto";
import { providers } from "@container/providers";
import { ContainerResolver } from '@container/container-resolver';

(async (providers: Provider[]) => {
  const container = ContainerResolver.init(providers);

  const app = await container.resolve<App>(App);
  app.run();
})(providers);
