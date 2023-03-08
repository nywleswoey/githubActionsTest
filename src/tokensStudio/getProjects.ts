import { tokenSetOrder } from '../../tokens/$metadata.json';
import themes from '../../tokens/$themes.json';
import { TokenSetCache } from './tokenSetCache';
import { Project, TokenSet } from './types';

const sortThemeTokenSetsFunc = (a: string, b: string) => {
  const indexA = tokenSetOrder.indexOf(a);
  const indexB = tokenSetOrder.indexOf(b);

  return indexA - indexB;
};

const mergeTokenSets = async (tokenSetPaths: string[], cache: TokenSetCache) => {
  let mergedTokenSet: TokenSet = {};

  for (const tokenSetPath of tokenSetPaths) {
    const tokenSet = await cache.get(tokenSetPath);

    mergedTokenSet = { ...mergedTokenSet, ...tokenSet };
  }

  return mergedTokenSet;
};

const getProjects = async (): Promise<Project[]> => {
  const tokenSetCache = new TokenSetCache();

  const projects: Project[] = [];
  for (const theme of themes) {
    const tokenSetPaths = Object.keys(theme.selectedTokenSets).sort(sortThemeTokenSetsFunc);
    projects.push({
      name: theme.name,
      tokenSet: await mergeTokenSets(tokenSetPaths, tokenSetCache)
    });
  }

  return projects;
};

export { getProjects };
