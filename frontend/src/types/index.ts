export interface Service {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
  color: string
}

export interface Testimonial {
  id: string
  name: string
  business: string
  location: string
  text: string
  rating: number
  avatar: string
}

export interface Inquiry {
  _id: string
  name: string
  businessName: string
  phone: string
  email: string
  service: string
  message: string
  createdAt: string
}

export interface ContactForm {
  name: string
  businessName: string
  phone: string
  email: string
  service: string
  message: string
}

export interface AuthResponse {
  token: string
  message: string
}

export interface DashboardStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
}
