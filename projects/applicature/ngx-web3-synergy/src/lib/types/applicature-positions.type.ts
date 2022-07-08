import { W3S_POSITIONS } from '../enums';
import { W3sEnumsTypeTransformer } from './enums-type-transformer.type';

export type W3sVerticalPosition = W3sEnumsTypeTransformer<W3S_POSITIONS.ABOVE | W3S_POSITIONS.BELOW>;

export type W3sHorizontalPosition = W3sEnumsTypeTransformer<W3S_POSITIONS.BEFORE | W3S_POSITIONS.AFTER>;
