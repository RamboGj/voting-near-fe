import { Candidate } from '../molecules/Candidate'

export function CandidatesOverview() {
  return (
    <div className="flex w-full flex-col rounded-[24px] bg-white p-8 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex w-full">
          <div className="flex w-full items-center justify-between">
            <h2 className="font-clash mb-1 text-[2rem] font-semibold leading-none text-black">
              Candidates
            </h2>
            <button className="from-blue600 hover:shadow-gradient-hover-shadow to-blue500 font-clash mt-auto h-[42px] w-48 rounded-[12px] bg-gradient-to-r px-8 text-lg font-semibold text-white transition duration-500">
              ADD
            </button>
          </div>
        </div>
        <ul className="w-full">
          <li>
            <Candidate
              isLeading={false}
              isWinner={false}
              name="contract2.testnet"
              percentage={43}
              totalVotes={43}
            />
          </li>
          <li>
            <Candidate
              isLeading
              isWinner={false}
              name="rambogj.testnet"
              percentage={57}
              totalVotes={57}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
