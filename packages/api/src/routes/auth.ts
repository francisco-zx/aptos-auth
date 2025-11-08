import { Router } from 'express'
import { z } from 'zod'

const router = Router()

// NOTE: This is a minimal demo. Replace with better-auth integrations in prod.
let _session = null
let _user = null

router.get('/session', (req, res) => {
  res.json(_session)
})

router.post('/oauth/:provider', (req, res) => {
  // Simulate OAuth callback - in prod Better Auth will handle this flow
  const { provider } = req.params
  // For demo we accept { id, email }
  const schema = z.object({ id: z.string(), email: z.string().optional() })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error })
  _user = { id: parsed.data.id, email: parsed.data.email, provider }
  _session = { user: _user }
  res.json({ ok: true, user: _user })
})

router.get('/me', (req, res) => {
  if (!_user) return res.status(401).json({ error: 'Not logged' })
  res.json(_user)
})

router.post('/signout', (req, res) => {
  _user = null
  _session = null
  res.json({ ok: true })
})

export { router }
