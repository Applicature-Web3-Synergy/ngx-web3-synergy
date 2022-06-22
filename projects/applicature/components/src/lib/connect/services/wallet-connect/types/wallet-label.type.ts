import { ProviderLabel } from '@web3-onboard/injected-wallets';

import { EnumsTypeTransformer } from '../../../../types';

export type InjectedWalletsLabels = EnumsTypeTransformer<ProviderLabel.AlphaWallet
  | ProviderLabel.AToken
  | ProviderLabel.Binance
  | ProviderLabel.Bitpie
  | ProviderLabel.BlockWallet
  | ProviderLabel.Brave
  | ProviderLabel.Coinbase
  | ProviderLabel.Dcent
  | ProviderLabel.Detected
  | ProviderLabel.Exodus
  | ProviderLabel.Frame
  | ProviderLabel.HuobiWallet
  | ProviderLabel.HyperPay
  | ProviderLabel.ImToken
  | ProviderLabel.Liquality
  | ProviderLabel.MeetOne
  | ProviderLabel.MetaMask
  | ProviderLabel.MyKey
  | ProviderLabel.Opera
  | ProviderLabel.OwnBit
  | ProviderLabel.Status
  | ProviderLabel.Trust
  | ProviderLabel.TokenPocket
  | ProviderLabel.TP
  | ProviderLabel.WalletIo
  | ProviderLabel.XDEFI
  | ProviderLabel.OneInch
  | ProviderLabel.Tokenary
  | ProviderLabel.Tally
  >;

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
  | InjectedWalletsLabels;
