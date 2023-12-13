import * as nearAPI from 'near-api-js'

import { Contract } from 'near-api-js'

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

export const nearConnection = async () => {
  const connection = await connect(connectionConfig)

  return connection
}

export async function onConnectNearWallet() {
  const connection = await connect(connectionConfig)
  const walletConnection = new WalletConnection(connection, '')

  return walletConnection
}

export async function onSignin() {
  const wallet = await onConnectNearWallet()

  await wallet?.requestSignIn({
    contractId: NEAR_SMART_CONTRACT,
  })
}

export async function onSignout() {
  const wallet = await onConnectNearWallet()
  wallet?.signOut()
}

interface MyContract extends Contract {
  get_all_elections: () => Promise<any>
}

export async function onGetAllElections() {
  const wallet = await onConnectNearWallet()

  const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
    viewMethods: ['get_all_elections'],
    changeMethods: [],
  }) as MyContract

  const elections = await contract.get_all_elections()

  return elections
}
