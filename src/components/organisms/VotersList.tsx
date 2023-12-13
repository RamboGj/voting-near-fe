import { VoterProps } from '@/@types/types'
import { Voter } from '../molecules/Voter'

interface VotersListProps {
  voters: VoterProps[]
}

export function VotersList({ voters }: VotersListProps) {
  return (
    <div className="flex w-full flex-col rounded-[24px] bg-white p-8 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="w-full items-center justify-between">
          <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
            Voters
          </h2>
          <span className="font-regular text-base text-black">
            Total votes: {voters?.length || 0}
          </span>
        </div>

        <ul className="flex w-full flex-col divide-y divide-gray300">
          {voters?.map(({ accountId, votedAt, votedCandidateAccountId }) => {
            return (
              <li className="w-full" key={accountId}>
                <Voter
                  votedCandidateAccountId={votedCandidateAccountId}
                  accountId={accountId}
                  votedAt={votedAt}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {/* <button className="mt-12 h-[42px] w-48 rounded-[12px] bg-gradient-to-r from-blue600 to-blue500 px-8 font-clash text-lg font-semibold text-white transition duration-500 hover:shadow-gradient-hover-shadow">
        Load More
      </button> */}
    </div>
  )
}
