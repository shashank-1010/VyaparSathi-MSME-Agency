import { motion } from 'framer-motion'
import { MessageSquare, Globe, Bot, Boxes, Megaphone, HeadphonesIcon, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

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
const h3St: React.CSSProperties = {
  fontFamily: WIX_FONT,
  fontSize: 'clamp(20px,2.9vw,56px)',
  fontWeight: 700,
  lineHeight: 1.2,
  color: '#000',
}
const bodySt: React.CSSProperties = {
  fontFamily: WIX_BODY,
  fontSize: 'clamp(16px,1.25vw,24px)',
  color: '#1c1d21',
  lineHeight: 1.6,
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
}
const btnBlueSt: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 24px',
  height: 54,
  background: '#166aea',
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
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Data ─────────────────────────────────────────────────────────────────────
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
    price: 'From ₹1,499/mo',
    color: '#166aea',
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
    price: 'From ₹4,999 one-time',
    color: '#000',
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
    price: 'From ₹2,999/mo',
    color: '#000',
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
    price: 'From ₹1,999/mo',
    color: '#000',
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
    price: 'From ₹999/mo',
    color: '#000',
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
    price: 'From ₹2,499 one-time',
    color: '#000',
  },
]

const packageItems = [
  'WhatsApp Automation', 'Business Website', 'AI Customer Support',
  'Digital Branding', 'Inventory Management', 'Priority Support',
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <main style={{ background: '#fff', overflow: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════
          HERO — huge h1 matching Home.tsx hero section style
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: '#fff',
        padding: 'clamp(80px,11vw,160px) 5vw clamp(64px,8vw,120px)',
        borderBottom: '1px solid #eaeaea',
      }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>

          <motion.p {...fadeUp(0)} style={{ ...labelSt, marginBottom: 24 }}>
            What we offer
          </motion.p>

          <motion.h1 {...fadeUp(0.06)} style={{ ...h1St, maxWidth: 900, marginBottom: 32 }}>
            Solutions built for<br />Indian business.
          </motion.h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <motion.p {...fadeUp(0.12)} style={{ ...bodySt, maxWidth: 540, color: '#4b5563' }}>
              Comprehensive AI automation built specifically for MSMEs — from kirana stores to service agencies.
              We handle the tech so you can focus on your business.
            </motion.p>
            <motion.div {...fadeUp(0.18)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={btnBlack}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = '#000')}
              >
                Free consultation
              </Link>
              <Link
                to="/contact"
                style={btnBlueSt}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f5bd6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#166aea')}
              >
                Get a quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES LIST — alternating white / #f4f4f4
          Each service is a full-width section, 2-col layout
      ═══════════════════════════════════════════════════════ */}
      {services.map((service, idx) => {
        const isEven = idx % 2 === 0
        return (
          <section
            key={service.title}
            style={{
              background: isEven ? '#fff' : '#f4f4f4',
              padding: 'clamp(56px,7vw,100px) 5vw',
              borderBottom: '1px solid #eaeaea',
            }}
          >
            <div style={{ maxWidth: 1258, margin: '0 auto' }}>
              <div
                className="svc-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(40px,6vw,96px)',
                  alignItems: 'start',
                }}
              >
                {/* Left: heading + desc + price + CTA */}
                <motion.div {...fadeUp(0)} style={{ order: isEven ? 0 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: '#000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <service.icon size={20} color="#fff" />
                    </div>
                    {service.tag && (
                      <span style={{
                        fontFamily: WIX_FONT, fontSize: 11, fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#166aea', background: '#fff',
                        padding: '5px 14px', borderRadius: 100,
                        border: '1.5px solid #166aea',
                      }}>{service.tag}</span>
                    )}
                  </div>

                  <h2 style={{ ...h2St, fontSize: 'clamp(26px,3.5vw,60px)', marginBottom: 18 }}>
                    {service.title}
                  </h2>
                  <p style={{ ...bodySmSt, color: '#4b5563', marginBottom: 36 }}>{service.desc}</p>

                  <div style={{ marginBottom: 36 }}>
                    <p style={{ fontFamily: WIX_BODY, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a7a8a8', marginBottom: 4 }}>Starting at</p>
                    <p style={{ fontFamily: WIX_FONT, fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: '#000', letterSpacing: '-0.01em' }}>{service.price}</p>
                  </div>

                  <Link
                    to="/contact"
                    style={btnBlack}
                    onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#000')}
                  >
                    Get started <ArrowRight size={16} style={{ marginLeft: 6 }} />
                  </Link>
                </motion.div>

                {/* Right: feature checklist card */}
                <motion.div
                  {...fadeUp(0.1)}
                  style={{ order: isEven ? 1 : 0 }}
                >
                  <div style={{
                    background: isEven ? '#f4f4f4' : '#fff',
                    border: '1px solid #eaeaea',
                    borderRadius: 'clamp(14px,1.8vw,28px)',
                    padding: 'clamp(24px,3vw,40px)',
                  }}>
                    <p style={{ ...labelSt, color: '#a7a8a8', marginBottom: 20 }}>What's included</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px' }}>
                      {service.features.map((f) => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                            background: '#000',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginTop: 1,
                          }}>
                            <Check size={10} color="#fff" strokeWidth={3} />
                          </div>
                          <span style={{ fontFamily: WIX_BODY, fontSize: 'clamp(12px,0.85vw,15px)', color: '#1c1d21', lineHeight: 1.45 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ═══════════════════════════════════════════════════════
          COMPLETE PACKAGE — #f4f4f4 · card with checklist
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) 5vw', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              background: '#f4f4f4', border: '1px solid #eaeaea',
              borderRadius: 'clamp(16px,2.1vw,40px)',
              padding: 'clamp(40px,5vw,80px)',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)',
              alignItems: 'center',
            }}
            className="pkg-row"
          >
            <div>
              <p style={{ ...labelSt, marginBottom: 20 }}>Best value</p>
              <h2 style={{ ...h2St, fontSize: 'clamp(26px,4vw,64px)', marginBottom: 18 }}>
                Complete Business<br />Package.
              </h2>
              <p style={{ ...bodySmSt, color: '#4b5563', marginBottom: 36 }}>
                Everything you need to run a modern, automated Indian business. Bundled together at a price that makes sense.
              </p>
              <Link
                to="/contact"
                style={btnBlack}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = '#000')}
              >
                Get the package <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </Link>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {packageItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.08 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: '#fff', border: '1px solid #eaeaea',
                      borderRadius: 12, padding: '14px 18px',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', background: '#000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Check size={11} color="#fff" strokeWidth={3} />
                    </div>
                    <span style={{ fontFamily: WIX_BODY, fontSize: 'clamp(13px,1vw,16px)', color: '#1c1d21' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER CTA — gradient bg · white card
          (exact mirror of Home.tsx footer CTA)
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
              We'll find the right<br />plan for you.
            </h2>
            <motion.div {...fadeUp(0.08)} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={btnBlack}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = '#000')}
              >
                Book free consultation <ArrowRight size={16} style={{ marginLeft: 4 }} />
              </Link>
              <Link
                to="/contact"
                style={btnBlueSt}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f5bd6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#166aea')}
              >
                Chat on WhatsApp
              </Link>
            </motion.div>
            <motion.p {...fadeUp(0.14)} style={{ fontFamily: WIX_BODY, fontSize: 'clamp(12px,0.73vw,14px)', color: '#a7a8a8', marginTop: 20 }}>
              Free 30-minute call · No commitment required · Reply within 2 hours
            </motion.p>
          </motion.div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; }
        @media (max-width: 900px) {
          .svc-row { grid-template-columns: 1fr !important; }
          .pkg-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
