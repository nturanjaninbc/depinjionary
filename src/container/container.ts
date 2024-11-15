import { Resolved } from '@container/dto/resolved.dto';
import { Provider } from '@container/dto/provider.dto';
import { Token } from './types/token.type';
import { ResolverFactory } from './resolvers/resolver.factory';

export class Container {
  private dependencies: Resolved[] = [];

  constructor(private readonly providers: Provider[]) {}

  async resolve<T>(token: Token): Promise<T> {
    let dependency: Resolved | undefined = this.dependencies.find(res => res.provide === token);

    if (dependency) {
      return dependency.resolution as T;
    }

    const provider = this.providers.find((provider: Provider) => provider.provide === token);

    if (!provider) {
      throw new Error('Dependency is not registered');
    }

    const resolver = ResolverFactory.byProvider(provider);

    dependency = await resolver.resolve(provider, token);

    if (!dependency) {
      throw new Error('Dependency is not resolvable');
    }

    this.dependencies.push(dependency);

    return dependency.resolution as T;
  }
}
