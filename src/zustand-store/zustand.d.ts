type NearWalletState = {
  isSignedIn: boolean
  wallet: WalletConnection
}

type NearWalletAction = {
  signIn: (wallet: WalletConnection) => void
  signOut: () => void
}

export interface NearWalletProps extends NearWalletState, NearWalletAction {}
