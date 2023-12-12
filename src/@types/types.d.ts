export interface CandidateProps {
  accountId: string
  totalVotes: number
}

export interface ElectionsProps {
  candidates: CandidateProps[]
  endsAt: string
  id: number
  name: string
  startsAt: string
  totalVotes: number
  voters: string[]
}

export interface VoterProps {
  accountId: string
  votedCandidateAccountId: string
  votedAt: string
}
