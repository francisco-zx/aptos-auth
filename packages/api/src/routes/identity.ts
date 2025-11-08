import { Router } from 'express'
import { z } from 'zod'

const router = Router()

const store: Record<string, { oauthId: string; aptosAddress: string }> = {}

router.post('/map', (req, res) => {
  const schema = z.object({ oauthId: z.string(), aptosAddress: z.string() })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error })
  const { oauthId, aptosAddress } = parsed.data
  store[oauthId] = { oauthId, aptosAddress }
  res.json(store[oauthId])
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const item = store[id]
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

export { router }
