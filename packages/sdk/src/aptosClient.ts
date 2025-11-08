import { AptosClient, AptosAccount, TxnBuilderTypes, HexString } from "@aptos-labs/ts-sdk"
import { getUserInfo } from "./betterAuth"
import type { AptosIdentityAccount } from "./types"

const network = process.env.APTOS_NETWORK || "testnet"
const nodeUrl = network === "mainnet" ? "https://fullnode.mainnet.aptoslabs.com" : "https://fullnode.testnet.aptoslabs.com"
const client = new AptosClient(nodeUrl)

function deriveAccountFromId(userId: string) {
  // WARNING: demo-only deterministic derivation
  const hash = new TextEncoder().encode(userId)
  // Use AptosAccount.fromDerivationPath if available — using raw seed demo
  const seedHex = Buffer.from(hash).toString('hex').slice(0,64)
  const privateKey = HexString.ensure(seedHex).toUint8Array()
  try {
    const acct = AptosAccount.fromPrivateKey(privateKey)
    return acct
  } catch (e) {
    // fallback random
    return new AptosAccount()
  }
}

export async function getAptosAccount(): Promise<AptosIdentityAccount> {
  const user = await getUserInfo()
  if (!user) throw new Error('Not authenticated')
  const account = deriveAccountFromId(user.id)
  return {
    address: account.address().toString(),
    account,
    provider: user.provider || 'better-auth'
  }
}

export async function signAndSubmitTransaction(payload: any) {
  const { account } = await getAptosAccount()
  const txRequest = await client.generateTransaction(account.address(), payload)
  const signed = await client.signTransaction(account, txRequest)
  const res = await client.submitTransaction(signed)
  return res
}
