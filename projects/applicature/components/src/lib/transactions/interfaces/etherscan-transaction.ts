import { AUC_TRANSACTION_STATUS } from '../enums';
import { AUC_CHAIN_ID } from '../../enums';

export interface AucEtherscanTransactionResponse {
  status: '0' | '1'; // Note: status: 0 = Fail, 1 = Pass. Will return null/empty value for pre-byzantium fork
  message: string;
  result: AucEtherscanTransaction[];
}

export interface AucEtherscanTransaction {
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

export interface AucAddTransaction {
  chainId: AUC_CHAIN_ID | string;
  name: string;
  hash: string;
  status: AUC_TRANSACTION_STATUS;
  explorerUrl?: string;
  viewed: boolean;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AucTransactionItem extends AucAddTransaction {
  explorerUrl: string
}

