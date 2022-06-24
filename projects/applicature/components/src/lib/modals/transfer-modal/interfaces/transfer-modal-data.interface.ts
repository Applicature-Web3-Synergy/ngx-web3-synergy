import BigNumber from 'bignumber.js';

export interface AucTransferModalData {
  header: string;
  symbol: string;
  allowance: BigNumber.Value;
  max: BigNumber.Value | any; // eslint-disable-line  @typescript-eslint/no-explicit-any
  approve: () => Promise<void>;
  confirm: () => Promise<void>;
  approveButton: string;
  approvingButton: string;
  confirmButton: string;
}
