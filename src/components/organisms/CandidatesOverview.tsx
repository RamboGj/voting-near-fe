import { CandidateProps } from '@/@types/types'
import { Candidate } from '../molecules/Candidate'

interface CandidatesOverviewProps {
  candidates: CandidateProps[]
  electionTotalVotes: number
}

export function CandidatesOverview({
  candidates,
  electionTotalVotes,
}: CandidatesOverviewProps) {
  return (
    <div className="flex w-full flex-col rounded-[24px] bg-white p-8 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex w-full">
          <div className="flex w-full items-center justify-between">
            <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
              Candidates
            </h2>
            <button className="mt-auto h-[42px] w-48 rounded-[12px] bg-gradient-to-r from-blue600 to-blue500 px-8 font-clash text-lg font-semibold text-white transition duration-500 hover:shadow-gradient-hover-shadow">
              ADD
            </button>
          </div>
        </div>
        <ul className="flex w-full flex-wrap items-center gap-8">
          {candidates.map(({ accountId, totalVotes }) => {
            const isLeading =
              totalVotes > electionTotalVotes % 2 ||
              totalVotes === electionTotalVotes

            console.log('isLeading', isLeading)
            console.log('electionTotalVotes', electionTotalVotes)
            console.log('totalVotes', totalVotes)

            const percentage = (totalVotes / electionTotalVotes) * 100

            return (
              <li key={accountId}>
                <Candidate
                  isLeading={isLeading}
                  isWinner={false}
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
