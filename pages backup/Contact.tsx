import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import type { ContactForm } from '../types'

// ── Ripple canvas for header ──────────────────────────────────────────────
function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let t = 0, raf: number
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize(); window.addEventListener('resize', resize)
    const W = () => canvas.offsetWidth, H = () => canvas.offsetHeight
    const draw = () => {
      ctx.clearRect(0, 0, W(), H()); t += 0.008
      // Grid
      ctx.fillStyle = 'rgba(26,107,255,0.055)'
      for (let x = 0; x <= W(); x += 36) for (let y = 0; y <= H(); y += 36) {
        ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill()
      }
      // Concentric circles bottom-right
      for (let i = 0; i < 4; i++) {
        const r = 60 + i * 44 + Math.sin(t + i) * 8
        ctx.beginPath()
        ctx.arc(W() * 0.88, H() * 0.72, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(26,107,255,${0.06 - i * 0.01})`
        ctx.lineWidth = 1; ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

const serviceOptions = [
  'WhatsApp Automation','Website Development','AI Business Agents',
  'AI Customer Support','Inventory & Udhar Management','Digital Branding',
  'Complete Business Package','Other',
]
const initialForm: ContactForm = { name: '', businessName: '', phone: '', email: '', service: '', message: '' }
const contactInfo = [
  { icon: Phone, label: 'Phone / WhatsApp', value: '+91 8115067311', href: 'tel:+918115067311' },
  { icon: Mail, label: 'Email', value: 'hello@nexbotai.com', href: 'mailto:hello@nexbotai.com' },
  { icon: MapPin, label: 'Location', value: 'Lucknow, Uttar Pradesh', href: '#' },
]

const input = {
  width: '100%', padding: '13px 16px',
  background: '#F5F7FA', border: '1px solid #E4E8EF',
  borderRadius: 12, fontSize: 14, color: '#0A0A0A',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit', boxSizing: 'border-box' as const,
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service) { toast.error('Please fill all required fields'); return }
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success("Message sent! We'll contact you within 2 hours.")
      setForm(initialForm)
    } catch {
      toast.error('Something went wrong. Please call us directly.')
    } finally { setLoading(false) }
  }

  const focusStyle = (name: string) => focused === name
    ? { ...input, borderColor: '#1A6BFF', boxShadow: '0 0 0 3px rgba(26,107,255,0.12)' }
    : input

  return (
    <div style={{ background: '#fff', overflow: 'hidden', fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{
        background: '#fff', paddingTop: 116, paddingBottom: 72,
        paddingLeft: 24, paddingRight: 24,
        textAlign: 'center', borderBottom: '1px solid #E4E8EF',
      }}>
        <RippleCanvas />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, transparent, #1A6BFF 30%, #1A6BFF 70%, transparent)', opacity: 0.7,
        }} />
        <div className="relative max-w-2xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 16 }}>
            Contact Us
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(38px,5.5vw,62px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: 16 }}>
            Let's talk.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            style={{ fontSize: 17, color: '#4B5A6B', lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>
            We'll get back to you within 2 hours — or chat on WhatsApp for an instant reply.
          </motion.p>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,6vw,80px) 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {contactInfo.map((item, i) => (
              <motion.a key={item.label} href={item.href}
                {...fadeUp(0.1 + i * 0.09)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                  background: '#fff', border: '1px solid #E4E8EF', borderRadius: 16,
                  textDecoration: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ borderColor: '#C7D9FF', boxShadow: '0 6px 20px rgba(26,107,255,0.08)' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12, background: '#F5F7FA',
                  border: '1px solid #E4E8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.icon size={18} style={{ color: '#0A0A0A' }} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#AAB3C0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0A0A0A' }}>{item.value}</div>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp */}
            <motion.div {...fadeUp(0.4)} style={{ background: '#0A0A0A', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C566', display: 'inline-block' }} />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>Quick Response on WhatsApp</span>
              </div>
              <p style={{ fontSize: 13, color: '#6C7A8D', lineHeight: 1.65, marginBottom: 18 }}>Usually reply in under 10 minutes during business hours.</p>
              <a href="https://wa.me/918115067311?text=Hi! I want a free demo of Vexa"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', background: '#fff', color: '#0A0A0A',
                  fontWeight: 700, borderRadius: 100, fontSize: 13, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}>
                <MessageCircle size={14} /> Start WhatsApp Chat
              </a>
            </motion.div>

            {/* Response time */}
            <motion.div {...fadeUp(0.5)} style={{ background: '#F5F7FA', border: '1px solid #E4E8EF', borderRadius: 16, padding: 22 }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#AAB3C0', marginBottom: 14 }}>Response Time</p>
              {[['WhatsApp', '< 10 min', '#00C566'], ['Email', '< 2 hrs', '#1A6BFF'], ['Phone', 'Instant', '#0A0A0A']].map(([ch, t, c]) => (
                <div key={ch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, color: '#2D3748' }}>{ch}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 700, padding: '3px 10px',
                    borderRadius: 100, background: '#fff', border: '1px solid #E4E8EF', color: c,
                  }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} style={{
              background: '#fff', border: '1px solid #E4E8EF', borderRadius: 24,
              padding: 'clamp(24px,4vw,36px)',
            }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 6 }}>Send us a message</h2>
              <p style={{ fontSize: 14, color: '#6C7A8D', marginBottom: 24 }}>Fill the form and we'll reach out within 2 hours.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                <Field label="Your Name *">
                  <input name="name" value={form.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Rajesh Kumar" required style={focusStyle('name')} />
                </Field>
                <Field label="Business Name">
                  <input name="businessName" value={form.businessName} onChange={handleChange} onFocus={() => setFocused('biz')} onBlur={() => setFocused(null)} placeholder="Rajesh Traders" style={focusStyle('biz')} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                <Field label="Phone / WhatsApp *">
                  <input name="phone" value={form.phone} onChange={handleChange} onFocus={() => setFocused('ph')} onBlur={() => setFocused(null)} placeholder="+91 98765 43210" type="tel" required style={focusStyle('ph')} />
                </Field>
                <Field label="Email Address">
                  <input name="email" value={form.email} onChange={handleChange} onFocus={() => setFocused('em')} onBlur={() => setFocused(null)} placeholder="rajesh@gmail.com" type="email" style={focusStyle('em')} />
                </Field>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Field label="Service Interested In *">
                  <select name="service" value={form.service} onChange={handleChange} onFocus={() => setFocused('svc')} onBlur={() => setFocused(null)} required style={focusStyle('svc')}>
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <div style={{ marginBottom: 24 }}>
                <Field label="Message">
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                    rows={4} placeholder="Tell us about your business and what you're looking to automate..."
                    style={{ ...focusStyle('msg'), resize: 'none' }}
                  />
                </Field>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '15px 24px', background: loading ? '#6C7A8D' : '#0A0A0A', color: '#fff',
                fontWeight: 700, borderRadius: 100, fontSize: 15, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s', fontFamily: 'inherit',
              }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#1A6BFF' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0A0A0A' }}
              >
                {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} />}
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: '#AAB3C0', marginTop: 14 }}>We respect your privacy. No spam, ever.</p>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder, select { color: #AAB3C0; }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#2D3748', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
      {children}
    </div>
  )
}
