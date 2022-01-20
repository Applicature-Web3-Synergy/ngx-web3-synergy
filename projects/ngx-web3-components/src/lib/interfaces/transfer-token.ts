export interface TransferTokenData {
  address: string;
  symbol: string;
}

export interface TransferTokenModalData {
  tokenInfo: TransferTokenData;
  currentAllowance: number;
}
