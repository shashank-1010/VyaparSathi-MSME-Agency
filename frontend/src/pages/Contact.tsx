import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader, MessageCircle, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import type { ContactForm } from '../types'

// ─── Design tokens from Home.tsx ─────────────────────────────────────────────
const WIX_FONT = "'madefor-display', 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const WIX_BODY = "'madefor-text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

const h1St: React.CSSProperties = {
  fontFamily: WIX_FONT,
  fontSize: 'clamp(40px,7.3vw,140px)',
  fontWeight: 700,
  lineHeight: 1.0,
  letterSpacing: '-0.01em',
  color: '#000',
}
const h2St: React.CSSProperties = {
  fontFamily: WIX_FONT,
  fontSize: 'clamp(28px,5vw,96px)',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: '#000',
}
const bodySmSt: React.CSSProperties = {
  fontFamily: WIX_BODY,
  fontSize: 'clamp(14px,1.04vw,20px)',
  color: '#1c1d21',
  lineHeight: 1.6,
}
const labelSt: React.CSSProperties = {
  fontFamily: WIX_FONT,
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#1c1d21',
  marginBottom: 8,
}
const btnBlack: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 24px',
  height: 54,
  background: '#000',
  color: '#fff',
  fontFamily: WIX_BODY,
  fontWeight: 400,
  fontSize: 'clamp(14px,0.94vw,18px)',
  borderRadius: 100,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s',
  whiteSpace: 'nowrap' as const,
  border: 'none',
  width: '100%',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Data ─────────────────────────────────────────────────────────────────────
const serviceOptions = [
  'WhatsApp Automation', 'Website Development', 'AI Business Agents',
  'AI Customer Support', 'Inventory & Udhar Management', 'Digital Branding',
  'Complete Business Package', 'Other',
]
const initialForm: ContactForm = { name: '', businessName: '', phone: '', email: '', service: '', message: '' }

const contactInfo = [
  { icon: Phone, label: 'Phone / WhatsApp', value: '+91 8115067311', href: 'tel:+918115067311' },
  { icon: Mail, label: 'Email', value: 'hello@nexbotai.com', href: 'mailto:hello@nexbotai.com' },
  { icon: MapPin, label: 'Location', value: 'Lucknow, Uttar Pradesh', href: '#' },
]

const responseTimes = [
  ['WhatsApp', '< 10 min'],
  ['Email', '< 2 hrs'],
  ['Phone', 'Instant'],
]

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: WIX_FONT,
        fontSize: 11, fontWeight: 700, color: '#1c1d21',
        marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>{label}</label>
      {children}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
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

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: '#f4f4f4', border: '1px solid',
    borderRadius: 10, fontSize: 'clamp(13px,0.9vw,16px)', color: '#1c1d21',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: WIX_BODY, boxSizing: 'border-box' as const,
  }
  const focusStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? '#000' : '#eaeaea',
    boxShadow: focused === name ? '0 0 0 2px rgba(0,0,0,0.08)' : 'none',
  })

  return (
    <main style={{ background: '#fff', overflow: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════
          HERO — "Let's talk." matching Home.tsx hero style
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: '#fff',
        padding: 'clamp(80px,11vw,160px) 5vw clamp(64px,8vw,120px)',
        borderBottom: '1px solid #eaeaea',
      }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ ...labelSt, marginBottom: 24 }}>
            Contact us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...h1St, marginBottom: 32 }}
          >
            Let's talk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            style={{ ...bodySmSt, maxWidth: 500, color: '#4b5563' }}
          >
            We'll get back to you within 2 hours — or chat on WhatsApp for an instant reply.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT INFO STRIP — 3 cards on #f4f4f4
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f4f4f4', borderBottom: '1px solid #eaeaea', padding: 'clamp(40px,5vw,64px) 5vw' }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(12px,1.5vw,20px)' }}
            className="contact-info-grid"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                {...fadeUp(0.06 + i * 0.08)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#fff', border: '1px solid #eaeaea',
                  borderRadius: 'clamp(10px,1.2vw,16px)',
                  padding: 'clamp(16px,2vw,28px)',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                }}
                whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.07)' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: '#000', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={18} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: WIX_FONT, fontSize: 11, color: '#a7a8a8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontFamily: WIX_FONT, fontWeight: 700, fontSize: 'clamp(13px,1.1vw,17px)', color: '#000' }}>{item.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT — 2-col: form left, sidebar right
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) 5vw', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>
          <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>

            {/* ── Form ─────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p style={{ ...labelSt, marginBottom: 20 }}>Send a message</p>
              <h2 style={{ ...h2St, fontSize: 'clamp(26px,3.5vw,52px)', marginBottom: 36 }}>
                Tell us about<br />your business.
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Your Name *">
                    <input name="name" value={form.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      placeholder="Rajesh Kumar" required style={focusStyle('name')} />
                  </Field>
                  <Field label="Business Name">
                    <input name="businessName" value={form.businessName} onChange={handleChange}
                      onFocus={() => setFocused('biz')} onBlur={() => setFocused(null)}
                      placeholder="Rajesh Traders" style={focusStyle('biz')} />
                  </Field>
                </div>
                <div className="form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Phone / WhatsApp *">
                    <input name="phone" value={form.phone} onChange={handleChange}
                      onFocus={() => setFocused('ph')} onBlur={() => setFocused(null)}
                      placeholder="+91 98765 43210" type="tel" required style={focusStyle('ph')} />
                  </Field>
                  <Field label="Email Address">
                    <input name="email" value={form.email} onChange={handleChange}
                      onFocus={() => setFocused('em')} onBlur={() => setFocused(null)}
                      placeholder="rajesh@gmail.com" type="email" style={focusStyle('em')} />
                  </Field>
                </div>
                <Field label="Service Interested In *">
                  <select name="service" value={form.service} onChange={handleChange}
                    onFocus={() => setFocused('svc')} onBlur={() => setFocused(null)}
                    required style={focusStyle('svc')}>
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                    rows={5} placeholder="Tell us about your business and what you're looking to automate..."
                    style={{ ...focusStyle('msg'), resize: 'none' }}
                  />
                </Field>

                <button
                  type="submit" disabled={loading}
                  style={{
                    ...btnBlack,
                    gap: 8, height: 54,
                    background: loading ? '#a7a8a8' : '#000',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#333' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#000' }}
                >
                  {loading
                    ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                    : <><Send size={15} /> Send message</>}
                </button>

                <p style={{ fontFamily: WIX_BODY, textAlign: 'center', fontSize: 12, color: '#a7a8a8' }}>
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </motion.div>

            {/* ── Sidebar ───────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* WhatsApp CTA — matches Home.tsx black card style */}
              <motion.div
                {...fadeUp(0.2)}
                style={{
                  background: '#000', borderRadius: 'clamp(14px,1.8vw,24px)',
                  padding: 'clamp(24px,3vw,36px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  <span style={{ fontFamily: WIX_FONT, fontWeight: 700, color: '#fff', fontSize: 'clamp(14px,1.1vw,18px)' }}>Quick Reply on WhatsApp</span>
                </div>
                <p style={{ fontFamily: WIX_BODY, fontSize: 14, color: '#5e5e5e', lineHeight: 1.6, marginBottom: 22 }}>
                  Usually reply in under 10 minutes during business hours.
                </p>
                <a
                  href="https://wa.me/918115067311?text=Hi! I want a free demo of Vexa"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 22px', background: '#fff', color: '#000',
                    fontFamily: WIX_BODY, fontWeight: 700, borderRadius: 100,
                    fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <MessageCircle size={15} /> Start WhatsApp Chat
                </a>
              </motion.div>

              {/* Response time — #f4f4f4 card */}
              <motion.div
                {...fadeUp(0.28)}
                style={{
                  background: '#f4f4f4', border: '1px solid #eaeaea',
                  borderRadius: 'clamp(14px,1.8vw,24px)',
                  padding: 'clamp(20px,2.5vw,32px)',
                }}
              >
                <p style={{ ...labelSt, color: '#a7a8a8', marginBottom: 18 }}>Response time</p>
                {responseTimes.map(([channel, time]) => (
                  <div key={channel} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid #eaeaea', padding: '12px 0',
                  }}>
                    <span style={{ fontFamily: WIX_BODY, fontSize: 'clamp(13px,1vw,16px)', color: '#1c1d21' }}>{channel}</span>
                    <span style={{
                      fontFamily: WIX_FONT, fontSize: 12, fontWeight: 700,
                      padding: '4px 12px', borderRadius: 100,
                      background: '#fff', border: '1px solid #eaeaea', color: '#000',
                    }}>{time}</span>
                  </div>
                ))}
              </motion.div>

              {/* Also available */}
              <motion.div
                {...fadeUp(0.34)}
                style={{
                  background: '#fff', border: '1px solid #eaeaea',
                  borderRadius: 'clamp(14px,1.8vw,24px)',
                  padding: 'clamp(20px,2.5vw,32px)',
                }}
              >
                <p style={{ ...labelSt, color: '#a7a8a8', marginBottom: 16 }}>Also available via</p>
                {[
                  { icon: Phone, text: '+91 8115067311', href: 'tel:+918115067311' },
                  { icon: Mail, text: 'hello@nexbotai.com', href: 'mailto:hello@nexbotai.com' },
                ].map(({ icon: Icon, text, href }) => (
                  <a key={text} href={href} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontFamily: WIX_BODY, fontSize: 'clamp(13px,1vw,16px)', color: '#1c1d21',
                    textDecoration: 'none', padding: '10px 0',
                    borderBottom: '1px solid #f4f4f4',
                    transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#166aea')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#1c1d21')}
                  >
                    <Icon size={14} /> {text}
                  </a>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER CTA — gradient bg · white card
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'radial-gradient(circle at 99% 0%, rgba(94,255,255,0.6) 0%, 26%, rgba(94,255,255,0) 70%), radial-gradient(circle at 58% 53%, rgba(53,89,255,0.6) 0%, 42%, rgba(53,89,255,0) 73%), radial-gradient(circle at 49% 50%, #8FA3FF 0%, 100%, rgba(143,163,255,0) 100%)',
        padding: 'clamp(80px,11vw,210px) clamp(48px,8vw,150px) clamp(76px,10vw,192px)',
        textAlign: 'center',
        borderTop: '1px solid #eaeaea',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              background: '#fff',
              borderRadius: 'clamp(16px,2.1vw,80px)',
              padding: 'clamp(48px,5.5vw,105px) clamp(40px,8vw,150px) clamp(60px,6.5vw,125px)',
              textAlign: 'center',
            }}
          >
            <h2 style={{
              fontFamily: WIX_FONT,
              fontSize: 'clamp(36px,6.25vw,120px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#000',
              marginBottom: 44,
            }}>
              We're one message<br />away.
            </h2>
            <motion.div {...fadeUp(0.08)}>
              <a
                href="https://wa.me/918115067311"
                target="_blank" rel="noopener noreferrer"
                style={{
                  ...btnBlack, width: 'auto', display: 'inline-flex', gap: 8,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = '#000')}
              >
                Open WhatsApp <ArrowRight size={16} />
              </a>
            </motion.div>
            <motion.p {...fadeUp(0.14)} style={{ fontFamily: WIX_BODY, fontSize: 'clamp(12px,0.73vw,14px)', color: '#a7a8a8', marginTop: 20 }}>
              ✨ Free consultation · No credit card required.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #a7a8a8; }
        select { color: #1c1d21; }
        @media (max-width: 900px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .contact-info-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
