'use client'

import { ElectionsProps, VoterProps } from '@/@types/types'
import { CandidatesOverview } from '@/components/organisms/CandidatesOverview'
import { ElectionHero } from '@/components/organisms/ElectionHero'
import { VotersList } from '@/components/organisms/VotersList'
import logo from '@/utils/images'
import { NEAR_SMART_CONTRACT, onConnectNearWallet } from '@/utils/near'
import { Contract } from 'near-api-js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MyContract extends Contract {
  get_election: ({ electionId }: { electionId: number }) => Promise<any>
  get_voters_by_election: ({
    electionId,
  }: {
    electionId: number
  }) => Promise<any>
}

export default function ElectionPage({ params }: { params: { id: number } }) {
  const [election, setElection] = useState<ElectionsProps>()
  const [voters, setVoters] = useState<VoterProps[]>([])

  async function onGetElectionData() {
    const wallet = await onConnectNearWallet()

    const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
      viewMethods: ['get_election', 'get_voters_by_election'],
      changeMethods: [],
    }) as MyContract

    const [election, voters] = await Promise.all([
      contract.get_election({ electionId: params.id }),
      contract.get_voters_by_election({ electionId: params.id }),
    ])
    console.log('voters', voters)
    setElection(election)
    setVoters(voters)
  }

  useEffect(() => {
    onGetElectionData()
  }, [])

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
        {election ? (
          <main className="flex w-full flex-col gap-8">
            <ElectionHero
              candidates={election?.candidates}
              endsAt={election?.endsAt}
              startsAt={election?.startsAt}
              id={election?.id}
              name={election?.name}
              totalVotes={election?.totalVotes}
            />
            <CandidatesOverview
              candidates={election.candidates}
              electionTotalVotes={election.totalVotes}
            />
            <VotersList voters={voters} />
          </main>
        ) : (
          <h1 className="animate-pulse font-clash text-[3rem] font-semibold text-white">
            Loading...
          </h1>
        )}
      </div>
    </div>
  )
}
