import { CandidateProps } from '@/@types/types'
import * as Dialog from '@radix-ui/react-dialog'
import { User, X } from 'phosphor-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface VoteModalProps {
  candidates: CandidateProps[]
  electionId: number
}

export function VoteModal({ candidates, electionId }: VoteModalProps) {
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateProps | null>(null)

  const handleVote = async () => {
    const { onVote } = await import('@/utils/near')

    await onVote(electionId, selectedCandidate?.accountId || '')
  }

  const noneSelected = selectedCandidate === null
  const noCandidateAdded = candidates.length === 0

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-30 bg-black/80" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-[380px] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-9">
        <div className="flex h-full flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="invisible" />
            <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
              Vote
            </h2>
            <Dialog.Trigger>
              <X
                className="text-black transition-colors duration-300 hover:text-black/70"
                size={30}
              />
            </Dialog.Trigger>
          </div>
          <ul className="mt-4 flex w-full flex-col gap-3">
            {candidates.map((candidate) => {
              const isSelected =
                candidate.accountId === selectedCandidate?.accountId

              return (
                <li key={candidate.accountId}>
                  <div
                    role="button"
                    onClick={() => {
                      setSelectedCandidate(candidate)
                    }}
                    className={twMerge(
                      'flex cursor-pointer items-center gap-2 rounded-[12px] border px-6 py-4',
                      isSelected ? 'border-blue600' : 'border-gray300',
                    )}
                  >
                    <div
                      className={twMerge(
                        'flex h-[42px] w-[42px] items-center justify-center rounded-full',
                        isSelected
                          ? 'bg-gradient-to-b from-blue600 to-blue500'
                          : 'bg-gray500',
                      )}
                    >
                      <User size={24} color="#FFFFFF" />
                    </div>
                    <span>{candidate.accountId}</span>
                  </div>
                </li>
              )
            })}
          </ul>

          <button
            disabled={noneSelected || noCandidateAdded}
            onClick={handleVote}
            className="mt-auto h-[42px] w-full rounded-[12px] px-8 font-clash text-lg font-semibold text-white transition duration-500 enabled:bg-gradient-to-r enabled:from-blue600 enabled:to-blue500 enabled:hover:shadow-gradient-hover-shadow disabled:bg-gray500"
          >
            Vote
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
