import { UserState } from 'bnc-onboard/dist/src/interfaces';

export interface ConnectionState {
  connected: boolean;
  state?: UserState
}
