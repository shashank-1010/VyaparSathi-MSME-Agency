import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.js'
import authRoutes from './routes/auth.js'
import inquiryRoutes from './routes/inquiries.js'

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
await connectDB()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:5173',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: 'Too many submissions. Please try again later.' },
})

app.use(express.json({ limit: '10kb' }))

// Routes
app.use('/api/contact', contactLimiter, contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 VyaparSathi API running on port ${PORT}`)
})
