import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'

// ─── Design tokens from Home.tsx ─────────────────────────────────────────────
const WIX_FONT = "'madefor-display', 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const WIX_BODY = "'madefor-text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

// ─── Wix Logo SVG (same as Home.tsx) ─────────────────────────────────────────
function WixLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="30" fill="none">
      <g fill="#000" clipPath="url(#a)">
        <path d="M75 0h-4.142c-1.15 0-2.224.57-2.87 1.52l-5.54 8.174a.372.372 0 0 1-.615 0l-5.54-8.173A3.46 3.46 0 0 0 53.424 0h-4.143l9.87 14.56-9.815 14.477h4.143c1.149 0 2.223-.569 2.868-1.52l5.486-8.093a.372.372 0 0 1 .616 0l5.485 8.093a3.46 3.46 0 0 0 2.87 1.52h4.142L65.131 14.56zM40.758 2.97v26.067h1.98a2.97 2.97 0 0 0 2.97-2.97V0h-1.98a2.97 2.97 0 0 0-2.97 2.97M37.126 0h-1.762a4.15 4.15 0 0 0-4.051 3.233l-3.942 17.328-3.45-16.175c-.638-2.99-3.706-5.006-6.845-4.139-1.999.552-3.481 2.241-3.914 4.27L9.747 20.54 5.813 3.234A4.16 4.16 0 0 0 1.76 0H0l6.604 29.036h2.502a4.81 4.81 0 0 0 4.706-3.808l4.221-19.81a.54.54 0 0 1 .523-.424c.25 0 .471.178.523.423l4.226 19.812a4.81 4.81 0 0 0 4.706 3.807h2.51z" />
      </g>
      <defs><clipPath id="a"><path fill="#fff" d="M0 0h75v29.037H0z" /></clipPath></defs>
    </svg>
  )
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
    width: '100%', padding: '14px 16px',
    background: '#f4f4f4', border: '1px solid',
    borderRadius: 10, fontSize: 15, color: '#1c1d21',
    outline: 'none', fontFamily: WIX_BODY, boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }
  const focusStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? '#000' : '#eaeaea',
    boxShadow: focused === name ? '0 0 0 2px rgba(0,0,0,0.08)' : 'none',
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f4f4',
      display: 'flex', flexDirection: 'column',
      fontFamily: WIX_BODY,
    }}>

      {/* ── Top bar matching Home.tsx header feel ── */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #eaeaea',
        padding: '20px 5vw',
        display: 'flex', alignItems: 'center',
      }}>
        <WixLogo />
      </header>

      {/* ── Center card ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) 5vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 460 }}
        >
          {/* Heading block — mirrors Home.tsx section headings */}
          <div style={{ marginBottom: 36 }}>
            <p style={{
              fontFamily: WIX_FONT, fontSize: 14, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a7a8a8',
              marginBottom: 12,
            }}>Restricted access</p>
            <h1 style={{
              fontFamily: WIX_FONT,
              fontSize: 'clamp(36px,5vw,64px)',
              fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.01em', color: '#000',
              marginBottom: 10,
            }}>
              Admin<br />Portal.
            </h1>
            <p style={{ fontFamily: WIX_BODY, fontSize: 15, color: '#5e5e5e' }}>
              Authorized personnel only.
            </p>
          </div>

          {/* Card — white, thin border, matches Home.tsx card style */}
          <div style={{
            background: '#fff', border: '1px solid #eaeaea',
            borderRadius: 'clamp(16px,2vw,24px)',
            padding: 'clamp(28px,3.5vw,44px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              <div>
                <label style={{
                  display: 'block', fontFamily: WIX_FONT,
                  fontSize: 11, fontWeight: 700, color: '#1c1d21',
                  marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Email Address</label>
                <input
                  type="email" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  placeholder="admin@nexbotai.com" required
                  style={focusStyle('email')}
                />
              </div>

              <div>
                <label style={{
                  display: 'block', fontFamily: WIX_FONT,
                  fontSize: 11, fontWeight: 700, color: '#1c1d21',
                  marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    onFocus={() => setFocused('pass')} onBlur={() => setFocused(null)}
                    placeholder="Enter your password" required
                    style={{ ...focusStyle('pass'), paddingRight: 48 }}
                  />
                  <button
                    type="button" onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#a7a8a8',
                      display: 'flex', transition: 'color 0.15s', padding: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#a7a8a8')}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '0 24px', height: 54,
                  background: loading ? '#a7a8a8' : '#000', color: '#fff',
                  fontFamily: WIX_BODY, fontWeight: 400,
                  fontSize: 16, borderRadius: 100, border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#333' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#000' }}
              >
                {loading
                  ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Verifying...</>
                  : <><Lock size={15} /> Sign In</>}
              </button>

            </form>
          </div>

          <p style={{ fontFamily: WIX_BODY, textAlign: 'center', fontSize: 13, color: '#a7a8a8', marginTop: 20 }}>
            Vexa © {new Date().getFullYear()} · All rights reserved
          </p>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
