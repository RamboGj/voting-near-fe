import * as nearAPI from 'near-api-js'

const { keyStores, connect, WalletConnection } = nearAPI

const myKeysStore = new keyStores.BrowserLocalStorageKeyStore()

const connectionConfig = {
  networkId: 'testnet',
  keyStore: myKeysStore,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://nearblocks.io/',
}

export const NEAR_SMART_CONTRACT = 'voting_test.rambogj.testnet'

export async function onConnectNearWallet() {
  const connection = await connect(connectionConfig)
  const walletConnection = new WalletConnection(connection, '')

  return walletConnection
}

export async function onSignin() {
  const wallet = await onConnectNearWallet()
  const isSignedIn = wallet.isSignedIn()

  if (isSignedIn) {
    return wallet
  } else {
    await wallet?.requestSignIn({
      contractId: NEAR_SMART_CONTRACT,
    })
  }
}

export async function onSignout() {
  const wallet = await onConnectNearWallet()
  wallet?.signOut()
}
