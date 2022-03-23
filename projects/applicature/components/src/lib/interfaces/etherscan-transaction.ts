import { AUC_TRANSACTION_STATUS } from '../renamed/enums';

export interface EtherscanTransactionResponse {
  status: '0' | '1'; // Note: status: 0 = Fail, 1 = Pass. Will return null/empty value for pre-byzantium fork
  message: string;
  result: EtherscanTransaction[];
}

export interface EtherscanTransaction {
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
  isError:  '0' | '1'; // Note: isError":"0" = Pass , isError":"1" = Error during Contract Execution
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  etherscanUrl?: string;
}

export interface EtherscanTransactionLocalStorage {
  name: string,
  hash: string;
  status: AUC_TRANSACTION_STATUS;
  etherscanUrl: string
  viewed: boolean
}
