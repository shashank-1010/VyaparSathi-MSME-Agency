import { motion, AnimatePresence } from 'framer-motion'
import { Target, Eye, Heart, ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
const stats = [
  { value: '200+', label: 'Businesses Served' },
  { value: '₹2Cr+', label: 'Revenue Generated' },
  { value: '48hrs', label: 'Avg. Setup Time' },
  { value: '95%', label: 'Client Retention' },
]

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'Make AI automation accessible and affordable for every Indian MSME — from a Lucknow kirana store to a Delhi-based service agency.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: 'A future where every Indian small business runs efficiently with AI, competing globally through smart automation.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    desc: 'Transparency, affordability, and genuine impact. We measure success by how much we grow your business, not just ours.',
  },
]

const team = [
  { name: 'Shashank Pandey', role: 'CEO & Lead Automation', initials: 'SP' },
  { name: 'Mayank Gautam', role: 'Client Operations & Marketing Head', initials: 'MG' },
]

const automations = [
  'WhatsApp Automation',
  'AI Customer Support',
  'Inventory Management',
  'Digital Branding',
]

// ─── FAQ accordion (matches Home.tsx FAQItem pattern) ─────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #eaeaea' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
          gap: 16,
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: WIX_FONT,
          fontSize: 'clamp(16px,1.67vw,32px)',
          fontWeight: 700,
          color: '#000',
          lineHeight: 1.3,
        }}>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
            border: '1.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronDown size={16} color="#000" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ ...bodySmSt, paddingBottom: 28, maxWidth: 900 }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const faqs = [
  {
    q: 'Who is Vexa built for?',
    a: 'Vexa is built for Indian MSMEs — grocery stores, medical shops, tuition centers, service agencies, and any business that wants to automate repetitive tasks and serve customers better using AI.',
  },
  {
    q: 'Do I need technical knowledge to use your services?',
    a: 'Not at all. We handle the full setup, training, and onboarding. You just run your business — we take care of the automation.',
  },
  {
    q: 'Are your solutions available in Hindi?',
    a: 'Yes. All our AI tools support Hindi, Hinglish, and English so your customers can interact naturally in the language they prefer.',
  },
  {
    q: 'How quickly can I get started?',
    a: 'Most setups are live within 48 hours of your onboarding call. Complex custom implementations may take 3–5 business days.',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main style={{ background: '#fff', overflow: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════
          HERO — "Building AI for Bharat."
          White bg · label + huge h1 + subtext
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: '#fff',
        padding: 'clamp(80px,11vw,160px) 5vw clamp(64px,8vw,120px)',
        borderBottom: '1px solid #eaeaea',
      }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>

          <motion.p {...fadeUp(0)} style={{ ...labelSt, marginBottom: 24 }}>
            Our story
          </motion.p>

          <motion.h1 {...fadeUp(0.06)} style={{ ...h1St, maxWidth: 900, marginBottom: 32 }}>
            Building AI<br />for Bharat.
          </motion.h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <motion.p {...fadeUp(0.12)} style={{ ...bodySt, maxWidth: 560, color: '#4b5563' }}>
              Vexa was built with a simple mission — helping Indian businesses save time, streamline operations, and grow faster through modern digital solutions.
            </motion.p>
            <motion.div {...fadeUp(0.18)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={btnBlack}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = '#000')}
              >
                Get in touch
              </Link>
              <Link
                to="/services"
                style={btnBlueSt}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f5bd6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#166aea')}
              >
                Our services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS STRIP — 4 numbers on #f4f4f4
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f4f4f4', borderBottom: '1px solid #eaeaea', padding: 'clamp(40px,5vw,72px) 5vw' }}>
        <div style={{
          maxWidth: 1258, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(24px,3vw,48px)',
        }}
          className="about-stats-grid"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(0.05 + i * 0.07)} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: WIX_FONT,
                fontSize: 'clamp(36px,5vw,80px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#000',
                lineHeight: 1,
                marginBottom: 8,
              }}>{s.value}</div>
              <div style={{ ...bodySmSt, color: '#5e5e5e' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STORY — 2-col: text left, live automations right
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) 5vw', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>
          <div className="about-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>

            {/* Text */}
            <motion.div {...fadeUp(0)}>
              <p style={{ ...labelSt, marginBottom: 20 }}>Why we built Vexa</p>
              <h2 style={{ ...h2St, fontSize: 'clamp(28px,4vw,64px)', marginBottom: 28 }}>
                Giving time back<br />to Indian owners.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={bodySmSt}>Every day, millions of Indian business owners spend their first hours answering the same WhatsApp messages, manually updating stock, and chasing payments — tasks that have nothing to do with growing their business.</p>
                <p style={bodySmSt}>We built Vexa to give that time back. To let a grocery store in Lucknow run inventory on autopilot. To let a tuition center handle admissions without lifting a finger.</p>
                <p style={bodySmSt}>We're a team of builders deeply rooted in the specific needs of Indian businesses — the languages, the payment methods, the workflows.</p>
              </div>
            </motion.div>

            {/* Live automations card — matches Home.tsx card style */}
            <motion.div
              {...fadeUp(0.1)}
              style={{
                background: '#f4f4f4',
                borderRadius: 'clamp(12px,1.5vw,24px)',
                border: '1px solid #eaeaea',
                padding: 'clamp(24px,3vw,40px)',
              }}
            >
              <p style={{ ...labelSt, color: '#a7a8a8', marginBottom: 20 }}>Live Automations</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {automations.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.09 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: '#fff', border: '1px solid #eaeaea',
                      borderRadius: 10, padding: '14px 18px',
                    }}
                  >
                    <span style={{ fontFamily: WIX_BODY, fontSize: 'clamp(13px,1vw,16px)', color: '#1c1d21' }}>{item}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: WIX_BODY, fontSize: 12, fontWeight: 700, color: '#16a34a' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                      Active
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MISSION / VISION / VALUES — #f4f4f4 · 3 cards
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f4f4f4', padding: 'clamp(64px,8vw,120px) 5vw', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>

          <motion.p {...fadeUp(0)} style={{ ...labelSt, marginBottom: 16 }}>What drives us</motion.p>
          <motion.h2 {...fadeUp(0.06)} style={{ ...h2St, fontSize: 'clamp(26px,4vw,72px)', marginBottom: 'clamp(36px,5vw,64px)' }}>
            The principles behind<br />every product we build.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(12px,1.5vw,20px)' }}
            className="values-grid"
          >
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.09)}
                style={{
                  background: '#fff',
                  border: '1px solid #eaeaea',
                  borderRadius: 'clamp(12px,1.5vw,20px)',
                  padding: 'clamp(24px,3vw,40px)',
                  transition: 'box-shadow 0.2s',
                }}
                whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                }}>
                  <item.icon size={20} color="#fff" />
                </div>
                <h3 style={{ ...h3St, fontSize: 'clamp(18px,1.8vw,28px)', marginBottom: 12 }}>{item.title}</h3>
                <p style={bodySmSt}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TEAM — White bg · 4 cards
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) 5vw', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: 1258, margin: '0 auto' }}>

          <motion.p {...fadeUp(0)} style={{ ...labelSt, marginBottom: 16 }}>The team</motion.p>
          <motion.h2 {...fadeUp(0.06)} style={{ ...h2St, fontSize: 'clamp(26px,4vw,72px)', marginBottom: 'clamp(36px,5vw,64px)' }}>
            The people behind<br />Vexa.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(12px,1.5vw,20px)' }}
            className="team-grid"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.09)}
                style={{
                  background: '#f4f4f4', border: '1px solid #eaeaea',
                  borderRadius: 'clamp(12px,1.5vw,20px)',
                  padding: 'clamp(24px,2.5vw,36px)',
                  textAlign: 'center',
                  transition: 'box-shadow 0.2s',
                }}
                whileHover={{ boxShadow: '0 10px 32px rgba(0,0,0,0.07)' }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: 16, background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: WIX_FONT, fontWeight: 700, fontSize: 18, color: '#fff',
                  margin: '0 auto clamp(14px,1.5vw,20px)',
                }}>{member.initials}</div>
                <div style={{ fontFamily: WIX_FONT, fontWeight: 700, fontSize: 'clamp(14px,1.2vw,18px)', color: '#000', marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontFamily: WIX_BODY, fontSize: 13, color: '#5e5e5e' }}>{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ — White bg · accordion matching Home.tsx
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(54px,7vw,100px) 5vw', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <motion.h2 {...fadeUp(0)} style={{ ...h2St, fontSize: 'clamp(24px,5vw,72px)', marginBottom: 48 }}>
            Common questions
          </motion.h2>
          <motion.div {...fadeUp(0.06)} style={{ borderTop: '1px solid #eaeaea' }}>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER CTA — gradient bg · card with h2 + CTA
          (mirrors Home.tsx footer CTA section exactly)
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
              Let's build something<br />together.
            </h2>
            <motion.div {...fadeUp(0.08)} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={btnBlack}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = '#000')}
              >
                Get in touch <ArrowRight size={16} style={{ marginLeft: 4 }} />
              </Link>
              <Link
                to="/services"
                style={btnBlueSt}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f5bd6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#166aea')}
              >
                View services
              </Link>
            </motion.div>
            <motion.p {...fadeUp(0.14)} style={{ fontFamily: WIX_BODY, fontSize: 'clamp(12px,0.73vw,14px)', color: '#a7a8a8', marginTop: 20 }}>
              Free consultation · No commitment · Reply within 2 hours
            </motion.p>
          </motion.div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; }
        @media (max-width: 900px) {
          .about-2col { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .about-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
