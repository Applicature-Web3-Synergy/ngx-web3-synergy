import { ProviderLabel } from '@web3-onboard/injected-wallets';
import { MetamaskIcon } from './icons/metamask';
import { AlphaWalletsIcon } from './icons/alphawallet';
import { ATokenIcon } from './icons/atoken';
import { BinanceIcon } from './icons/binance';
import { BitpieIcon } from './icons/bitpie';
import { BlockWalletIcon } from './icons/blockwallet';
import { BraveIcon } from './icons/brave';
import { CoinbaseIcon } from './icons/coinbase';
import { DcentIcon } from './icons/dcent';
import { DetectedIcon } from './icons/detected';
import { FrameIcon } from './icons/frame';
import { HuobiWalletIcon } from './icons/huobiwallet';
import { HyperPayIcon } from './icons/hyperpay';
import { ImTokenIcon } from './icons/imtoken';
import { LiqualityIcon } from './icons/liquality';
import { MeetOneIcon } from './icons/meetone';
import { MyKeyIcon } from './icons/mykey';
import { OperaIcon } from './icons/opera';
import { OwnBitIcon } from './icons/ownbit';
import { StatusIcon } from './icons/status';
import { TrustIcon } from './icons/trust';
import { TokenPocketIcon } from './icons/tokenpocket';
import { TpIcon } from './icons/tp';
import { XdefiIcon } from './icons/xdefi';
import { WalletIoIcon } from './icons/walletio';
import { OneInchIcon } from './icons/oneInch';
import { TokenaryIcon } from './icons/tokenary';
import { TallyIcon } from './icons/tallywallet';
import { WalletConnectIcon } from './icons/wallet-connect';
import { MagicWalletIcon } from './icons/magic-wallet';
import { FormaticIcon } from './icons/formatic-icon';
import { GnosisSafeIcon } from './icons/gnosis-safe-icon';
import { MewWalletIcon } from './icons/mew-wallet-icon';
import { PortisIcon } from './icons/portis-icon';
import { TorusIcon } from './icons/torus-icon';
import { KeepKeyIcon } from './icons/keepkey-icon';
import { LedgerIcon } from './icons/ledger-icon';
import { TrezorIcon } from './icons/trezor-icon';
import { KeystoneIcon } from './icons/keystone-icon';
import { W3sWalletLabel } from '../services';


export const W3sWalletsIcons: { [key in W3sWalletLabel]?: string } = {
  WalletConnect: WalletConnectIcon,
  'Magic Wallet': MagicWalletIcon,
  Fortmatic: FormaticIcon,
  'Gnosis Safe': GnosisSafeIcon,
  'MEW Wallet': MewWalletIcon,
  Portis: PortisIcon,
  Torus: TorusIcon,
  KeepKey: KeepKeyIcon,
  Ledger: LedgerIcon,
  Trezor: TrezorIcon,
  Keystone: KeystoneIcon,
  [ProviderLabel.AlphaWallet]: AlphaWalletsIcon,
  [ProviderLabel.AToken]: ATokenIcon,
  [ProviderLabel.Binance]: BinanceIcon,
  [ProviderLabel.Bitpie]: BitpieIcon,
  [ProviderLabel.BlockWallet]: BlockWalletIcon,
  [ProviderLabel.Brave]: BraveIcon,
  [ProviderLabel.Coinbase]: CoinbaseIcon,
  [ProviderLabel.Dcent]: DcentIcon,
  [ProviderLabel.Detected]: DetectedIcon,
  [ProviderLabel.Exodus]: '',
  [ProviderLabel.Frame]: FrameIcon,
  [ProviderLabel.HuobiWallet]: HuobiWalletIcon,
  [ProviderLabel.HyperPay]: HyperPayIcon,
  [ProviderLabel.ImToken]: ImTokenIcon,
  [ProviderLabel.Liquality]: LiqualityIcon,
  [ProviderLabel.MeetOne]: MeetOneIcon,
  [ProviderLabel.MetaMask]: MetamaskIcon,
  [ProviderLabel.MyKey]: MyKeyIcon,
  [ProviderLabel.Opera]: OperaIcon,
  [ProviderLabel.OwnBit]: OwnBitIcon,
  [ProviderLabel.Status]: StatusIcon,
  [ProviderLabel.Trust]: TrustIcon,
  [ProviderLabel.TokenPocket]: TokenPocketIcon,
  [ProviderLabel.TP]: TpIcon,
  [ProviderLabel.WalletIo]: WalletIoIcon,
  [ProviderLabel.XDEFI]: XdefiIcon,
  [ProviderLabel.OneInch]: OneInchIcon,
  [ProviderLabel.Tokenary]: TokenaryIcon,
  [ProviderLabel.Tally]: TallyIcon,
};
