import { TransferTokenData, TransferTokenModalData } from "../interfaces";

export const TRANSFER_TOKEN_DATA: TransferTokenData = {
  address: '0x0000000000000000000',
  symbol: 'USDT'
};

export const DEFAULT_ALLOWANCE = 0;
export const MAX_ALLOWANCE = 1000;

export const TRANSFER_TOKEN_MODAL_DATA: TransferTokenModalData = {
  tokenInfo: TRANSFER_TOKEN_DATA,
  currentAllowance: DEFAULT_ALLOWANCE
};

export const MOCKED_TRANSACTION_HASH = '0x41f2b9c1319bf1bb5a5f007303228c0ff8506be1a661cc1bf278bee7eec35a77';
export const MOCKED_TOKEN_AMOUNT = 2.54;
export const MOCKED_TOKEN_SYMBOL = 'ETH';
