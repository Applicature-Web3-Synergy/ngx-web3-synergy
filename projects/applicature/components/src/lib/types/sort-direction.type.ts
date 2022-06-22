import { AUC_SORT_DIRECTION } from '../enums';
import { EnumsTypeTransformer } from './enums-type-transformer.type';

export type AucSortDirection = EnumsTypeTransformer<AUC_SORT_DIRECTION.ASC | AUC_SORT_DIRECTION.DESC>;
