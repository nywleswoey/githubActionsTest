import { webLightTheme } from '@fluentui/react-components';
import type { Project, Token } from 'tokensStudio';
import { TokenType } from 'tokensStudio';

const themeObj: Record<string, unknown> = { ...webLightTheme };

const template = `
import { Theme, webLightTheme } from '@fluentui/react-components';

export const [[projectName]]Theme: Theme = {
  ...webLightTheme
  [[tokens]]
};`;

const getTemplate = (projName: string) => {
  return template.replace('[[projectName]]', projName);
};

const convertToken = (token: Token) => {
  if (token.type === TokenType.FontWeights) {
    // fontWeight tokens are numeric
    return Number(token.value);
  }

  if (token.type === TokenType.Shadow) {
    return token.value
      .map(shadow => [shadow.x, shadow.y, shadow.blur, shadow.color].join(' '))
      .join(', ');
  }

  return token.value;
};

const convertToFluentUITheme = ({ name, tokenSet }: Project): string => {
  let fileContent = getTemplate(name);
  const overwrittenTokens: string[] = [];

  for (const [tokenName, token] of Object.entries(tokenSet)) {
    const originalValue = themeObj[tokenName];
    if (originalValue === undefined) {
      continue;
    }

    const newValue = convertToken(token);
    if (newValue !== originalValue) {
      console.log({ tokenName, newValue, originalValue });
      overwrittenTokens.push(
        `"${tokenName}":${typeof newValue === 'string' ? `"${newValue}"` : newValue}`
      );
    }
  }

  if (overwrittenTokens.length > 0) {
    fileContent = fileContent.replace('[[tokens]]', ',' + overwrittenTokens.join(','));
  }

  return fileContent;
};

export { convertToFluentUITheme };
