import { WalletConnection } from 'near-api-js'
import { create } from 'zustand'
import { NearWalletProps } from './zustand'

export const useNearWallet = create<NearWalletProps>((set, get) => ({
  isSignedIn: get()?.isSignedIn || false,
  wallet: get()?.wallet || null,
  signIn: (wallet: WalletConnection) =>
    set(() => ({ wallet, isSignedIn: true })),
  signOut: () => set(() => ({ wallet: null, isSignedIn: false })),
}))
