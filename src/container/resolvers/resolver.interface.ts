import { Provider } from "@container/dto/provider.dto";
import { Resolved } from "@container/dto/resolved.dto";
import { Token } from "@container/types/token.type";

export interface ResolverInterface {
  resolve:<T>(provider: Provider, token: Token) => Promise<Resolved<T>>;
  shouldResolve: (provider: Provider) => boolean;
}
