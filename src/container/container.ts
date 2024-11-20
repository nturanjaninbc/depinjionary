import { Resolved } from '@container/dto/resolved.dto';
import { Provider } from '@container/dto/provider.dto';
import { Token } from './types/token.type';
import { ResolverFactory } from './resolvers/resolver.factory';

export class Container {
  private dependencies: Map<Token, Resolved> = new Map<Token, Resolved>();
  private providers: Map<Token, Provider> = new Map<Token, Provider>();

  constructor(providers: Provider[]) {
    providers.forEach((provider) => {
      this.providers.set(provider.provide, provider)
    })
  }

  async resolve<T>(token: Token): Promise<T> {
    let dependency: Resolved | undefined = this.dependencies.get(token);

    if (dependency) {
      return dependency.resolution as T;
    }

    const provider = this.providers.get(token);

    if (!provider) {
      throw new Error('Dependency is not registered');
    }

    const resolver = ResolverFactory.byProvider(provider);

    dependency = await resolver.resolve(provider, token);

    if (!dependency) {
      throw new Error('Dependency is not resolvable');
    }

    this.dependencies.set(token, dependency);

    return dependency.resolution as T;
  }
}
