import BigNumber from 'bignumber.js';

export interface W3sTransferModalData {
  header: string;
  symbol: string;
  stepAction: boolean;
  allowance?: BigNumber.Value;
  max?: BigNumber.Value | any; // eslint-disable-line  @typescript-eslint/no-explicit-any
  approve?: (val: BigNumber) => Promise<void>;
  confirm: (val: BigNumber) => Promise<void>;
  approveButton?: string;
  approvingButton?: string;
  confirmButton: string;
}
