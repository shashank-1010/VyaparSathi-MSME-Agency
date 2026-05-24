import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.js'
import authRoutes from './routes/auth.js'
import inquiryRoutes from './routes/inquiries.js'

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
await connectDB()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://vexa-q32u.onrender.com' : 'http://localhost:5173',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Too many submissions. Please try again later.' },
})

app.use(express.json({ limit: '10kb' }))

// ⬇️ SERVE FRONTEND STATIC FILES ⬇️
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

// Routes
app.use('/api/contact', contactLimiter, contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ⬇️ REACT ROUTER FALLBACK ⬇️
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Vexa API running on port ${PORT}`)
})
