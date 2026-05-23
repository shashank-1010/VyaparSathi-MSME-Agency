import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react'

// ── Design tokens — matches Home.tsx exactly ──────────────────────────────────
const WIX_FONT = "'madefor-display', 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const WIX_BODY = "'madefor-text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

const services = [
  'WhatsApp Automation',
  'AI Customer Support',
  'Business Automation',
  'Website Development',
  'Inventory Management',
  'Digital Branding',
]

const companyLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About Us' },
  { href: '/contact',  label: 'Contact'  },
]

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Twitter,   href: '#', label: 'Twitter'   },
]

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      background:  '#fff',
      borderTop:   '1px solid #eaeaea',
      fontFamily:  WIX_BODY,
    }}>
      <div style={{
        maxWidth: 1258,
        margin:   '0 auto',
        padding:  'clamp(48px,6vw,96px) clamp(20px,5vw,56px) clamp(32px,4vw,56px)',
      }}>

        {/* ── Top grid ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap:                 'clamp(32px,4vw,64px)',
          marginBottom:        56,
        }} className="Vexa-footer-grid">

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* Logo */}
            <Link to="/" onClick={handleLinkClick} style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            10,
              textDecoration: 'none',
              marginBottom:   16,
            }}>
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
                fontFamily:    WIX_FONT,
                fontWeight:    700,
                fontSize:      18,
                color:         '#000',
                letterSpacing: '-0.01em',
                lineHeight:    1,
              }}>
                Vexa<span style={{ color: '#166aea' }}></span>
              </span>
            </Link>

            <p style={{
              fontSize:   14,
              color:      '#5e5e5e',
              lineHeight: 1.7,
              marginBottom: 20,
              maxWidth:   260,
            }}>
              Premium automation for Indian MSMEs. We help businesses grow smarter with intelligent automation solutions.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width:           36,
                    height:          36,
                    borderRadius:    8,
                    border:          '1px solid #eaeaea',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    color:           '#5e5e5e',
                    textDecoration:  'none',
                    transition:      'background 0.18s, color 0.18s, border-color 0.18s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background   = '#000'
                    e.currentTarget.style.color        = '#fff'
                    e.currentTarget.style.borderColor  = '#000'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background   = 'transparent'
                    e.currentTarget.style.color        = '#5e5e5e'
                    e.currentTarget.style.borderColor  = '#eaeaea'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 style={{
              fontFamily:    WIX_FONT,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color:         '#a7a8a8',
              marginBottom:  16,
            }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    onClick={handleLinkClick}
                    style={{
                      fontFamily:     WIX_BODY,
                      fontSize:       14,
                      color:          '#5e5e5e',
                      textDecoration: 'none',
                      transition:     'color 0.18s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5e5e5e')}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 style={{
              fontFamily:    WIX_FONT,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color:         '#a7a8a8',
              marginBottom:  16,
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    onClick={handleLinkClick}
                    style={{
                      fontFamily:     WIX_BODY,
                      fontSize:       14,
                      color:          '#5e5e5e',
                      textDecoration: 'none',
                      transition:     'color 0.18s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5e5e5e')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 style={{
              fontFamily:    WIX_FONT,
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color:         '#a7a8a8',
              marginBottom:  16,
            }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { Icon: Phone,  text: '+91 8115067311'         },
                { Icon: Mail,   text: 'hello@Vexa.com'  },
                { Icon: MapPin, text: 'Lucknow, Uttar Pradesh, India' },
              ].map(({ Icon, text }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Icon size={15} color="#166aea" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#5e5e5e', lineHeight: 1.5 }}>{text}</span>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918115067311?text=Hi! I want to know more about Vexa services"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                justifyContent:  'center',
                marginTop:       20,
                padding:         '0 20px',
                height:          38,
                background:      '#000',
                color:           '#fff',
                fontFamily:      WIX_BODY,
                fontSize:        13,
                fontWeight:      500,
                borderRadius:    100,
                textDecoration:  'none',
                whiteSpace:      'nowrap' as const,
                transition:      'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
            >
              Get Free Demo
            </a>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop:      '1px solid #eaeaea',
          paddingTop:     24,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            12,
        }}>
          <p style={{ fontSize: 13, color: '#a7a8a8' }}>
            © {new Date().getFullYear()} Vexa. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: '#a7a8a8' }}>
            Built with ❤️ for Indian businesses
          </p>
        </div>

      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 1023px) {
          .Vexa-footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .Vexa-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}