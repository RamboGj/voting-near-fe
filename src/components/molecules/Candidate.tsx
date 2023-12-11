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
      <div className="from-blue600 to-blue500 flex h-[108px] w-[108px] items-center justify-center rounded-full bg-gradient-to-b">
        <User size={60} color="#FFFFFF" />
      </div>
      <div className="text-gray500 flex flex-col font-medium">
        {isWinner || isLeading ? (
          <div className="bg-success500 flex max-w-[64px] items-center justify-center rounded-lg px-[10px] py-0.5 leading-none">
            <span className="font-clash text-xs font-semibold text-white">
              {isWinner ? 'winner' : 'leading'}
            </span>
          </div>
        ) : null}

        <h4 className="text-lg font-medium text-black">{name}</h4>
        <span className="text-gray500 text-base font-normal">
          Total votes: {totalVotes}
        </span>
        <span className="text-gray500 text-base font-normal">
          Percentage: {percentage}%
        </span>
      </div>
    </div>
  )
}
