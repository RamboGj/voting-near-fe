import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { Input } from '../atoms/Input'

export function CreateElectionModal() {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [startsAt, setStartsAt] = useState<string>('')
  const [endsAt, setEndsAt] = useState<string>('')

  const createElection = async (
    startsAt: string,
    endsAt: string,
    name: string,
  ) => {
    const { onCreateElection } = await import('@/utils/near')
    await onCreateElection(endsAt, startsAt, name)
  }

  async function onCreateElection() {
    setIsCreating(true)

    try {
      await createElection(endsAt, startsAt, name)
    } catch (err) {
      setIsCreating(false)
    }
  }

  const someFieldNotSet = name.length < 3 || startsAt === '' || endsAt === ''

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-30 bg-black/80" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-9">
        <div className="flex h-full flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="invisible" />
            <h2 className="mb-1 font-clash text-[2rem] font-semibold leading-none text-black">
              CREATE ELECTION
            </h2>
            <Dialog.Trigger>
              <X
                className="text-black transition-colors duration-300 hover:text-black/70"
                size={30}
              />
            </Dialog.Trigger>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onCreateElection()
            }}
          >
            <Input
              id="name"
              label="Election name"
              placeholder="Election 123"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <Input
              id="startsAt"
              label="Starts at"
              type="datetime-local"
              value={startsAt}
              onChange={(e) => {
                setStartsAt(e.target.value)
              }}
            />
            <Input
              id="endsAt"
              label="Ends at"
              type="datetime-local"
              value={endsAt}
              onChange={(e) => {
                setEndsAt(e.target.value)
              }}
            />

            <button
              disabled={someFieldNotSet || isCreating}
              type="submit"
              className="mt-12 h-[42px] w-full rounded-[12px] px-8 font-clash text-lg font-semibold text-white transition duration-500 enabled:bg-gradient-to-r enabled:from-blue600 enabled:to-blue500 enabled:hover:shadow-gradient-hover-shadow disabled:bg-gray500"
            >
              Create
            </button>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
