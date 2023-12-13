'use client'

import { ElectionsProps, VoterProps } from '@/@types/types'
import { CandidatesOverview } from '@/components/organisms/CandidatesOverview'
import { ElectionHero } from '@/components/organisms/ElectionHero'
import { VotersList } from '@/components/organisms/VotersList'
import logo from '@/utils/images'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ClientElectionPage({
  params,
}: {
  params: { id: number }
}) {
  const [election, setElection] = useState<ElectionsProps>()
  const [voters, setVoters] = useState<VoterProps[]>([])

  const getElectionData = async () => {
    const { onGetElectionData } = await import('@/utils/near')
    const data = await onGetElectionData(params.id)

    setElection(data.election)
    setVoters(data.voters)
  }

  useEffect(() => {
    getElectionData()
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
              electionId={election.id}
              endsAt={election.endsAt}
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
