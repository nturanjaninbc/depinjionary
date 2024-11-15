import { Resolved } from '@container/dto/resolved.dto';
import { Provider } from '@container/dto/provider.dto';
import { Token } from './types/token.type';
import { ResolverFactory } from './resolvers/resolver.factory';
import { Type } from './enums/type.enum';

export class Container {
  private dependencies: Resolved[] = [];

  constructor(private readonly providers: Provider[]) {}

  async resolve<T>(token: Token): Promise<T> {
    const resolveType: Type = this.getResolutionType(token);

    switch (resolveType) {
      case Type.TRANSIENT:
        return this.resolveAsTransient<T>(token);
      case Type.SINGLETON:
      default:
        return this.resolveAsSingleton<T>(token);
    }
  }

  private async resolveAsSingleton<T>(token: Token): Promise<T> {
    let dependency: Resolved | undefined = this.dependencies.find(res => res.provide === token);

    if (dependency) {
      return dependency.resolution as T;
    }

    dependency = await this.getResolved<T>(token);

    this.dependencies.push(dependency);

    return dependency.resolution;
  }

  async resolveAsTransient<T>(token: Token): Promise<T> {
    const dependency = await this.getResolved<T>(token);

    return dependency.resolution;
  }

  private async getResolved<T>(token: Token): Promise<Resolved<T>>
  {
    const a = this.providers[6].provide;

    const provider = this.providers.find((provider: Provider) => provider.provide === token);

    if (!provider) {
      throw new Error('Dependency is not registered');
    }

    const resolver = ResolverFactory.byProvider(provider);

    const dependency = await resolver.resolve<T>(provider, token);

    if (!dependency) {
      throw new Error('Dependency is not resolvable');
    }

    return dependency;
  }

  private getResolutionType(token: Token): Type {
    let type: Type;

    try {
      type = Reflect.getMetadata('type', token);
    } catch(error) {
      type = Type.SINGLETON;
    }

    return type;
  }
}
