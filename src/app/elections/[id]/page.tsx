'use client'

import { CandidatesOverview } from '@/components/organisms/CandidatesOverview'
import { ElectionHero } from '@/components/organisms/ElectionHero'
import { VotersList } from '@/components/organisms/VotersList'
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

export default function ElectionPage() {
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

  // useEffect(() => {
  //   onGetAllElections()
  // }, [])

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center">
        <header className="mx-auto py-8">
          <nav>
            <Link href="/">
              <Image src={logo} alt="Near Voting Dapp Logo" />
            </Link>
          </nav>
        </header>
        <main className="flex w-full flex-col gap-8">
          <ElectionHero />
          <CandidatesOverview />
          <VotersList />
        </main>
      </div>
    </div>
  )
}
