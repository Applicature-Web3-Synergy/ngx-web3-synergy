import { Account } from '@web3-onboard/core/dist/types';

export const AccountMock: Account = {
  address: `091x...3${Math.floor(Math.random() * 100)}`,
  ens: null,
  balance: {
    ETH: '123'
  }
};
