'use client'

import { ElectionCard } from '@/components/molecules/ElectionCard'
import { dateFormatter } from '@/utils/functions'
import logo from '@/utils/images'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateElectionModal } from '@/components/molecules/CreateElectionModal'

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

export default function Home() {
  const [elections, setElections] = useState<ElectionsProps[]>([])

  useEffect(() => {
    const fetchElections = async () => {
      const { onGetAllElections } = await import('@/utils/near')
      const electionsData = await onGetAllElections()
      setElections(electionsData)
    }

    fetchElections()
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
          <div className="max-w-sm">
            <h1 className="font-clash text-[3rem] font-semibold text-white">
              Elections
            </h1>
            <Dialog.Root>
              <Dialog.Trigger>
                <button className="mt-auto h-[42px] w-full rounded-[12px] px-8 font-clash text-lg font-semibold text-white transition duration-500 enabled:bg-gradient-to-r enabled:from-blue600 enabled:to-blue500 enabled:hover:shadow-gradient-hover-shadow disabled:bg-gray500">
                  Create Election
                </button>
              </Dialog.Trigger>
              <CreateElectionModal />
            </Dialog.Root>
          </div>
          <ul className="mt-12 flex w-full flex-wrap items-center gap-8">
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
