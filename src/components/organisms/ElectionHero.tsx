interface ElectionHeroProps {
  id: number
  name: string
  startsAt: string
  endsAt: string
  totalVotes: number
  candidates: number
}

export function ElectionHero({
  candidates,
  endsAt,
  id,
  name,
  startsAt,
  totalVotes,
}: ElectionHeroProps) {
  return (
    <div className="flex h-[240px] w-full flex-col rounded-[24px] bg-white p-8 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex w-full max-w-[250px] flex-col">
          <h2 className="font-clash mb-1 text-[2rem] font-semibold leading-none text-black">
            {name}
          </h2>
          <span className="text-warning500 text-base font-medium">
            {startsAt}
          </span>
          <span className="text-danger500 text-base font-medium">{endsAt}</span>
        </div>
        <div className="text-gray500 flex flex-col font-medium">
          <span>Total votes: {totalVotes}</span>
          <span>Candidates: {candidates}</span>
        </div>
      </div>
      <button className="from-blue600 hover:shadow-gradient-hover-shadow to-blue500 font-clash mt-auto h-[42px] w-full rounded-[12px] bg-gradient-to-r px-8 text-lg font-semibold text-white transition duration-500">
        VOTE
      </button>
    </div>
  )
}
