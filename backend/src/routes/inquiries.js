import { Router } from 'express'
import Inquiry from '../models/Inquiry.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// All inquiry routes require auth
router.use(authenticate)

// GET all inquiries with stats
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })

    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const stats = {
      total: inquiries.length,
      today: inquiries.filter(i => new Date(i.createdAt) >= startOfDay).length,
      thisWeek: inquiries.filter(i => new Date(i.createdAt) >= startOfWeek).length,
      thisMonth: inquiries.filter(i => new Date(i.createdAt) >= startOfMonth).length,
    }

    res.json({ inquiries, stats })
  } catch (err) {
    console.error('Fetch inquiries error:', err)
    res.status(500).json({ message: 'Failed to fetch inquiries' })
  }
})

// DELETE inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id)
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' })
    res.json({ message: 'Inquiry deleted' })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ message: 'Failed to delete inquiry' })
  }
})

export default router
