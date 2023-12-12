import { User } from 'phosphor-react'

interface CandidateProps {
  isLeading: boolean
  isWinner: boolean
  name: string
  totalVotes: number
  percentage: number
}

export function Candidate({
  isLeading,
  isWinner,
  name,
  percentage,
  totalVotes,
}: CandidateProps) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="flex h-[108px] w-[108px] items-center justify-center rounded-full bg-gradient-to-b from-blue600 to-blue500">
        <User size={60} color="#FFFFFF" />
      </div>
      <div className="flex flex-col font-medium text-gray500">
        {isWinner || isLeading ? (
          <div className="flex max-w-[64px] items-center justify-center rounded-lg bg-success500 px-[10px] py-0.5 leading-none">
            <span className="font-clash text-xs font-semibold text-white">
              {isWinner ? 'winner' : 'leading'}
            </span>
          </div>
        ) : null}

        <h4 className="text-lg font-medium text-black">{name}</h4>
        <span className="text-base font-normal text-gray500">
          Total votes: {totalVotes}
        </span>
        <span className="text-base font-normal text-gray500">
          Percentage: {percentage}%
        </span>
      </div>
    </div>
  )
}
