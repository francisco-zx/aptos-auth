export interface IdentityProvider {
  id: string
  email?: string
  provider?: string
}

export interface AptosIdentityAccount {
  address: string
  account: any
  provider: string
}
