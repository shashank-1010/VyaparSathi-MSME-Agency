import { motion } from 'framer-motion'
import { MessageSquare, Globe, Bot, Boxes, Megaphone, HeadphonesIcon, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

// ── Canvas: Flowing Line Background ──────────────────────────────────────────
function FlowCanvas() {
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
    resize()
    window.addEventListener('resize', resize)
    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      t += 0.006

      // Grid dots
      ctx.fillStyle = 'rgba(26,107,255,0.06)'
      for (let x = 0; x <= W(); x += 40) {
        for (let y = 0; y <= H(); y += 40) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill()
        }
      }

      // Flowing curves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, H() * (0.25 + i * 0.25))
        for (let x = 0; x <= W(); x += 6) {
          const y = H() * (0.25 + i * 0.25) + Math.sin(x * 0.006 + t + i * 1.8) * 22
          ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(26,107,255,${0.035 - i * 0.006})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

const services = [
  {
    icon: MessageSquare, title: 'WhatsApp Automation', tag: 'Most Popular',
    desc: 'Turn WhatsApp into your most powerful business tool with smart automation that works 24/7.',
    features: [
      'Auto Replies & Quick Responses', 'Booking & Appointment System',
      'Product Catalog Sharing', 'Inquiry Handling & Lead Capture',
      'Automatic Payment Links & Reminders', 'Delivery & Follow-up Reminders',
      'Inventory Stock Alerts', 'Udhar (Credit) Management',
      'Daily Business Reports', 'Voice Command Support',
    ],
    price: 'From ₹1,499/mo', color: '#00B050',
  },
  {
    icon: Globe, title: 'Website Development', tag: null,
    desc: 'Professional business websites that are fast, mobile-friendly, and built to convert visitors.',
    features: [
      'Modern Business Website', 'Mobile-First Responsive Design',
      'WhatsApp & Call Button Integration', 'Basic SEO Setup',
      'Admin Dashboard / CMS', 'Fast Loading (< 3 seconds)',
      'Google Analytics Integration', 'Contact & Lead Forms',
      'Google Maps Integration', 'SSL Certificate Included',
    ],
    price: 'From ₹4,999 one-time', color: '#1A6BFF',
  },
  {
    icon: Bot, title: 'AI Business Agents', tag: null,
    desc: 'Smart AI agents that automate sales, support, and operations for your specific business type.',
    features: [
      'Custom AI Chatbot', 'Multilingual Support (Hindi/English)',
      'Lead Qualification Automation', 'Order Management AI',
      'Custom Workflow Automation', 'CRM Integration',
      'Sales Follow-up Automation', 'Data Entry Automation',
      'Report Generation', 'Google Sheets Sync',
    ],
    price: 'From ₹2,999/mo', color: '#7B5CF6',
  },
  {
    icon: HeadphonesIcon, title: 'AI Customer Support', tag: null,
    desc: 'Never miss a customer query with AI-powered support available around the clock on all platforms.',
    features: [
      'AI Support Bot (24/7)', 'Multi-Platform Coverage',
      'FAQ Automation', 'Complaint Routing',
      'Ticket Management', 'Escalation to Human Agent',
      'Customer Sentiment Analysis', 'Support Analytics Dashboard',
      'Quick Reply Templates', 'Response Time < 5 seconds',
    ],
    price: 'From ₹1,999/mo', color: '#F5820D',
  },
  {
    icon: Boxes, title: 'Inventory & Udhar Management', tag: null,
    desc: 'Smart inventory tracking with automated udhar (credit) management and daily business reports.',
    features: [
      'Stock Level Tracking', 'Low Stock WhatsApp Alerts',
      'Purchase Order Automation', 'Udhar (Credit) Ledger',
      'Customer Credit Limits', 'Automatic Payment Reminders',
      'Daily Inventory Reports', 'Barcode Support',
      'Supplier Management', 'P&L Summary Reports',
    ],
    price: 'From ₹999/mo', color: '#00A99D',
  },
  {
    icon: Megaphone, title: 'Digital Branding', tag: null,
    desc: 'Build a strong digital presence with professional branding that makes your business stand out.',
    features: [
      'Logo Design', 'Brand Color & Font Kit',
      'Google Business Profile Setup', 'Social Media Profile Branding',
      'Business Card Design', 'Letterhead & Invoice Template',
      'WhatsApp Business Setup', 'Content Calendar',
      'Post Templates (20+)', 'Local SEO Optimization',
    ],
    price: 'From ₹2,499 one-time', color: '#E0407B',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Services() {
  return (
    <div
      style={{ background: '#fff', overflow: 'hidden', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: '#fff', paddingTop: 116, paddingBottom: 76,
          paddingLeft: 24, paddingRight: 24,
          textAlign: 'center', borderBottom: '1px solid #E4E8EF',
        }}
      >
        <FlowCanvas />
        {/* Top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, transparent, #1A6BFF 30%, #1A6BFF 70%, transparent)',
          opacity: 0.7,
        }} />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}
          >
            <span style={{
              background: '#EEF3FF', border: '1px solid #C7D9FF',
              borderRadius: 100, padding: '5px 14px',
              fontSize: 12, fontWeight: 700, color: '#1A6BFF',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>What We Offer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(34px,5.5vw,60px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: 18,
            }}
          >
            Solutions built for<br />
            <span style={{ color: '#1A6BFF' }}>Indian business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            style={{ fontSize: 17, color: '#4B5A6B', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 32px' }}
          >
            Comprehensive AI automation built specifically for MSMEs — from kirana stores to service agencies.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: '#0A0A0A', color: '#fff',
                fontWeight: 700, borderRadius: 100, fontSize: 15, textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1A6BFF')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
            >
              Get Free Consultation <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── SERVICES GRID ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,6vw,80px) 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              {...fadeUp(idx * 0.07)}
              style={{
                background: '#fff', border: '1px solid #E4E8EF',
                borderRadius: 24, padding: 36,
                transition: 'box-shadow 0.2s, border-color 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{
                boxShadow: `0 16px 40px rgba(26,107,255,0.09)`,
                borderColor: '#C7D9FF',
              }}
            >
              {/* Subtle color accent corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 120, height: 120,
                background: `radial-gradient(circle at top right, ${service.color}0A 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: service.color + '14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <service.icon size={22} style={{ color: service.color }} />
                </div>
                {service.tag && (
                  <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#1A6BFF', background: '#EEF3FF', padding: '5px 12px',
                    borderRadius: 100, border: '1px solid #C7D9FF',
                  }}>{service.tag}</span>
                )}
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 8 }}>
                {service.title}
              </h2>
              <p style={{ fontSize: 14, color: '#6C7A8D', lineHeight: 1.7, marginBottom: 24 }}>{service.desc}</p>

              {/* Features 2-col */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2" style={{ marginBottom: 28 }}>
                {service.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                      background: service.color + '18',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={9} style={{ color: service.color }} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 12.5, color: '#2D3748', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 20, borderTop: '1px solid #F0F3F8',
              }}>
                <div>
                  <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#AAB3C0', fontWeight: 600, marginBottom: 3 }}>Starting at</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.01em' }}>{service.price}</p>
                </div>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 20px', background: '#0A0A0A', color: '#fff',
                    fontWeight: 700, borderRadius: 100, fontSize: 13, textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = service.color)}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
                >
                  Get Started <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            marginTop: 56, background: 'linear-gradient(135deg, #0A0A0A 0%, #0F1923 100%)',
            borderRadius: 28, padding: 'clamp(40px,5vw,64px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 500, height: 300,
            background: 'radial-gradient(ellipse, rgba(26,107,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 14 }}>
              Not Sure Where to Start?
            </p>
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff', marginBottom: 14 }}>
              We'll find the right plan for you.
            </h2>
            <p style={{ fontSize: 16, color: '#8A97A6', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 32px' }}>
              Get a free 30-minute consultation and we'll recommend the best automation strategy for your business.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: '#1A6BFF', color: '#fff',
                fontWeight: 700, borderRadius: 100, fontSize: 15, textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Book Free Consultation <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
