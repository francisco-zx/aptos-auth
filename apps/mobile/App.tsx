import React, { useEffect, useState } from 'react'
import { SafeAreaView, Button, Text } from 'react-native'
import axios from 'axios'
import { getAptosAccount, mintIdentityNFT, signAndSubmitTransaction } from '@aptos/identity-sdk'

export default function App() {
  const [address, setAddress] = useState<string | null>(null)
  const [mintRes, setMintRes] = useState<any>(null)

  async function handleLoginDemo() {
    // mobile demo uses same API demo flow: call POST /api/auth/oauth/google
    const demoUser = { id: 'mobile-' + Math.random().toString(36).slice(2,8), email: 'mobile@example.com' }
    await axios.post('http://localhost:3001/api/auth/oauth/google', demoUser, { withCredentials: true })
    const acct = await getAptosAccount()
    setAddress(acct.address)
    const res = await mintIdentityNFT(demoUser.id, { email: demoUser.email })
    setMintRes(res)
  }

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{marginBottom:20}}>Aptos Identity - Mobile Demo</Text>
      {address ? <Text>Address: {address}</Text> : <Button title="Login (demo)" onPress={handleLoginDemo} />}
      <Button title="Send demo tx" onPress={async ()=> await signAndSubmitTransaction({ function: '0x1::aptos_account::transfer', type_arguments: [], arguments: ['0x1', 1] })} />
      <Text>{JSON.stringify(mintRes)}</Text>
    </SafeAreaView>
  )
}
