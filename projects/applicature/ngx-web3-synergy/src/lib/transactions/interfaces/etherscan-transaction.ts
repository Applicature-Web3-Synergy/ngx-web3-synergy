import { W3S_TRANSACTION_STATUS } from '../enums';
import { W3S_CHAIN_ID } from '../../enums';

export interface W3sEtherscanTransactionResponse {
  status: '0' | '1'; // Note: status: 0 = Fail, 1 = Pass. Will return null/empty value for pre-byzantium fork
  message: string;
  result: W3sEtherscanTransaction[];
}

export interface W3sEtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: '0' | '1'; // Note: isError":"0" = Pass , isError":"1" = Error during Contract Execution
  txreceipt_status: string; // 0 - fail, 1 - success
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  explorerUrl?: string;
}

export interface W3sAddTransaction {
  chainId: W3S_CHAIN_ID | string;
  name: string;
  hash: string;
  status: W3S_TRANSACTION_STATUS;
  explorerUrl?: string;
  viewed: boolean;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface W3sTransactionItem extends W3sAddTransaction {
  explorerUrl: string
}

