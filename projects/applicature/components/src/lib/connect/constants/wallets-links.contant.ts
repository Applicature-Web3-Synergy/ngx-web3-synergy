import { ProviderLabel } from '@web3-onboard/injected-wallets';

/** Wallets URLs which uses if not installed injected wallet*/
export const AucWalletsLinks: { [key in keyof typeof ProviderLabel]?: string } = {
  [`${ProviderLabel.Binance}`]: 'https://www.bnbchain.org',
  [`${ProviderLabel.Coinbase}`]: 'https://www.coinbase.com/wallet',
  [`${ProviderLabel.MetaMask}`]: 'https://metamask.io/download',
};
