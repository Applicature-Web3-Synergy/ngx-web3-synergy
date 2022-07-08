import { W3S_SORT_DIRECTION } from '../enums';
import { W3sEnumsTypeTransformer } from './enums-type-transformer.type';

export type W3sSortDirection = W3sEnumsTypeTransformer<W3S_SORT_DIRECTION.ASC | W3S_SORT_DIRECTION.DESC>;
