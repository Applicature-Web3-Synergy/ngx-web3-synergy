import { W3S_ETH_EVENTS, W3S_ETH_METHODS } from '../enums';
import Web3 from 'web3';

export interface W3sWindowEth {
  ethereum: W3sEthereum;
  global: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  web3: Web3;
}

export interface W3sEthChainParams {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number; // 18
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export interface W3sConnectInfo {
  chainId: string;
}

export interface W3sProviderMessage {
  data: unknown;
  type: string;
}

export interface W3sProviderRpcError extends Error {
  code: number;
  data?: unknown;
  message: string;
}

export interface W3sRequestArguments {
  method: W3S_ETH_METHODS | string;
  params?: unknown[] | Record<string, unknown>;
}

export interface W3sEthereum {
  isMetaMask: boolean;

  selectedAddress: string;

  chainId: string;

  enable(): Promise<unknown>;

  isConnected(): boolean;

  on(eventName: W3S_ETH_EVENTS.ACCOUNT_CHANGED, handler: (accounts: string[]) => void): void;

  on(eventName: W3S_ETH_EVENTS.CHAIN_CHANGED, handler: (chainId: string) => void): void;

  on(eventName: W3S_ETH_EVENTS.CONNECT, handler: (connectInfo: W3sConnectInfo) => void): void;

  on(eventName: W3S_ETH_EVENTS.DISCONNECT, handler: (error: W3sProviderRpcError) => void): void;

  on(eventName: W3S_ETH_EVENTS.MESSAGE, handler: (message: W3sProviderMessage) => void): void;

  request<T = any>(args: W3sRequestArguments): Promise<T>; // eslint-disable-line  @typescript-eslint/no-explicit-any
}
