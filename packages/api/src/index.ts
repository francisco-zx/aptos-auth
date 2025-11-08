import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router as authRouter } from './routes/auth'
import { router as identityRouter } from './routes/identity'

const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/identity', identityRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log('API ready on', port))
