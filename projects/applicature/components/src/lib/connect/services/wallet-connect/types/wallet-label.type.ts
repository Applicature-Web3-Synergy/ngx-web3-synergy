import { ProviderLabel } from '@web3-onboard/injected-wallets';

export type AucWalletLabel = 'WalletConnect'
  | 'Magic Wallet'
  | 'Fortmatic'
  | 'Gnosis Safe'
  | 'MEW Wallet'
  | 'Portis'
  | 'Torus'
  | 'Coinbase Wallet'
  | 'KeepKey'
  | 'Ledger'
  | 'Trezor'
  | 'Keystone'
  | `D'CENT`
  | keyof typeof ProviderLabel;
