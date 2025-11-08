import { useEffect, useState } from 'react'
import axios from 'axios'
import { getAptosAccount, startOAuth, mintIdentityNFT, signAndSubmitTransaction } from '@aptos/identity-sdk'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [mintRes, setMintRes] = useState<any>(null)

  useEffect(() => {
    // intento leer la sesión
    axios.get((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api/auth/me', { withCredentials: true })
      .then(r => setUser(r.data)).catch(()=>{})
  }, [])

  async function handleLogin() {
    // para demo: abrimos modal que hace POST /api/auth/oauth/google con body { id, email }
    // En entorno real Better Auth redirige / callbacks
    const demoUser = { id: 'user-' + Math.random().toString(36).slice(2,8), email: 'demo@example.com' }
    await axios.post((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api/auth/oauth/google', demoUser, { withCredentials: true })
    const acct = await getAptosAccount()
    setAddress(acct.address)
    // persist mapping
    await axios.post((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api/identity/map', { oauthId: demoUser.id, aptosAddress: acct.address })
    // mint NFT
    const res = await mintIdentityNFT(demoUser.id, { email: demoUser.email })
    setMintRes(res)
  }

  async function handleSend() {
    // demo: enviar una transacción simple (payload demo)
    const payload = {
      function: "0x1::aptos_account::transfer",
      type_arguments: [],
      arguments: ["0x1", 1]
    }
    const res = await signAndSubmitTransaction(payload as any)
    console.log(res)
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Aptos Identity SDK - Demo</h1>
      {address ? (
        <>
          <p>Address: {address}</p>
          <button onClick={handleSend}>Send demo tx</button>
          <pre>{JSON.stringify(mintRes, null, 2)}</pre>
        </>
      ) : (
        <>
          <p>Not logged</p>
          <button onClick={handleLogin}>Login (demo flow)</button>
        </>
      )}
    </main>
  )
}
