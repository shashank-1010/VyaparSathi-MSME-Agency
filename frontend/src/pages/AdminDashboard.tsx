// AdminDashboard.tsx
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LogOut, Trash2, Mail, Phone, Building, MessageSquare,
  Calendar, TrendingUp, Users, Clock, Loader, Search,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import type { Inquiry, DashboardStats } from '../types'

// ─── Design tokens from Home.tsx ─────────────────────────────────────────────
const WIX_FONT = "'madefor-display', 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const WIX_BODY = "'madefor-text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

// ─── Wix Logo SVG (same as Home.tsx) ─────────────────────────────────────────
function WixLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="24" fill="none">
      <g fill="#000" clipPath="url(#b)">
        <path d="M60 0h-3.314c-.92 0-1.779.456-2.296 1.216l-4.432 6.54a.298.298 0 0 1-.492 0l-4.432-6.54A2.768 2.768 0 0 0 42.74 0h-3.315l7.896 11.648-7.852 11.582h3.315c.919 0 1.778-.455 2.294-1.216l4.389-6.474a.298.298 0 0 1 .493 0l4.388 6.474a2.768 2.768 0 0 0 2.296 1.216h3.314L52.105 11.648zM32.607 2.376v20.854h1.584a2.376 2.376 0 0 0 2.376-2.376V0h-1.584a2.376 2.376 0 0 0-2.376 2.376M29.7 0h-1.41a3.32 3.32 0 0 0-3.24 2.586l-3.154 13.863-2.76-12.94C18.625 1.2 16.14-.352 13.58.337c-1.6.442-2.785 1.793-3.131 3.416L7.797 16.44 4.65 2.587A3.328 3.328 0 0 0 1.408 0H0l5.284 23.229h2.001a3.848 3.848 0 0 0 3.765-3.046l3.377-15.848a.432.432 0 0 1 .418-.339c.2 0 .377.142.418.338l3.38 15.85a3.848 3.848 0 0 0 3.765 3.045h2.009z" />
      </g>
      <defs><clipPath id="b"><path fill="#fff" d="M0 0h60v23.23H0z" /></clipPath></defs>
    </svg>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [stats, setStats] = useState<DashboardStats>({ total: 0, today: 0, thisWeek: 0, thisMonth: 0 })
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const fetchInquiries = useCallback(async () => {
    try {
      const { data } = await api.get('/inquiries')
      setInquiries(data.inquiries); setStats(data.stats)
    } catch { toast.error('Failed to load inquiries') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    setDeleting(id)
    try {
      await api.delete(`/inquiries/${id}`)
      setInquiries(p => p.filter(i => i._id !== id))
      setStats(p => ({ ...p, total: p.total - 1 }))
      toast.success('Inquiry deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  const handleLogout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login') }

  const filtered = inquiries.filter(i =>
    search === '' ||
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.phone.includes(search) ||
    i.email?.toLowerCase().includes(search.toLowerCase()) ||
    i.service.toLowerCase().includes(search.toLowerCase())
  )

  const statCards = [
    { label: 'Total Inquiries', value: stats.total, icon: Users },
    { label: 'Today', value: stats.today, icon: Clock },
    { label: 'This Week', value: stats.thisWeek, icon: TrendingUp },
    { label: 'This Month', value: stats.thisMonth, icon: Calendar },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4', fontFamily: WIX_BODY, display: 'flex', flexDirection: 'column' }}>

      {/* ── Header — same structure as Home.tsx header ── */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #eaeaea',
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        <div style={{
          maxWidth: 1258, margin: '0 auto', padding: '18px 5vw',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <WixLogo />
            <div style={{ width: 1, height: 20, background: '#eaeaea' }} />
            <span style={{ fontFamily: WIX_FONT, fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a7a8a8' }}>
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', fontSize: 14, color: '#1c1d21',
              border: '1.5px solid #eaeaea', borderRadius: 100,
              background: '#fff', cursor: 'pointer', fontFamily: WIX_BODY,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#000')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#eaeaea')}
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1258, margin: '0 auto', padding: 'clamp(40px,5vw,64px) 5vw', width: '100%' }}>

        {/* Page heading */}
        <div style={{ marginBottom: 'clamp(28px,3.5vw,48px)' }}>
          <p style={{
            fontFamily: WIX_FONT, fontSize: 14, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a7a8a8', marginBottom: 10,
          }}>Overview</p>
          <h1 style={{
            fontFamily: WIX_FONT,
            fontSize: 'clamp(28px,4vw,56px)',
            fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.01em', color: '#000',
          }}>
            Inquiries.
          </h1>
        </div>

        {/* ── Stat cards — 4 col, white on #f4f4f4, matching Home.tsx card style ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(10px,1.2vw,16px)', marginBottom: 'clamp(24px,3vw,36px)' }}
          className="stats-grid"
        >
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              {...fadeUp(i * 0.06)}
              style={{
                background: '#fff', border: '1px solid #eaeaea',
                borderRadius: 'clamp(12px,1.5vw,18px)',
                padding: 'clamp(20px,2.5vw,32px)',
                transition: 'box-shadow 0.2s',
              }}
              whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: '#f4f4f4',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                <card.icon size={16} style={{ color: '#1c1d21' }} />
              </div>
              <div style={{
                fontFamily: WIX_FONT,
                fontSize: 'clamp(28px,3.5vw,48px)',
                fontWeight: 700, letterSpacing: '-0.02em', color: '#000',
                lineHeight: 1, marginBottom: 6,
              }}>
                {loading ? <span style={{ color: '#eaeaea' }}>—</span> : card.value}
              </div>
              <div style={{ fontFamily: WIX_BODY, fontSize: 12, color: '#a7a8a8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {card.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Inquiries table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 'clamp(14px,1.8vw,24px)', overflow: 'hidden' }}
        >
          {/* Table header */}
          <div style={{
            padding: 'clamp(18px,2vw,28px) clamp(20px,2.5vw,32px)',
            borderBottom: '1px solid #eaeaea',
            display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center',
            justifyContent: 'space-between', gap: 14,
          }}>
            <div>
              <h2 style={{ fontFamily: WIX_FONT, fontWeight: 700, fontSize: 'clamp(16px,1.5vw,22px)', color: '#000', letterSpacing: '-0.01em' }}>
                Recent Inquiries
              </h2>
              <p style={{ fontFamily: WIX_BODY, fontSize: 13, color: '#a7a8a8', marginTop: 3 }}>
                {inquiries.length} total received
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#a7a8a8' }} />
              <input
                type="text" placeholder="Search..." value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: 34, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
                  fontSize: 13, background: '#f4f4f4', border: '1px solid #eaeaea',
                  borderRadius: 100, width: 220, outline: 'none',
                  fontFamily: WIX_BODY, color: '#1c1d21',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#000')}
                onBlur={e => (e.currentTarget.style.borderColor = '#eaeaea')}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 0', flexDirection: 'column', gap: 12 }}>
              <Loader size={22} style={{ color: '#000', animation: 'spin 1s linear infinite' }} />
              <p style={{ fontFamily: WIX_BODY, fontSize: 14, color: '#a7a8a8' }}>Loading inquiries...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '72px 0' }}>
              <div style={{
                width: 52, height: 52, background: '#f4f4f4', border: '1px solid #eaeaea',
                borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Mail size={22} style={{ color: '#a7a8a8' }} />
              </div>
              <p style={{ fontFamily: WIX_FONT, fontWeight: 700, fontSize: 16, color: '#000' }}>
                {search ? 'No results found' : 'No inquiries yet'}
              </p>
              <p style={{ fontFamily: WIX_BODY, color: '#a7a8a8', fontSize: 14, marginTop: 6 }}>
                {search ? 'Try a different search term' : 'Inquiries will appear here when received'}
              </p>
            </div>
          ) : (
            <div>
              {filtered.map((inquiry, idx) => (
                <motion.div
                  key={inquiry._id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.025 }}
                  style={{
                    padding: 'clamp(16px,2vw,24px) clamp(20px,2.5vw,32px)',
                    borderBottom: '1px solid #f4f4f4',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>

                      {/* Name row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '6px 10px', marginBottom: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 9, background: '#000', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: WIX_FONT, color: '#fff', fontSize: 12, fontWeight: 700,
                        }}>
                          {inquiry.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontFamily: WIX_FONT, fontWeight: 700, fontSize: 15, color: '#000' }}>{inquiry.name}</span>
                        {inquiry.businessName && (
                          <span style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            fontFamily: WIX_BODY, fontSize: 11, color: '#5e5e5e',
                            background: '#f4f4f4', border: '1px solid #eaeaea',
                            padding: '2px 10px', borderRadius: 100,
                          }}>
                            <Building size={10} /> {inquiry.businessName}
                          </span>
                        )}
                        <span style={{ fontFamily: WIX_BODY, fontSize: 11, color: '#a7a8a8', marginLeft: 'auto' }}>
                          {new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Contact row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, marginBottom: 10, paddingLeft: 42 }}>
                        <a href={`tel:${inquiry.phone}`}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: WIX_BODY, fontSize: 12, color: '#5e5e5e', textDecoration: 'none', transition: 'color 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#5e5e5e')}
                        >
                          <Phone size={11} /> {inquiry.phone}
                        </a>
                        {inquiry.email && (
                          <a href={`mailto:${inquiry.email}`}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: WIX_BODY, fontSize: 12, color: '#5e5e5e', textDecoration: 'none', transition: 'color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#5e5e5e')}
                          >
                            <Mail size={11} /> {inquiry.email}
                          </a>
                        )}
                      </div>

                      {/* Tags row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 8, paddingLeft: 42 }}>
                        <span style={{
                          fontFamily: WIX_FONT, fontSize: 11, fontWeight: 700,
                          letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                          padding: '3px 10px', background: '#000', color: '#fff', borderRadius: 100,
                        }}>
                          {inquiry.service}
                        </span>
                        {inquiry.message && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: WIX_BODY, fontSize: 12, color: '#a7a8a8' }}>
                            <MessageSquare size={11} />
                            {inquiry.message.slice(0, 80)}{inquiry.message.length > 80 ? '...' : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(inquiry._id)}
                      disabled={deleting === inquiry._id}
                      style={{
                        padding: '8px', color: '#eaeaea', border: '1.5px solid transparent',
                        borderRadius: 10, background: 'transparent', cursor: 'pointer',
                        display: 'flex', transition: 'all 0.15s', flexShrink: 0,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#e53e3e'; e.currentTarget.style.background = '#fff5f5'; e.currentTarget.style.borderColor = '#fed7d7' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#eaeaea'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
                    >
                      {deleting === inquiry._id
                        ? <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} />
                        : <Trash2 size={15} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
