import { getAptosAccount } from "./aptosClient"
import { AptosClient } from "@aptos-labs/ts-sdk"

const nodeUrl = process.env.APTOS_NETWORK === 'mainnet' ? 'https://fullnode.mainnet.aptoslabs.com' : 'https://fullnode.testnet.aptoslabs.com'
const client = new AptosClient(nodeUrl)

export async function mintIdentityNFT(userId: string, metadata: { email?: string }) {
  const acct = await getAptosAccount()
  const sender = acct.account

  // Demo payload — replace with actual token module on real deploy
  const payload = {
    function: "0x3::token::mint" /* placeholder - change to correct module */,
    type_arguments: [],
    arguments: [sender.address().toString(), `Aptos Identity - ${userId}`, `Proof of OAuth identity`, metadata.email || "", 1]
  }

  // Using client.submitTransaction demo
  const tx = await client.generateTransaction(sender.address(), payload)
  const signed = await client.signTransaction(sender, tx)
  const res = await client.submitTransaction(signed)
  return res
}
