import { EthEvents, EthMethods } from '../enums';

export interface EthChainParams {
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
  method: EthMethods | string;
  params?: unknown[] | Record<string, unknown>;
}

export interface Ethereum {
  isMetaMask: boolean;

  selectedAddress: string;

  chainId: string;

  enable(): Promise<unknown>;

  isConnected(): boolean;

  on(eventName: EthEvents.AccountsChanged, handler: (accounts: string[]) => void): void;

  on(eventName: EthEvents.ChainChanged, handler: (chainId: string) => void): void;

  on(eventName: EthEvents.Connect, handler: (connectInfo: ConnectInfo) => void): void;

  on(eventName: EthEvents.Disconnect, handler: (error: ProviderRpcError) => void): void;

  on(eventName: EthEvents.Message, handler: (message: ProviderMessage) => void): void;

  request<T = any>(args: RequestArguments): Promise<T>;
}
