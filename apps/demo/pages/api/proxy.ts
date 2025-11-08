import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  try {
    const r = await axios({
      url: base + req.url?.replace('/api', '/api') ,
      method: req.method as any,
      data: req.body,
      headers: req.headers,
      withCredentials: true
    })
    res.status(r.status).json(r.data)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
