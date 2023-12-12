import { CandidateProps } from '@/@types/types'
import {
  NEAR_SMART_CONTRACT,
  onConnectNearWallet,
  onSignin,
} from '@/utils/near'
import * as Dialog from '@radix-ui/react-dialog'
import { Contract } from 'near-api-js'
import { User } from 'phosphor-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface VoteModalProps {
  candidates: CandidateProps[]
  electionId: number
}

interface MyContract extends Contract {
  vote: ({
    electionId,
    candidateId,
  }: {
    electionId: number
    candidateId: string
  }) => Promise<any>
}

export function VoteModal({ candidates, electionId }: VoteModalProps) {
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateProps | null>(null)

  async function onVote() {
    const wallet = await onConnectNearWallet()

    if (wallet.isSignedIn()) {
      const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
        viewMethods: [],
        changeMethods: ['vote'],
      }) as MyContract

      try {
        await contract.vote({
          electionId,
          candidateId: selectedCandidate?.accountId || '',
        })
      } catch (err) {
        console.log('err =>', err)
      }
    } else {
      onSignin()
    }
  }

  const noneSelected = selectedCandidate === null

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-30 bg-black/80" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-[380px] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-9">
        <div className="flex h-full flex-col">
          <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
            Vote
          </h2>

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
            disabled={noneSelected}
            onClick={onVote}
            className="mt-auto h-[42px] w-full rounded-[12px] bg-gradient-to-r from-blue600 to-blue500 px-8 font-clash text-lg font-semibold text-white transition duration-500 hover:shadow-gradient-hover-shadow"
          >
            Vote
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
