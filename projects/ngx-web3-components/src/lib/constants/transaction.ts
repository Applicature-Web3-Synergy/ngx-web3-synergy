export const MESSAGE_TYPE = {
  ETH_DECRYPT: 'eth_decrypt',
  ETH_GET_ENCRYPTION_PUBLIC_KEY: 'eth_getEncryptionPublicKey',
  ETH_SIGN: 'eth_sign',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  GET_PROVIDER_STATE: 'metamask_getProviderState',
  LOG_WEB3_SHIM_USAGE: 'metamask_logWeb3ShimUsage',
  PERSONAL_SIGN: 'personal_sign',
  WATCH_ASSET: 'wallet_watchAsset',
  WATCH_ASSET_LEGACY: 'metamask_watchAsset',
  ADD_ETHEREUM_CHAIN: 'wallet_addEthereumChain',
  SWITCH_ETHEREUM_CHAIN: 'wallet_switchEthereumChain',
};

export const TRANSACTION_STATUSES = {
  UNAPPROVED: 'unapproved',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SIGNED: 'signed',
  SUBMITTED: 'submitted',
  FAILED: 'failed',
  DROPPED: 'dropped',
  CONFIRMED: 'confirmed',
};

export const TRANSACTION_TYPES = {
  CANCEL: 'cancel',
  RETRY: 'retry',
  TOKEN_METHOD_TRANSFER: 'transfer',
  TOKEN_METHOD_TRANSFER_FROM: 'transferfrom',
  TOKEN_METHOD_APPROVE: 'approve',
  INCOMING: 'incoming',
  SIMPLE_SEND: 'simpleSend',
  CONTRACT_INTERACTION: 'contractInteraction',
  DEPLOY_CONTRACT: 'contractDeployment',
  SWAP: 'swap',
  SWAP_APPROVAL: 'swapApproval',
  SIGN: MESSAGE_TYPE.ETH_SIGN,
  SIGN_TYPED_DATA: MESSAGE_TYPE.ETH_SIGN_TYPED_DATA,
  PERSONAL_SIGN: MESSAGE_TYPE.PERSONAL_SIGN,
  ETH_DECRYPT: MESSAGE_TYPE.ETH_DECRYPT,
  ETH_GET_ENCRYPTION_PUBLIC_KEY: MESSAGE_TYPE.ETH_GET_ENCRYPTION_PUBLIC_KEY,
};
