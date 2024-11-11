import { Resolved } from '@container/dto/resolved.dto';
import { Provider } from '@container/dto/provider.dto';

export class Container {
  private dependencies: Resolved[] = [];

  constructor(private readonly providers: Provider[]) {}

  async resolve<T>(token: any): Promise<T> {
    let dependency: Resolved | undefined = this.dependencies.find(res => res.provide === token);

    if (dependency) {
      return dependency.resolution as T;
    }

    const provider = this.providers.find((provider: Provider) => provider.provide === token);

    if (!provider) {
      throw new Error('Dependency is not registered');
    }

    if (this.shouldResolveByReflection(provider)) {
      dependency = this.resolveByReflection(provider, token);
    }

    if (this.shouldResolveByFactory(provider)) {
      dependency = await this.resolveByFactory(provider, token);
    }

    if (this.shouldResolveByClass(provider)) {
      dependency = this.resolveByClass(provider, token);
    }

    if (this.shouldResolveByValue(provider)) {
      dependency = this.resolveByValue(provider, token);
    }

    if (!dependency) {
      throw new Error('Dependency is not resolvable');
    }

    this.dependencies.push(dependency);

    return dependency.resolution as T;
  }

  init(): void {
    this.providers.forEach(value => {
      this.resolve(value.provide);
    });
  }

  private shouldResolveByReflection(provider: Provider): boolean {
    return (
      'function' === typeof provider.provide && provider.injectTokens === undefined && provider.useFactory === undefined
    );
  }

  private resolveByReflection(provider: Provider, token: any): Resolved {
    const isInjectable = Reflect.getMetadata('injectable', token);

    if (!isInjectable) {
      throw new Error('Dependency is not injectable: ' + provider.provide.name);
    }

    const paramTypes = Reflect.getMetadata('design:paramtypes', token) ?? [];
    const childrenDep = paramTypes.map((paramType: InstanceType<any>) => {
      return this.resolve(paramType);
    });

    return {
      provide: provider.provide,
      resolution: new provider.provide(...childrenDep),
    };
  }

  private shouldResolveByFactory(provider: Provider): boolean {
    return !!(provider.useFactory && provider.injectTokens);
  }

  private async resolveByFactory(provider: Provider, token: any): Promise<Resolved> {
    const tokens = provider.injectTokens!.map(token => this.resolve(token));

    return {
      provide: token,
      resolution: provider.useFactory!(...tokens),
    };
  }

  private shouldResolveByClass(provider: Provider): boolean {
    return !!provider.useClass;
  }

  private resolveByClass(provider: Provider, token: any): Resolved {
    return {
      provide: token,
      resolution: this.resolve(provider.useClass),
    };
  }

  private shouldResolveByValue(provider: Provider): boolean {
    return !!provider.useValue;
  }

  private resolveByValue(provider: Provider, token: any) {
    return {
      provide: token,
      resolution: provider.useValue,
    };
  }
}
