import { AppState } from '@web3-onboard/core/dist/types';

export interface W3sConnectionState {
  connected: boolean;
  state?: AppState
}
