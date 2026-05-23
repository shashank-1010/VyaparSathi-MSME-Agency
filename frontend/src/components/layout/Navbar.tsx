import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

// ── Design tokens — matches Home.tsx exactly ──────────────────────────────────
const WIX_FONT = "'madefor-display', 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const WIX_BODY = "'madefor-text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          1000,
          height:          60,
          background:      '#fff',
          borderBottom:    scrolled ? '1px solid #eaeaea' : '1px solid transparent',
          boxShadow:       scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '0 clamp(20px,4vw,56px)',
          transition:      'border-color 0.3s, box-shadow 0.3s',
          fontFamily:      WIX_BODY,
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            10,
            textDecoration: 'none',
          }}
        >
          <div style={{
            width:           36,
            height:          36,
            background:      '#000',
            borderRadius:    10,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <span style={{
            fontFamily:  WIX_FONT,
            fontWeight:  700,
            fontSize:    18,
            color:       '#000',
            letterSpacing: '-0.01em',
            lineHeight:  1,
          }}>
            Vexa<span style={{ color: '#166aea' }}></span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <nav style={{
          display:    'flex',
          alignItems: 'center',
          gap:        4,
        }} className="Vexa-desktop-nav">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily:      WIX_BODY,
                  fontSize:        14,
                  fontWeight:      active ? 600 : 400,
                  color:           active ? '#000' : '#5e5e5e',
                  textDecoration:  'none',
                  padding:         '6px 16px',
                  borderRadius:    100,
                  background:      active ? '#f4f4f4' : 'transparent',
                  transition:      'background 0.18s, color 0.18s',
                  whiteSpace:      'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = '#f4f4f4'
                    e.currentTarget.style.color      = '#000'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color      = '#5e5e5e'
                  }
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="Vexa-desktop-cta">
          <a
            href="https://wa.me/918115067311?text=Hi! I want to know more about Vexa services"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              justifyContent:  'center',
              padding:         '0 22px',
              height:          38,
              background:      '#000',
              color:           '#fff',
              fontFamily:      WIX_BODY,
              fontSize:        14,
              fontWeight:      500,
              borderRadius:    100,
              textDecoration:  'none',
              whiteSpace:      'nowrap',
              transition:      'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
          >
            Get Free Demo
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            display:     'none',
            background:  'none',
            border:      'none',
            cursor:      'pointer',
            padding:     6,
            borderRadius: 8,
            color:       '#000',
          }}
          className="Vexa-hamburger"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:    'fixed',
              top:         60,
              left:        0,
              right:       0,
              zIndex:      999,
              background:  '#fff',
              borderBottom: '1px solid #eaeaea',
              padding:     '12px 20px 20px',
              fontFamily:  WIX_BODY,
            }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href)
                    setOpen(false)
                  }}
                  style={{
                    display:        'block',
                    padding:        '12px 16px',
                    borderRadius:   10,
                    fontFamily:     WIX_BODY,
                    fontSize:       15,
                    fontWeight:     active ? 600 : 400,
                    color:          active ? '#000' : '#5e5e5e',
                    background:     active ? '#f4f4f4' : 'transparent',
                    textDecoration: 'none',
                    marginBottom:   2,
                    transition:     'background 0.15s, color 0.15s',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}

            <div style={{ marginTop: 12 }}>
              <a
                href="https://wa.me/918115067311?text=Hi! I want to know more about Vexa services"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  height:          46,
                  background:      '#000',
                  color:           '#fff',
                  fontFamily:      WIX_BODY,
                  fontSize:        15,
                  fontWeight:      500,
                  borderRadius:    100,
                  textDecoration:  'none',
                }}
              >
                Get Free Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 767px) {
          .Vexa-desktop-nav  { display: none !important; }
          .Vexa-desktop-cta  { display: none !important; }
          .Vexa-hamburger    { display: flex !important; }
        }
      `}</style>
    </>
  )
}