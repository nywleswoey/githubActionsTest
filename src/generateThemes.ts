import { writeFileSync } from 'node:fs';

import { convertToFluentUITheme } from 'fluentUI';
import { getProjects } from 'tokensStudio';

const generateFluentUIThemes = async () => {
  const tokenStudioProjects = await getProjects();

  tokenStudioProjects.map(proj => {
    const content = convertToFluentUITheme(proj);
    writeFileSync(`./src/themes/${proj.name}Theme.ts`, content);
  });
};

(async () => {
  await generateFluentUIThemes();
})();
