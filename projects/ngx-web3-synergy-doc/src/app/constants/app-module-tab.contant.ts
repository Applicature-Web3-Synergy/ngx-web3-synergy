import { ExampleCardTab } from '../modules/example-card/interfaces';
import { AppModuleComponentsConnectionCodeConstant } from './app-module-components-connection-code.constant';
import { CODE_TYPES } from '../modules/code-example/enums';

export const AppModuleTab: ExampleCardTab = {
  title: 'app.module.ts',
  code: {
    code: AppModuleComponentsConnectionCodeConstant,
    lang: CODE_TYPES.JS
  }
};
