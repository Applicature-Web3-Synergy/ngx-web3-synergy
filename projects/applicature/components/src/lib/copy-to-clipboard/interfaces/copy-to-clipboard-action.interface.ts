export interface CopyToClipboardAction {
  status: 'success' | 'failed';
  err?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
