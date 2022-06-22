import { AUC_TRANSFER_STEPS } from '../enums';
import { EnumsTypeTransformer } from '../../../types';

export type AucTransactionStep = AUC_TRANSFER_STEPS.APPROVE | AUC_TRANSFER_STEPS.CONFIRM;
