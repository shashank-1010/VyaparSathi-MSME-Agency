import { Router } from 'express'
import Inquiry from '../models/Inquiry.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, businessName, phone, email, service, message } = req.body

    if (!name || !phone || !service) {
      return res.status(400).json({ message: 'Name, phone and service are required' })
    }

    const inquiry = await Inquiry.create({ name, businessName, phone, email, service, message })
    res.status(201).json({ message: 'Inquiry submitted successfully', id: inquiry._id })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ message: 'Failed to save inquiry' })
  }
})

export default router
