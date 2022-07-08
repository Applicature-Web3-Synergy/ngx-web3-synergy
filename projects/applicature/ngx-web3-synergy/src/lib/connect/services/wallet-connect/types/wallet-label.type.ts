import { ProviderLabel } from '@web3-onboard/injected-wallets';

import { W3sEnumsTypeTransformer } from '../../../../types';

export type W3sInjectedWalletsLabels = W3sEnumsTypeTransformer<ProviderLabel.AlphaWallet
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

export type W3sWalletLabel = 'WalletConnect'
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
  | W3sInjectedWalletsLabels;
