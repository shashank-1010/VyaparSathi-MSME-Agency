import { motion } from 'framer-motion'
import { Target, Eye, Heart, Zap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

// ── Particle orbit canvas ─────────────────────────────────────────────────
function OrbitCanvas() {
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
    const W = () => canvas.offsetWidth, H = () => canvas.offsetHeight

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      t += 0.008
      // Grid
      ctx.fillStyle = 'rgba(26,107,255,0.055)'
      for (let x = 0; x <= W(); x += 36) for (let y = 0; y <= H(); y += 36) {
        ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill()
      }
      // Diagonal flow lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        const offset = (t * 60 + i * (W() / 3)) % (W() + 200) - 100
        ctx.moveTo(offset, 0)
        ctx.lineTo(offset + W() * 0.5, H())
        ctx.strokeStyle = `rgba(26,107,255,${0.03 - i * 0.005})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

const team = [
  { name: 'Arjun Singh', role: 'Founder & CEO', initials: 'AS' },
  { name: 'Priya Mehta', role: 'Head of AI & Automation', initials: 'PM' },
  { name: 'Rahul Sharma', role: 'Lead Developer', initials: 'RS' },
  { name: 'Neha Agarwal', role: 'Client Success Manager', initials: 'NA' },
]

const stats = [
  { value: '200+', label: 'Businesses Served' },
  { value: '₹2Cr+', label: 'Revenue for Clients' },
  { value: '48hrs', label: 'Avg. Setup Time' },
  { value: '95%', label: 'Client Retention' },
]

const values = [
  { icon: Target, title: 'Our Mission', desc: 'Make AI automation accessible and affordable for every Indian MSME, from a Lucknow kirana store to a Delhi-based service agency.' },
  { icon: Eye, title: 'Our Vision', desc: 'A future where every Indian small business runs efficiently with AI, competing globally through smart automation.' },
  { icon: Heart, title: 'Our Values', desc: 'Transparency, affordability, and genuine impact. We measure success by how much we grow your business, not just ours.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  return (
    <div style={{ background: '#fff', overflow: 'hidden', fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{
        background: '#fff', paddingTop: 116, paddingBottom: 76,
        paddingLeft: 24, paddingRight: 24,
        textAlign: 'center', borderBottom: '1px solid #E4E8EF',
      }}>
        <OrbitCanvas />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, transparent, #1A6BFF 30%, #1A6BFF 70%, transparent)', opacity: 0.7,
        }} />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}
          >
            <Zap size={13} style={{ color: '#1A6BFF' }} fill="#1A6BFF" />
            <span style={{
              background: '#EEF3FF', border: '1px solid #C7D9FF', borderRadius: 100,
              padding: '5px 14px', fontSize: 12, fontWeight: 700, color: '#1A6BFF',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(36px,5.5vw,62px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: 18,
            }}
          >
            Building AI<br />
            <span style={{ color: '#1A6BFF' }}>for Bharat.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            style={{ fontSize: 17, color: '#4B5A6B', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}
          >
            VyaparSathi was born from a simple observation: India's small and medium businesses are
            working hard every day, but spending hours on repetitive tasks that AI can handle in seconds.
          </motion.p>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <div style={{
        background: '#F5F7FA', borderBottom: '1px solid #E4E8EF',
        padding: '52px 24px',
      }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(0.1 + i * 0.07)}>
              <div style={{ fontSize: 'clamp(32px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#6C7A8D', fontWeight: 500 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── STORY ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px,7vw,88px) 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 14 }}>
              Why We Built VyaparSathi
            </p>
            <h2 style={{ fontSize: 'clamp(26px,3.8vw,40px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: 20 }}>
              Giving time back to<br />Indian business owners.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15, color: '#4B5A6B', lineHeight: 1.75 }}>
              <p>Every day, millions of Indian business owners spend their first hours answering the same WhatsApp messages, manually updating stock, and chasing payments — tasks that have nothing to do with growing their business.</p>
              <p>We built VyaparSathi to give that time back. To let a grocery store in Lucknow run inventory on autopilot. To let a tuition center in Lucknow handle admissions without lifting a finger.</p>
              <p>We're a team of builders deeply rooted in understanding the specific needs of Indian businesses — the languages, the payment methods, the workflows.</p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            style={{ background: '#F5F7FA', borderRadius: 24, border: '1px solid #E4E8EF', padding: 28 }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#AAB3C0', marginBottom: 18 }}>Live Automations</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['WhatsApp Automation', 'AI Customer Support', 'Inventory Management', 'Digital Branding'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.09 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', border: '1px solid #E4E8EF', borderRadius: 12, padding: '13px 16px',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{item}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#00C566' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C566', display: 'inline-block' }} />
                    Active
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MISSION / VISION / VALUES ─────────────────────────────── */}
      <div style={{
        background: '#F5F7FA', borderTop: '1px solid #E4E8EF', borderBottom: '1px solid #E4E8EF',
        padding: 'clamp(56px,7vw,88px) 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <motion.p {...fadeUp(0)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 12 }}>What Drives Us</motion.p>
            <motion.h2 {...fadeUp(0.06)} style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#0A0A0A' }}>
              The principles behind<br />every product we build.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                style={{
                  background: '#fff', border: '1px solid #E4E8EF', borderRadius: 20, padding: '32px',
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                }}
                whileHover={{ boxShadow: '0 12px 32px rgba(0,0,0,0.07)', borderColor: '#C7D9FF' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: '#0A0A0A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                }}>
                  <item.icon size={20} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0A0A0A', marginBottom: 10, letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#6C7A8D', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px,7vw,88px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <motion.p {...fadeUp(0)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 12 }}>The Team</motion.p>
          <motion.h2 {...fadeUp(0.06)} style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#0A0A0A' }}>
            Meet the people<br />behind VyaparSathi.
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp(i * 0.09)}
              style={{
                textAlign: 'center', background: '#fff', border: '1px solid #E4E8EF',
                borderRadius: 20, padding: '32px 20px', transition: 'box-shadow 0.2s',
              }}
              whileHover={{ boxShadow: '0 10px 28px rgba(0,0,0,0.07)', y: -2 }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 16, background: '#0A0A0A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 17, color: '#fff', margin: '0 auto 14px',
                letterSpacing: '-0.01em',
              }}>{member.initials}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#0A0A0A' }}>{member.name}</div>
              <div style={{ fontSize: 12, color: '#6C7A8D', marginTop: 4 }}>{member.role}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ padding: '0 24px clamp(56px,7vw,88px)' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #0F1923 100%)',
          borderRadius: 28, padding: 'clamp(40px,5vw,64px)', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 400, height: 300,
            background: 'radial-gradient(ellipse, rgba(26,107,255,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <motion.p {...fadeUp(0)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 14 }}>Let's Work Together</motion.p>
            <motion.h2 {...fadeUp(0.06)} style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff', marginBottom: 14 }}>
              Let's build something<br />together.
            </motion.h2>
            <motion.p {...fadeUp(0.12)} style={{ fontSize: 16, color: '#8A97A6', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 32px' }}>
              Ready to see how AI can transform your business? Let's talk.
            </motion.p>
            <motion.div {...fadeUp(0.16)}>
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
                Get in Touch <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
