import axios from "axios"
import type { IdentityProvider } from "./types"

const base = process.env.NEXT_PUBLIC_AUTH_URL || process.env.BETTER_AUTH_BASE_URL || "http://localhost:3001/api/auth"

export async function getSession() {
  try {
    const res = await axios.get(`${base}/session`, { withCredentials: true })
    return res.data
  } catch (e) {
    return null
  }
}

export async function startOAuth(provider: string) {
  // Redirect URL for demo; in production Better Auth handles
  const url = `${base}/oauth/${provider}`
  // return the url so frontend can redirect
  return url
}

export async function getUserInfo() : Promise<IdentityProvider | null> {
  try {
    const res = await axios.get(`${base}/me`, { withCredentials: true })
    return res.data as IdentityProvider
  } catch (e) {
    return null
  }
}

export async function signOut() {
  await axios.post(`${base}/signout`, {}, { withCredentials: true })
}
