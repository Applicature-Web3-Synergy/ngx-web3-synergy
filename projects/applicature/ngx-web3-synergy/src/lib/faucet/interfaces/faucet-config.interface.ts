import { AbiItem } from "web3-utils";

export interface W3sFaucetConfig {
  address: string, // The address that the token is at.
  symbol: string, // A ticker symbol or shorthand, up to 5 chars.
  decimals: number, // The number of decimals in the token
  image: string, // A string url of the token logo
  abi: AbiItem[] // Smart contract ABI
}
