import { AUC_ALERT_POSITION } from '../enums';
import { EnumsTypeTransformer } from '../../types';

export type AucAlertPosition = EnumsTypeTransformer<AUC_ALERT_POSITION.LEFT | AUC_ALERT_POSITION.RIGHT>;
