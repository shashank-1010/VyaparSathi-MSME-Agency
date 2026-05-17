import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Zap, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

// ─── Color System ────────────────────────────────────────────────────────────
// Primary:   #0A0A0A  (near-black for text)
// Accent:    #1A6BFF  (electric blue)
// Surface:   #F5F7FA  (cool off-white)
// Border:    #E4E8EF  (soft border)
// Muted:     #6C7A8D  (secondary text)
// Highlight: #EEF3FF  (blue tint bg)
// ─────────────────────────────────────────────────────────────────────────────

// ── Canvas: Precision Grid + Drifting Nodes ────────────────────────────────
function PrecisionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animFrame: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Node system
    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    interface Node { x: number; y: number; vx: number; vy: number; r: number }
    const nodes: Node[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 2 + 1.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      t += 0.008

      // Subtle dot grid
      const gridGap = 38
      ctx.fillStyle = 'rgba(100,130,200,0.07)'
      for (let gx = 0; gx < W(); gx += gridGap) {
        for (let gy = 0; gy < H(); gy += gridGap) {
          ctx.beginPath()
          ctx.arc(gx, gy, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W()) n.vx *= -1
        if (n.y < 0 || n.y > H()) n.vy *= -1
      })

      // Draw connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 160) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(26,107,255,${(1 - d / 160) * 0.10})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26,107,255,0.22)'
        ctx.fill()
      })

      // Floating accent ring (top-right)
      const rx = W() * 0.82, ry = H() * 0.28
      ctx.beginPath()
      ctx.arc(rx, ry, 80 + Math.sin(t * 0.7) * 6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(26,107,255,0.07)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(rx, ry, 52 + Math.sin(t * 0.9) * 4, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(26,107,255,0.05)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      animFrame = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

// ── Canvas: Soft Wave Separator ────────────────────────────────────────────
function WaveCanvas({ color = 'rgba(26,107,255,0.05)', height = 80 }: { color?: string; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animFrame: number
    let t = 0

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
      t += 0.012
      ctx.beginPath()
      ctx.moveTo(0, H())
      for (let x = 0; x <= W(); x += 4) {
        const y = H() * 0.5 + Math.sin(x * 0.012 + t) * (H() * 0.22) + Math.sin(x * 0.02 + t * 1.4) * (H() * 0.1)
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W(), H())
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      animFrame = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${height}px`, pointerEvents: 'none' }}
    />
  )
}

// ── Canvas: Stats pulse ────────────────────────────────────────────────────
function PulseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animFrame: number
    let t = 0

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
      t += 0.01
      // Horizontal shimmer lines
      for (let i = 0; i < 4; i++) {
        const y = (H() / 4) * i + H() / 8
        const alpha = (Math.sin(t + i * 1.2) + 1) / 2 * 0.06
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W(), y)
        ctx.strokeStyle = `rgba(26,107,255,${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      animFrame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

// ── Data ──────────────────────────────────────────────────────────────────
const services = [
  { title: 'WhatsApp Automation', tag: 'Most Popular', desc: 'Auto replies, bookings, payment links & daily reports — all on WhatsApp.', num: '01' },
  { title: 'AI Business Agents', tag: null, desc: 'Custom AI that qualifies leads, manages orders, and syncs with Google Sheets.', num: '02' },
  { title: 'Website Development', tag: null, desc: 'Fast, mobile-first business websites built to convert visitors into customers.', num: '03' },
  { title: 'AI Customer Support', tag: null, desc: '24/7 AI support across all platforms with response times under 5 seconds.', num: '04' },
  { title: 'Inventory & Udhar', tag: null, desc: 'Smart stock tracking with automated credit management and reminders.', num: '05' },
  { title: 'Digital Branding', tag: null, desc: 'Logo, Google Business, social profiles, and 20+ post templates.', num: '06' },
]

const stats = [
  { value: '200+', label: 'Businesses Served' },
  { value: '₹2Cr+', label: 'Revenue Generated' },
  { value: '48hrs', label: 'Avg. Setup Time' },
  { value: '95%', label: 'Client Retention' },
]

const steps = [
  { num: '01', title: 'Tell us about your business', desc: 'Share what you do and what tasks eat up most of your day.' },
  { num: '02', title: 'We build your automation', desc: 'Our team configures AI workflows tailored to your exact business needs.' },
  { num: '03', title: 'Go live in 48 hours', desc: 'Your automations are deployed and running — no technical knowledge required.' },
  { num: '04', title: 'Scale with confidence', desc: 'Get reports, insights, and ongoing support as your business grows.' },
]

const features = [
  'Hindi + English multilingual support',
  'WhatsApp-first (where your customers already are)',
  'UPI & payment reminder automation',
  'Udhar (credit) management built-in',
  'Setup by our team — zero tech knowledge needed',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Home() {
  return (
    <main
      className="overflow-hidden bg-white"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative bg-white pt-32 pb-32 px-6 overflow-hidden"
        style={{ minHeight: '92vh', display: 'flex', alignItems: 'center' }}
      >
        <PrecisionCanvas />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #1A6BFF 30%, #1A6BFF 70%, transparent 100%)',
            opacity: 0.7,
          }}
        />

        <div className="relative max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-7"
                style={{
                  background: '#EEF3FF', border: '1px solid #C7D9FF',
                  borderRadius: '100px', padding: '6px 14px',
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#1A6BFF', display: 'inline-block',
                    boxShadow: '0 0 0 3px rgba(26,107,255,0.2)',
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1A6BFF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  AI Automation for Indian MSMEs
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 58px)',
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: '-0.03em',
                  color: '#0A0A0A',
                  marginBottom: 20,
                }}
              >
                Your business<br />runs itself.{' '}
                <span style={{ color: '#1A6BFF' }}>You<br />focus on growth.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                style={{ fontSize: 17, color: '#4B5A6B', lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}
              >
                VyaparSathi automates WhatsApp, customer support, inventory, and more —
                built specifically for Indian MSMEs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="flex flex-wrap gap-3 items-center"
              >
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px', background: '#0A0A0A', color: '#fff',
                    fontWeight: 700, borderRadius: 100, fontSize: 15,
                    textDecoration: 'none', transition: 'background 0.2s',
                    border: '1px solid #0A0A0A',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1A6BFF')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
                >
                  Get Free Demo <ArrowRight size={15} />
                </Link>
                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px', background: 'transparent', color: '#0A0A0A',
                    fontWeight: 600, borderRadius: 100, fontSize: 15,
                    textDecoration: 'none', border: '1.5px solid #E4E8EF',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#0A0A0A')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#E4E8EF')}
                >
                  See All Services
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                style={{ marginTop: 18, fontSize: 13, color: '#8A97A6' }}
              >
                No credit card · Setup in 48 hrs · Cancel anytime
              </motion.p>
            </div>

            {/* Right — live status card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {[
                { label: 'WhatsApp Automation', sub: 'Auto-replies active', color: '#00C566' },
                { label: 'AI Customer Support', sub: '147 queries handled today', color: '#1A6BFF' },
                { label: 'Inventory Tracking', sub: 'Stock alerts sent: 12', color: '#F5820D' },
                { label: 'Udhar Management', sub: '₹84,200 recovered this week', color: '#8B5CF6' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    background: '#fff', border: '1px solid #E4E8EF',
                    borderRadius: 16, padding: '16px 20px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: item.color + '14',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0A' }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#8A97A6', marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: item.color,
                    background: item.color + '12', padding: '3px 10px', borderRadius: 100,
                    letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0,
                  }}>Live</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <WaveCanvas color="rgba(26,107,255,0.04)" height={90} />
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#F5F7FA', borderTop: '1px solid #E4E8EF', borderBottom: '1px solid #E4E8EF', padding: '52px 24px' }}
      >
        <PulseCanvas />
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.07)}>
              <div style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#6C7A8D', fontWeight: 500, marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,96px) 24px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <motion.p {...fadeUp(0)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 12 }}>
              What We Offer
            </motion.p>
            <motion.h2
              {...fadeUp(0.06)}
              style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#0A0A0A' }}
            >
              Everything your business needs.<br />
              <span style={{ color: '#6C7A8D', fontWeight: 500 }}>In one place.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp(i * 0.07)}
                style={{
                  background: '#fff', border: '1px solid #E4E8EF',
                  borderRadius: 20, padding: '28px 28px 24px',
                  cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(26,107,255,0.10)', borderColor: '#C7D9FF' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#C5CDD8', letterSpacing: '0.1em' }}>{s.num}</span>
                  {s.tag && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: '#1A6BFF', background: '#EEF3FF', padding: '4px 10px', borderRadius: 100, border: '1px solid #C7D9FF',
                    }}>{s.tag}</span>
                  )}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0A0A0A', marginBottom: 8, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6C7A8D', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 18, fontSize: 13, fontWeight: 600, color: '#1A6BFF' }}>
                  Learn more <ChevronRight size={13} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 44 }}>
            <Link
              to="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: '#0A0A0A', color: '#fff',
                fontWeight: 700, borderRadius: 100, fontSize: 15, textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1A6BFF')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
            >
              View All Services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section
        style={{
          background: '#F5F7FA', borderTop: '1px solid #E4E8EF',
          padding: 'clamp(60px,8vw,96px) 24px',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <motion.p {...fadeUp(0)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 12 }}>
              How It Works
            </motion.p>
            <motion.h2
              {...fadeUp(0.06)}
              style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#0A0A0A' }}
            >
              From setup to automation<br />
              <span style={{ color: '#6C7A8D', fontWeight: 500 }}>in 4 simple steps.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(i * 0.1)}
                style={{
                  background: '#fff', border: '1px solid #E4E8EF',
                  borderRadius: 20, padding: '32px',
                  transition: 'box-shadow 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
                whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.07)' }}
              >
                {/* Step number watermark */}
                <div style={{
                  position: 'absolute', top: -8, right: 16,
                  fontSize: 80, fontWeight: 900, color: '#F0F3F8',
                  lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none',
                }}>{step.num}</div>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, background: '#EEF3FF', borderRadius: 10,
                    marginBottom: 16,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#1A6BFF' }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A', marginBottom: 8, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: '#6C7A8D', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', borderTop: '1px solid #E4E8EF', padding: 'clamp(60px,8vw,96px) 24px' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p {...fadeUp(0)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: 14 }}>
              Why VyaparSathi
            </motion.p>
            <motion.h2
              {...fadeUp(0.06)}
              style={{ fontSize: 'clamp(26px, 3.8vw, 42px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: 18 }}
            >
              Built for Indian business.<br />
              <span style={{ color: '#6C7A8D', fontWeight: 500 }}>Not just any business.</span>
            </motion.h2>
            <motion.p
              {...fadeUp(0.1)}
              style={{ fontSize: 16, color: '#4B5A6B', lineHeight: 1.7, marginBottom: 28 }}
            >
              We understand Udhar, Hindi, UPI, and the specific workflows of Indian MSMEs.
              Every feature is designed for how you actually work.
            </motion.p>

            <motion.div {...fadeUp(0.14)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', background: '#0A0A0A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Check size={12} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: '#2D3748', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.2)} style={{ marginTop: 36 }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', background: '#0A0A0A', color: '#fff',
                  fontWeight: 700, borderRadius: 100, fontSize: 15, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1A6BFF')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Feature status panel */}
          <motion.div
            {...fadeUp(0.08)}
            style={{
              background: '#F5F7FA', borderRadius: 24, border: '1px solid #E4E8EF', padding: 28,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6C7A8D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>System Status</span>
              <span style={{
                fontSize: 11, fontWeight: 700, color: '#00C566',
                background: 'rgba(0,197,102,0.1)', padding: '4px 10px', borderRadius: 100,
              }}>All Systems Operational</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'WhatsApp Automation',
                'AI Customer Support',
                'Inventory Tracking',
                'Udhar Management',
                'Daily Business Reports',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.09 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', border: '1px solid #E4E8EF',
                    borderRadius: 12, padding: '13px 16px',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>{item}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#00C566' }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%', background: '#00C566', display: 'inline-block',
                      boxShadow: '0 0 0 3px rgba(0,197,102,0.2)',
                      animation: 'pulse 2s infinite',
                    }} />
                    Active
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #0F1923 100%)',
          padding: 'clamp(60px,8vw,96px) 24px',
        }}
      >
        {/* Subtle canvas bg */}
        <canvas
          ref={useRef<HTMLCanvasElement>(null)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}
        />
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', top: '50%', right: '-80px', transform: 'translateY(-50%)',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,107,255,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h2
            {...fadeUp(0)}
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', marginBottom: 18 }}
          >
            Ready to automate<br />your business?
          </motion.h2>
          <motion.p
            {...fadeUp(0.08)}
            style={{ fontSize: 17, color: '#8A97A6', lineHeight: 1.7, marginBottom: 36, maxWidth: 420, margin: '0 auto 36px' }}
          >
            Get a free 30-minute consultation. We'll show you exactly what can be automated in your business — no obligations.
          </motion.p>
          <motion.div {...fadeUp(0.14)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
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
              Get Started for Free <ArrowRight size={15} />
            </Link>
            <Link
              to="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', color: '#fff', fontWeight: 600,
                borderRadius: 100, fontSize: 15, textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.18)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
            >
              Explore Services
            </Link>
          </motion.div>
          <motion.p {...fadeUp(0.2)} style={{ marginTop: 20, fontSize: 13, color: '#4B5A6B' }}>
            No credit card required · Setup in 48 hours
          </motion.p>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(0,197,102,0.2); }
          50% { box-shadow: 0 0 0 5px rgba(0,197,102,0.08); }
        }
      `}</style>
    </main>
  )
}
