import { UserState } from 'bnc-onboard/dist/src/interfaces';

export interface AucConnectionState {
  connected: boolean;
  state?: UserState
}
