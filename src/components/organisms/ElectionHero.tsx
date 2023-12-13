import { CandidateProps } from '@/@types/types'
import { dateFormatter } from '@/utils/functions'
import * as Dialog from '@radix-ui/react-dialog'
import { VoteModal } from '../molecules/VoteModal'
import Link from 'next/link'
import { NEAR_SMART_CONTRACT } from '@/utils/near'
import { NEAR_TIMESTAMP_CONVERTER_FACTOR } from '@/utils/constants'

interface ElectionHeroProps {
  id: number
  name: string
  startsAt: string
  endsAt: string
  totalVotes: number
  candidates: CandidateProps[]
}

export function ElectionHero({
  candidates,
  endsAt,
  id,
  name,
  startsAt,
  totalVotes,
}: ElectionHeroProps) {
  console.log('ID =>', id)
  console.log('startsAt =>', Number(startsAt) / NEAR_TIMESTAMP_CONVERTER_FACTOR)

  const formattedEndAt = dateFormatter(endsAt)
  const formattedStartsAt = dateFormatter(startsAt)

  const endedOrHasNotStarted =
    new Date().getTime() < Number(startsAt) / NEAR_TIMESTAMP_CONVERTER_FACTOR ||
    new Date().getTime() > Number(endsAt) / NEAR_TIMESTAMP_CONVERTER_FACTOR

  return (
    <div className="flex h-[240px] w-full flex-col rounded-[24px] bg-white p-8 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex w-full max-w-lg flex-col">
          <div className="mb-1 block">
            <h2 className="font-clash text-[2rem] font-semibold leading-none text-black">
              {name}
            </h2>
            <Link
              target="_blank"
              href={`https://testnet.nearblocks.io/address/${NEAR_SMART_CONTRACT}`}
            >
              <span className="text-sm text-gray500 transition-colors duration-300 hover:text-gray-600">
                View in block explorer
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-warning500"></div>
            <span className="text-base font-medium text-warning500">
              {formattedStartsAt}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-danger500"></div>
            <span className="text-base font-medium text-danger500">
              {formattedEndAt}
            </span>
          </div>
        </div>
        <div className="flex flex-col font-medium text-gray500">
          <span>Total votes: {totalVotes}</span>
          <span>Candidates: {candidates.length}</span>
        </div>
      </div>
      {endedOrHasNotStarted ? (
        <Dialog.Root>
          <Dialog.Trigger className="mt-auto">
            <button className="mt-auto h-[42px] w-full rounded-[12px] bg-gradient-to-r from-blue600 to-blue500 px-8 font-clash text-lg font-semibold text-white transition duration-500 hover:shadow-gradient-hover-shadow">
              VOTE
            </button>
          </Dialog.Trigger>
          <VoteModal candidates={candidates} electionId={id} />
        </Dialog.Root>
      ) : null}
    </div>
  )
}
