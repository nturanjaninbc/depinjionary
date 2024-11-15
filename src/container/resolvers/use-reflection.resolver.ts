import { Provider } from "@container/dto/provider.dto";
import { ResolverInterface } from "./resolver.interface";
import { Resolved } from "@container/dto/resolved.dto";
import { Token } from "@container/types/token.type";
import { ContainerResolver } from "@container/container-resolver";

export class UseReflectionResolver implements ResolverInterface {
  shouldResolve(provider: Provider): boolean {
    return (
      'function' === typeof provider.provide && provider.injectTokens === undefined && provider.useFactory === undefined
    );
  }

  async resolve<T>(provider: Provider<T>, token: Token): Promise<Resolved<T>> {
    const isInjectable = Reflect.getMetadata('injectable', token);

    if (!isInjectable) {
      throw new Error('Dependency is not injectable: ' + provider.provide.name);
    }
    
    const paramTypes = Reflect.getMetadata('design:paramtypes', token) ?? [];

    const childrenDep = paramTypes.map((paramType: InstanceType<any>) => {
      return ContainerResolver.get().resolve(paramType);
    });

    const dependencies = await Promise.all(childrenDep);

    return {
      provide: provider.provide,
      resolution: new provider.provide(...dependencies),
    };
  }
}