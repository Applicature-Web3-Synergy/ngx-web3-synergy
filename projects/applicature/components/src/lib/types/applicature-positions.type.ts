import { AUC_POSITIONS } from '../enums';
import { EnumsTypeTransformer } from './enums-type-transformer.type';

export type AucVerticalPosition = EnumsTypeTransformer<AUC_POSITIONS.ABOVE | AUC_POSITIONS.BELOW>;

export type AucHorizontalPosition = EnumsTypeTransformer<AUC_POSITIONS.BEFORE | AUC_POSITIONS.AFTER>;
