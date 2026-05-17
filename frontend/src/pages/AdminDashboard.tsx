// AdminDashboard.tsx
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, LogOut, Trash2, Mail, Phone, Building, MessageSquare,
  Calendar, TrendingUp, Users, Clock, Loader, Search, Bell
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import type { Inquiry, DashboardStats } from '../types'

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
      setInquiries((p) => p.filter((i) => i._id !== id))
      setStats((p) => ({ ...p, total: p.total - 1 }))
      toast.success('Inquiry deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  const handleLogout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login') }

  const filtered = inquiries.filter((i) =>
    search === '' ||
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.phone.includes(search) ||
    i.email?.toLowerCase().includes(search.toLowerCase()) ||
    i.service.toLowerCase().includes(search.toLowerCase())
  )

  const statCards = [
    { label: 'Total Inquiries', value: stats.total, icon: Users, color: '#1A6BFF' },
    { label: 'Today', value: stats.today, icon: Clock, color: '#00C566' },
    { label: 'This Week', value: stats.thisWeek, icon: TrendingUp, color: '#F5820D' },
    { label: 'This Month', value: stats.thisMonth, icon: Calendar, color: '#7B5CF6' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA', fontFamily: "'DM Sans','Helvetica Neue',sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #E4E8EF',
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#0A0A0A', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#0A0A0A', letterSpacing: '-0.01em' }}>Admin Dashboard</div>
              <div style={{ fontSize: 11, color: '#AAB3C0', fontWeight: 500 }}>VyaparSathi</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              position: 'relative', padding: '8px 10px', border: '1px solid #E4E8EF',
              background: '#fff', borderRadius: 10, cursor: 'pointer', color: '#6C7A8D',
              display: 'flex', alignItems: 'center',
            }}>
              <Bell size={17} />
              {stats.today > 0 && (
                <span style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, background: '#1A6BFF', borderRadius: '50%' }} />
              )}
            </button>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              fontSize: 13, color: '#6C7A8D', border: '1px solid #E4E8EF',
              borderRadius: 100, background: '#fff', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#0A0A0A')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#E4E8EF')}
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px', width: '100%' }}>

        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 4 }}>Overview</h2>
          <p style={{ fontSize: 14, color: '#6C7A8D' }}>Track and manage all incoming business inquiries.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 24 }}>
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: '#fff', border: '1px solid #E4E8EF', borderRadius: 18, padding: 22,
                transition: 'box-shadow 0.2s', cursor: 'default',
              }}
              whileHover={{ boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: card.color + '14',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1, marginBottom: 4 }}>
                {loading ? <span style={{ color: '#E4E8EF' }}>—</span> : card.value}
              </div>
              <div style={{ fontSize: 11, color: '#6C7A8D', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Inquiries Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: '#fff', border: '1px solid #E4E8EF', borderRadius: 22, overflow: 'hidden' }}
        >
          {/* Table Header */}
          <div style={{
            padding: '18px 24px', borderBottom: '1px solid #E4E8EF',
            display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0A0A0A', letterSpacing: '-0.01em' }}>Recent Inquiries</h3>
              <p style={{ fontSize: 12, color: '#AAB3C0', marginTop: 2 }}>{inquiries.length} total inquiries received</p>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#AAB3C0' }} />
              <input
                type="text" placeholder="Search inquiries..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: 34, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
                  fontSize: 13, background: '#F5F7FA', border: '1px solid #E4E8EF',
                  borderRadius: 100, width: 220, outline: 'none',
                  fontFamily: 'inherit', color: '#0A0A0A',
                }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <Loader size={22} style={{ color: '#1A6BFF', animation: 'spin 1s linear infinite' }} />
                <p style={{ fontSize: 13, color: '#6C7A8D' }}>Loading inquiries...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '72px 0' }}>
              <div style={{ width: 52, height: 52, background: '#F5F7FA', border: '1px solid #E4E8EF', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Mail size={22} style={{ color: '#C5CDD8' }} />
              </div>
              <p style={{ color: '#0A0A0A', fontWeight: 700, fontSize: 15 }}>{search ? 'No results found' : 'No inquiries yet'}</p>
              <p style={{ color: '#AAB3C0', fontSize: 13, marginTop: 4 }}>{search ? 'Try a different search term' : 'Inquiries will appear here when received'}</p>
            </div>
          ) : (
            <div>
              {filtered.map((inquiry, idx) => (
                <motion.div
                  key={inquiry._id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  style={{ padding: '18px 24px', borderBottom: '1px solid #F5F7FA', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFBFD')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '8px 10px', marginBottom: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                          {inquiry.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 15, color: '#0A0A0A' }}>{inquiry.name}</span>
                        {inquiry.businessName && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6C7A8D', background: '#F5F7FA', border: '1px solid #E4E8EF', padding: '3px 10px', borderRadius: 100, fontWeight: 500 }}>
                            <Building size={11} /> {inquiry.businessName}
                          </span>
                        )}
                        <span style={{ fontSize: 11, color: '#AAB3C0', fontWeight: 500, marginLeft: 'auto' }}>
                          {new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, marginBottom: 10, paddingLeft: 42 }}>
                        <a href={`tel:${inquiry.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6C7A8D', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#1A6BFF')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#6C7A8D')}
                        >
                          <Phone size={12} /> {inquiry.phone}
                        </a>
                        {inquiry.email && (
                          <a href={`mailto:${inquiry.email}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6C7A8D', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#1A6BFF')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#6C7A8D')}
                          >
                            <Mail size={12} /> {inquiry.email}
                          </a>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 8, paddingLeft: 42 }}>
                        <span style={{ padding: '3px 10px', background: '#EEF3FF', color: '#1A6BFF', fontSize: 11, fontWeight: 700, borderRadius: 100, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>
                          {inquiry.service}
                        </span>
                        {inquiry.message && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#AAB3C0' }}>
                            <MessageSquare size={11} />
                            {inquiry.message.slice(0, 80)}{inquiry.message.length > 80 ? '...' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(inquiry._id)}
                      disabled={deleting === inquiry._id}
                      style={{
                        padding: '8px 10px', color: '#D4D8DF', border: '1px solid transparent',
                        borderRadius: 10, background: 'transparent', cursor: 'pointer',
                        display: 'flex', transition: 'all 0.15s', flexShrink: 0,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#E53E3E'; e.currentTarget.style.background = '#FFF5F5'; e.currentTarget.style.borderColor = '#FED7D7' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#D4D8DF'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
                    >
                      {deleting === inquiry._id ? <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={15} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
