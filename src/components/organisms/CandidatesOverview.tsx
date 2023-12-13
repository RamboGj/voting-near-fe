import { CandidateProps } from '@/@types/types'
import { Candidate } from '../molecules/Candidate'
import * as Dialog from '@radix-ui/react-dialog'
import { AddCandidateModal } from '../molecules/AddCandidateModal'
import { NEAR_TIMESTAMP_CONVERTER_FACTOR } from '@/utils/constants'

interface CandidatesOverviewProps {
  candidates: CandidateProps[]
  electionTotalVotes: number
  electionId: number
  endsAt: string
}

export function CandidatesOverview({
  candidates,
  electionTotalVotes,
  electionId,
  endsAt,
}: CandidatesOverviewProps) {
  return (
    <div className="flex w-full flex-col rounded-[24px] bg-white p-8 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex w-full">
          <div className="flex w-full items-center justify-between">
            <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
              Candidates
            </h2>
            <Dialog.Root>
              <Dialog.Trigger>
                <button className="mt-auto h-[42px] w-48 rounded-[12px] bg-gradient-to-r from-blue600 to-blue500 px-8 font-clash text-lg font-semibold text-white transition duration-500 hover:shadow-gradient-hover-shadow">
                  Add
                </button>
              </Dialog.Trigger>
              <AddCandidateModal electionId={electionId} />
            </Dialog.Root>
          </div>
        </div>
        <ul className="flex w-full flex-wrap items-center gap-8">
          {candidates.map(({ accountId, totalVotes }) => {
            const isLeading =
              electionTotalVotes > 0 && candidates.length >= 2
                ? totalVotes > electionTotalVotes % 2 ||
                  totalVotes === electionTotalVotes
                : false

            const isWinner =
              new Date().getTime() >
                Number(endsAt) / NEAR_TIMESTAMP_CONVERTER_FACTOR && isLeading

            const percentage = (totalVotes / electionTotalVotes) * 100 || 0

            return (
              <li key={accountId}>
                <Candidate
                  isLeading={isLeading}
                  isWinner={isWinner}
                  name={accountId}
                  percentage={percentage}
                  totalVotes={totalVotes}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
