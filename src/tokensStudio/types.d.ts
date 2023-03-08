import { TokenType } from './tokenType';

type Shadow = {
  color: string;
  type: string;
  x: string;
  y: string;
  blur: string;
  spread: string;
};

type Typography = {
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  fontSize: string;
  letterSpacing: string;
  paragraphSpacing: string;
  paragraphIndent: string;
  textCase: string;
  textDecoration: string;
};

type TokenTypesWithStrValue = Exclude<TokenType, TokenType.Shadow | TokenType.Typography>;

type Token =
  | { type: TokenType.Shadow; value: [Shadow, Shadow] }
  | { type: TokenType.Typography; value: Typography }
  | { type: TokenTypesWithStrValue; value: string };

type TokenSet = Record<string, Token>;

type Project = { name: string; tokenSet: TokenSet };

export type { Shadow, Token, TokenSet, Project };
