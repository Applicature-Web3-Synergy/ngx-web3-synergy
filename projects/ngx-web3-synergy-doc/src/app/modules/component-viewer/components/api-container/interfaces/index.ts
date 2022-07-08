import { DocFather } from '../../../../../services/documentation-parser';

export interface ComponentDoc {
  component: string;
  docFather: DocFather;
  constructors?: DocFather[];
  properties?: DocFather[];
  accessors?: DocFather[];
  methods?: DocFather[];
  functions?: DocFather[];
}
