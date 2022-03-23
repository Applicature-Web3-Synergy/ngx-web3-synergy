import { AUC_ETH_EVENTS, AUC_ETH_METHODS } from '../renamed/enums';

export interface AucEthChainParams {
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

export interface ConnectInfo {
  chainId: string;
}

export interface ProviderMessage {
  data: unknown;
  type: string;
}

export interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
  message: string;
}

export interface RequestArguments {
  method: AUC_ETH_METHODS | string;
  params?: unknown[] | Record<string, unknown>;
}

export interface Ethereum {
  isMetaMask: boolean;

  selectedAddress: string;

  chainId: string;

  enable(): Promise<unknown>;

  isConnected(): boolean;

  on(eventName: AUC_ETH_EVENTS.ACCOUNT_CHANGED, handler: (accounts: string[]) => void): void;

  on(eventName: AUC_ETH_EVENTS.CHAIN_CHANGED, handler: (chainId: string) => void): void;

  on(eventName: AUC_ETH_EVENTS.CONNECT, handler: (connectInfo: ConnectInfo) => void): void;

  on(eventName: AUC_ETH_EVENTS.DISCONNECT, handler: (error: ProviderRpcError) => void): void;

  on(eventName: AUC_ETH_EVENTS.MESSAGE, handler: (message: ProviderMessage) => void): void;

  request<T = any>(args: RequestArguments): Promise<T>;
}
