import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'

interface VoteModalProps {
  electionId: number
}

export function AddCandidateModal({ electionId }: VoteModalProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [candidateAccountId, setCandidateAccountId] = useState<string>('')

  const addCandidate = async () => {
    setIsAdding(true)
    const { onAddCandidate } = await import('@/utils/near')

    try {
      await onAddCandidate(electionId, candidateAccountId)
    } catch (err) {
      console.log('ERR', err)
      setIsAdding(false)
    }
  }

  const notAValidAccountId =
    !candidateAccountId.includes('.testnet') &&
    !candidateAccountId.includes('.near')

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-30 bg-black/80" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-[380px] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-9">
        <div className="flex h-full flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="invisible" />
            <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
              ADD CANDIDATE
            </h2>
            <Dialog.Trigger>
              <X
                className="text-black transition-colors duration-300 hover:text-black/70"
                size={30}
              />
            </Dialog.Trigger>
          </div>

          <div className="mt-5 flex flex-col gap-1">
            <label
              htmlFor="candidate"
              className="text-lg font-medium text-black"
            >
              Candidate account
            </label>
            <input
              value={candidateAccountId}
              onChange={(e) => {
                setCandidateAccountId(e.target.value)
              }}
              className="rounded-xl border border-gray300 px-4 py-3 text-base text-black placeholder:text-gray500 focus:border-blue500 focus:outline-none"
              type="text"
              id="candidate"
              placeholder="candidate.near"
            />
          </div>

          <button
            disabled={notAValidAccountId || isAdding}
            onClick={addCandidate}
            className="mt-auto h-[42px] w-full rounded-[12px] px-8 font-clash text-lg font-semibold text-white transition duration-500 enabled:bg-gradient-to-r enabled:from-blue600 enabled:to-blue500 enabled:hover:shadow-gradient-hover-shadow disabled:bg-gray500"
          >
            Add
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
