import { tokenStudioRelativePath } from 'config';

import type { TokenSet } from './types';

type TokenSetModule = { default: TokenSet };

export class TokenSetCache {
  private cache: Map<string, TokenSet>;

  constructor() {
    this.cache = new Map();
  }

  async get(path: string): Promise<TokenSet> {
    let tokenSet = this.cache.get(path);
    if (!tokenSet) {
      const module = (await import(`${tokenStudioRelativePath}/${path}.json`)) as TokenSetModule;
      tokenSet = module.default;
      this.cache.set(path, tokenSet);
    }

    return tokenSet;
  }
}
