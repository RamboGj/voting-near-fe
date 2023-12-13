import * as nearAPI from 'near-api-js'

import { Contract } from 'near-api-js'

const { keyStores, connect, WalletConnection } = nearAPI

export const NEAR_SMART_CONTRACT = 'voting_test.rambogj.testnet'

const myKeysStore = new keyStores.BrowserLocalStorageKeyStore()

const connectionConfig = {
  networkId: 'testnet',
  keyStore: myKeysStore,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://nearblocks.io/',
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

export interface MyContract extends Contract {
  get_election: ({ electionId }: { electionId: number }) => Promise<any>
  get_all_elections: () => Promise<any>
  create_election: ({
    endsAt,
    name,
    startsAt,
  }: {
    endsAt: number
    name: string
    startsAt: number
  }) => Promise<any>
  get_voters_by_election: ({
    electionId,
  }: {
    electionId: number
  }) => Promise<any>
  add_candidate_to_election: ({
    accountId,
    electionId,
  }: {
    accountId: string
    electionId: number
  }) => Promise<any>
  vote: ({
    electionId,
    candidateId,
  }: {
    electionId: number
    candidateId: string
  }) => Promise<any>
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

export async function onCreateElection(
  endsAt: string,
  startsAt: string,
  name: string,
) {
  const wallet = await onConnectNearWallet()

  if (wallet.isSignedIn()) {
    const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
      viewMethods: [],
      changeMethods: ['create_election'],
    }) as MyContract

    try {
      await contract.create_election({
        endsAt: new Date(endsAt).getTime(),
        startsAt: new Date(startsAt).getTime(),
        name,
      })
      window.location.reload()
    } catch (err) {
      console.log('err =>', err)
    }
  } else {
    onSignin()
  }
}

export async function onGetElectionData(id: number) {
  const wallet = await onConnectNearWallet()

  const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
    viewMethods: ['get_election', 'get_voters_by_election'],
    changeMethods: [],
  }) as MyContract

  const [election, voters] = await Promise.all([
    contract.get_election({ electionId: id }),
    contract.get_voters_by_election({ electionId: id }),
  ])

  return {
    election,
    voters,
  }
}

export async function onAddCandidate(electionId: number, accountId: string) {
  const wallet = await onConnectNearWallet()

  if (wallet.isSignedIn()) {
    const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
      viewMethods: [],
      changeMethods: ['add_candidate_to_election'],
    }) as MyContract

    try {
      await contract.add_candidate_to_election({
        electionId,
        accountId,
      })
      window.location.reload()
    } catch (err) {
      console.log('err =>', err)
    }
  } else {
    onSignin()
  }
}

export async function onVote(electionId: number, candidateId: string) {
  const wallet = await onConnectNearWallet()

  if (wallet.isSignedIn()) {
    const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
      viewMethods: [],
      changeMethods: ['vote'],
    }) as MyContract

    try {
      await contract.vote({
        electionId,
        candidateId,
      })

      window.location.reload()
    } catch (err) {
      console.log('err =>', err)
    }
  } else {
    onSignin()
  }
}
