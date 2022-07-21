import Web3 from 'web3';

export const web3ProviderMock = new Web3.providers.WebsocketProvider('ws://remotenode.com:8546');
