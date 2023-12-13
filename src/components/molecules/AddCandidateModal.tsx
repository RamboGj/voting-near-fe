import {
  NEAR_SMART_CONTRACT,
  nearConnection,
  onConnectNearWallet,
  onSignin,
} from '@/utils/near'
import * as Dialog from '@radix-ui/react-dialog'
import { Contract } from 'near-api-js'
import { X } from 'phosphor-react'
import { useState } from 'react'
import * as nearAPI from 'near-api-js'

interface VoteModalProps {
  electionId: number
}

interface MyContract extends Contract {
  add_candidate_to_election: ({
    accountId,
    electionId,
  }: {
    accountId: string
    electionId: number
  }) => Promise<any>
}

export function AddCandidateModal({ electionId }: VoteModalProps) {
  const [candidateAccountId, setCandidateAccountId] = useState<string>('')

  async function onAddCandidate() {
    const wallet = await onConnectNearWallet()

    if (wallet.isSignedIn()) {
      const contract = new Contract(wallet.account(), NEAR_SMART_CONTRACT, {
        viewMethods: [],
        changeMethods: ['add_candidate_to_election'],
      }) as MyContract

      try {
        await contract.add_candidate_to_election({
          electionId,
          accountId: candidateAccountId,
        })
        window.location.reload()
      } catch (err) {
        console.log('err =>', err)
      }
    } else {
      onSignin()
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
            disabled={notAValidAccountId}
            onClick={onAddCandidate}
            className="mt-auto h-[42px] w-full rounded-[12px] px-8 font-clash text-lg font-semibold text-white transition duration-500 enabled:bg-gradient-to-r enabled:from-blue600 enabled:to-blue500 enabled:hover:shadow-gradient-hover-shadow disabled:bg-gray500"
          >
            Add
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
