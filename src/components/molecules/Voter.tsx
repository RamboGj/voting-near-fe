import { VoterProps } from '@/@types/types'
import { dateFormatter } from '@/utils/functions'
import { User } from 'phosphor-react'

export function Voter({
  votedAt,
  accountId,
  votedCandidateAccountId,
}: VoterProps) {
  const formattedVotedAt = dateFormatter(votedAt)

  return (
    <div className="grid w-full grid-cols-3 py-3">
      <div className="col-span-1 flex items-center gap-2">
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black">
          <User size={16} color="#00C2FF" />
        </div>
        <h4 className="text-lg font-medium text-black">{accountId}</h4>
      </div>
      <span className="col-span-1 text-base font-normal text-gray500">
        Candidate voted: {votedCandidateAccountId}
      </span>
      <span className="col-span-1 text-base font-normal text-gray500">
        Voted at: {formattedVotedAt}
      </span>
    </div>
  )
}
