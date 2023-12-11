'use client'

import {
  NEAR_SMART_CONTRACT,
  onConnectNearWallet,
  onSignin,
  onSignout,
} from '@/utils/near'
import { useNearWallet } from '@/zustand-store/useNearWallet'
import { Contract } from 'near-api-js'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ElectionsProps {
  0: string
  1: {
    candidates: {
      accountId: string
      totalVotes: number
    }[]
    endsAt: bigint
    id: number
    name: string
    startsAt: bigint
    totalVotes: number
    voters: string[]
  }
}

interface MyContract extends Contract {
  get_all_elections: () => Promise<any>
}

export default function Home() {
  const { isSignedIn, wallet, signIn, signOut } = useNearWallet()
  const [elections, setElections] = useState<ElectionsProps[]>([])
  const searchParams = useSearchParams()

  async function onGetAllElections() {
    const wallet = await onConnectNearWallet()

    console.log('IS SIGNED IN', wallet.isSignedIn())
    console.log('ACCOUNT', wallet.account())

    const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
      viewMethods: ['get_all_elections'],
      changeMethods: [],
    }) as MyContract

    const elections = await contract.get_all_elections()

    console.log('elections', elections)
    setElections(elections)
  }

  async function onGetConnection() {
    const wallet = await onConnectNearWallet()
    const isSignedIn = wallet.isSignedIn()

    if (isSignedIn) {
      signIn(wallet)
    }

    if (searchParams.get('account_id') !== null) {
      searchParams.delete()
    }
  }

  useEffect(() => {
    onGetConnection()
    onGetAllElections()
  }, [])

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[1120px] ">
        <div>
          <button
            onClick={onSignin}
            className="rounded-lg bg-white px-5 py-2 font-bold text-black hover:bg-gray-400"
          >
            SIGN IN
          </button>

          <button
            onClick={() => {
              onSignout()
              signOut()
            }}
            className="rounded-lg bg-white px-5 py-2 font-bold text-black hover:bg-gray-400"
          >
            SIGN OUT
          </button>
          <ul className="mx-auto flex w-full flex-col gap-8">
            {elections.map(
              ({
                1: {
                  candidates,
                  endsAt,
                  id,
                  name,
                  startsAt,
                  totalVotes,
                  voters,
                },
              }) => {
                const formattedStartsAt = new Date(
                  Number(Number(startsAt) / 1000000),
                )

                const formattedEndsAt = new Date(
                  Number(Number(endsAt) / 1000000),
                )

                return (
                  <li key={id}>
                    <div className="rounded-xl bg-white px-8 py-4 text-black">
                      <span>ID: {id}</span>

                      <span>name: {name}</span>
                      <span>startsAt: {JSON.stringify(formattedStartsAt)}</span>
                      <span>endsAt: {JSON.stringify(formattedEndsAt)}</span>
                      <span>totalVotes: {totalVotes}</span>
                      <span>
                        candidates: {JSON.stringify(candidates, null, 2)}
                      </span>
                      <span>voters: {JSON.stringify(voters, null, 2)}</span>
                    </div>
                  </li>
                )
              },
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
