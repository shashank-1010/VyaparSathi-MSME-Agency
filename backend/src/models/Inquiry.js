import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    businessName: { type: String, trim: true, maxlength: 150, default: '' },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, maxlength: 150, default: '' },
    service: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, trim: true, maxlength: 1000, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Inquiry', inquirySchema)
