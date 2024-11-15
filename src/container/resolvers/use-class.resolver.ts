import { Provider } from "@container/dto/provider.dto";
import { ResolverInterface } from "./resolver.interface";
import { Resolved } from "@container/dto/resolved.dto";
import { ContainerResolver } from "@container/container-resolver";
import { Token } from "@container/types/token.type";

export class UseClassResolver implements ResolverInterface {
  shouldResolve(provider: Provider): boolean {
    return !!provider.useClass;
  }

  async resolve<T>(provider: Provider<T>, token: Token): Promise<Resolved<T>> {
    const resolution = await ContainerResolver.get().resolve<T>(provider.useClass)

    return {
      provide: token,
      resolution: resolution,
    };
  }
}