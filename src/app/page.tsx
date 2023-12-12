'use client'

import { ElectionCard } from '@/components/molecules/ElectionCard'
import { dateFormatter } from '@/utils/functions'
import logo from '@/utils/images'
import { NEAR_SMART_CONTRACT, onConnectNearWallet } from '@/utils/near'
import { Contract } from 'near-api-js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ElectionsProps {
  0: string
  1: {
    candidates: {
      accountId: string
      totalVotes: number
    }[]
    endsAt: string
    id: number
    name: string
    startsAt: string
    totalVotes: number
    voters: string[]
  }
}

interface MyContract extends Contract {
  get_all_elections: () => Promise<any>
}

export default function Home() {
  const [elections, setElections] = useState<ElectionsProps[]>([])

  async function onGetAllElections() {
    const wallet = await onConnectNearWallet()

    const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
      viewMethods: ['get_all_elections'],
      changeMethods: [],
    }) as MyContract

    const elections = await contract.get_all_elections()

    setElections(elections)
  }

  useEffect(() => {
    onGetAllElections()
  }, [])

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center pb-24">
        <header className="mx-auto py-8">
          <nav>
            <Link href="/">
              <Image src={logo} alt="Near Voting Dapp Logo" />
            </Link>
          </nav>
        </header>
        <main className="w-full">
          <h1 className="font-clash text-[3rem] font-semibold text-white">
            Elections
          </h1>
          <ul className="flex w-full flex-wrap items-center gap-8">
            {elections.map(
              ({
                1: { candidates, endsAt, id, name, startsAt, totalVotes },
              }) => {
                const formattedStartsAt = dateFormatter(startsAt)
                const formattedEndsAt = dateFormatter(endsAt)

                return (
                  <li key={id} className="w-full max-w-lg">
                    <ElectionCard
                      id={id}
                      candidates={candidates.length}
                      name={name}
                      endsAt={formattedEndsAt}
                      startsAt={formattedStartsAt}
                      totalVotes={totalVotes}
                    />
                  </li>
                )
              },
            )}
          </ul>
        </main>
      </div>
    </div>
  )
}
