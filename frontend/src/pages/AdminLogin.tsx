import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Zap, Loader, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'

// ── Minimal canvas bg ──────────────────────────────────────────────────────
function LoginCanvas() {
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
      ctx.clearRect(0, 0, W(), H()); t += 0.007
      ctx.fillStyle = 'rgba(26,107,255,0.05)'
      for (let x = 0; x <= W(); x += 40) for (let y = 0; y <= H(); y += 40) {
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill()
      }
      // Single soft ring center-right
      const rx = W() * 0.8, ry = H() * 0.3
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(rx, ry, 70 + i * 50 + Math.sin(t + i) * 5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(26,107,255,${0.04 - i * 0.01})`
        ctx.lineWidth = 1; ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('admin_token', data.token)
      navigate('/admin/dashboard')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      toast.error(error?.response?.data?.message || 'Invalid credentials')
    } finally { setLoading(false) }
  }

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: '#F5F7FA', border: '1px solid',
    borderRadius: 12, fontSize: 14, color: '#0A0A0A',
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const focusStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? '#1A6BFF' : '#E4E8EF',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,107,255,0.12)' : 'none',
  })

  return (
    <div className="relative" style={{
      minHeight: '100vh', background: '#F5F7FA',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      overflow: 'hidden',
    }}>
      <LoginCanvas />

      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, #1A6BFF 30%, #1A6BFF 70%, transparent)',
        opacity: 0.7,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 440, position: 'relative' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 40, height: 40, background: '#0A0A0A', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={19} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0A0A0A' }}>VyaparSathi</span>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 18,
            background: '#fff', border: '1px solid #E4E8EF', borderRadius: 100, padding: '5px 14px',
          }}>
            <Shield size={13} style={{ color: '#6C7A8D' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6C7A8D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Restricted Access</span>
          </div>

          <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: 6 }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: 14, color: '#6C7A8D' }}>Authorized personnel only.</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', border: '1px solid #E4E8EF', borderRadius: 24,
          padding: '34px 32px', boxShadow: '0 16px 48px rgba(0,0,0,0.07)',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#2D3748', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Email Address
              </label>
              <input
                type="email" value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                placeholder="admin@nexbotai.com" required
                style={focusStyle('email')}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#2D3748', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  onFocus={() => setFocused('pass')} onBlur={() => setFocused(null)}
                  placeholder="Enter your password" required
                  style={{ ...focusStyle('pass'), paddingRight: 46 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#AAB3C0',
                  display: 'flex', transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#0A0A0A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#AAB3C0')}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 24px', background: loading ? '#6C7A8D' : '#0A0A0A', color: '#fff',
              fontWeight: 700, borderRadius: 100, fontSize: 15, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
            }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#1A6BFF' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0A0A0A' }}
            >
              {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Lock size={15} />}
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#AAB3C0', marginTop: 20 }}>
          VyaparSathi © {new Date().getFullYear()} · All rights reserved
        </p>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
