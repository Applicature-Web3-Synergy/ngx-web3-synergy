import { CODE_TYPES } from '../enums';

export interface CodeConfig {
  code: string;
  lang: CODE_TYPES | string;
}
