import { ConnectedChain } from '@web3-onboard/core';

import { InitializationConfigMock } from './initialization-config.mock';

export function connectedChainMock(): ConnectedChain[] {
  return InitializationConfigMock.chains.map(chain => {
    return {
      namespace: 'evm',
      id: chain.id
    };
  });
}
