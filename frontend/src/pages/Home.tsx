import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// ─── Exact Wix Color & Font System (from index.html) ─────────────────────────
// bg primary:    #ffffff   (white)
// bg secondary:  #f4f4f4   (light gray — color_12)
// accent blue:   #166aea   (Wix blue — color_18)
// text dark:     #000000   / #1c1d21
// text muted:    #a7a8a8
// border:        #eaeaea
// card blue:     #8fa3ff   (color_28)
// card green:    #d1e6d1   (color_23)
// card orange:   #faa85e   (color_33)
// ─────────────────────────────────────────────────────────────────────────────

const WIX_FONT = "'madefor-display', 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const WIX_BODY = "'madefor-text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

// ── Shared style objects ──────────────────────────────────────────────────────
const labelSt: React.CSSProperties = {
  fontFamily: WIX_FONT,
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#1c1d21',
  marginBottom: 8,
}

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

// Black pill button (primary CTAs — "Get Free Demo")
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

// Blue pill button ("Go to Help Center")
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

// ── Sparkle SVG (Wix AI sparkle icon) ────────────────────────────────────────
function Sparkle({ size = 20, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M19.974 0c.328 0 .611.232.675.554l.149.742a3.444 3.444 0 0 0 2.701 2.701l.743.149a.689.689 0 0 1 0 1.35l-.743.15a3.444 3.444 0 0 0-2.701 2.7l-.148.743a.689.689 0 0 1-1.351 0l-.149-.742a3.444 3.444 0 0 0-2.701-2.702l-.743-.148a.689.689 0 0 1 0-1.351l.743-.149a3.444 3.444 0 0 0 2.7-2.701L19.3.554A.689.689 0 0 1 19.974 0ZM8.455 4.576a.804.804 0 0 1 .79.649l.35 1.74a8.066 8.066 0 0 0 6.33 6.33l1.74.35a.804.804 0 0 1 0 1.578l-1.74.35a8.066 8.066 0 0 0-6.33 6.33l-.35 1.74a.804.804 0 0 1-1.578 0l-.35-1.74a8.066 8.066 0 0 0-6.33-6.33l-1.74-.35a.804.804 0 0 1 0-1.578l1.74-.35a8.066 8.066 0 0 0 6.33-6.33l.35-1.74a.804.804 0 0 1 .788-.649Z"
        fill={color}
      />
    </svg>
  )
}

// ── FAQ Accordion Item (Wix-style) ────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
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
            flexShrink: 0,
            width: 32, height: 32,
            borderRadius: '50%',
            border: '1.5px solid #000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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

// ── Video Section Tab (expandable accordion like Wix) ─────────────────────────
function VideoTab({
  num,
  title,
  desc,
  open,
  onClick,
}: {
  num: string
  title: string
  desc: string
  open: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{ borderBottom: '1px solid #d0d0d0', cursor: 'pointer' }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 0',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{
            fontFamily: WIX_FONT,
            fontSize: 'clamp(24px,2.08vw,40px)',
            fontWeight: 700,
            color: open ? '#000' : '#a7a8a8',
            minWidth: 36,
            transition: 'color 0.2s',
          }}>{num}.</span>
          <span style={{
            fontFamily: WIX_FONT,
            fontSize: 'clamp(16px,1.25vw,24px)',
            fontWeight: 700,
            color: open ? '#000' : '#a7a8a8',
            transition: 'color 0.2s',
          }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {!open && (
            <span style={{ fontFamily: WIX_BODY, fontSize: 13, fontWeight: 700, color: '#166aea', textDecoration: 'underline' }}>
              Show more
            </span>
          )}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: '1.5px solid #000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronDown size={14} color="#000" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ ...bodySmSt, paddingLeft: 56, paddingBottom: 24, maxWidth: 580 }}>{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── AI Tool Tab (left accordion) ──────────────────────────────────────────────
function AIToolTab({
  title,
  desc,
  cta,
  active,
  onClick,
}: {
  title: string
  desc: string
  cta: string
  active: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        borderLeft: `3px solid ${active ? '#166aea' : '#d0d0d0'}`,
        padding: '20px 24px',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        marginBottom: 4,
      }}
    >
      <h3 style={{
        fontFamily: WIX_FONT,
        fontSize: 'clamp(18px,1.46vw,28px)',
        fontWeight: 700,
        color: active ? '#000' : '#a7a8a8',
        marginBottom: active ? 12 : 0,
        transition: 'color 0.2s',
        margin: 0,
      }}>{title}</h3>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ ...bodySmSt, marginTop: 12, marginBottom: 14 }}>{desc}</p>
            <span style={{
              fontFamily: WIX_BODY,
              fontSize: 14,
              fontWeight: 700,
              color: '#166aea',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}>
              {cta} →
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeVideoTab, setActiveVideoTab] = useState(0)
  const [activeAITool, setActiveAITool] = useState(0)

  // ── Data ────────────────────────────────────────────────────────────────────

  const videoTabs = [
  {
    num: '1',
    title: 'Define your brand identity',
    desc: "Choose the visual style, colors, and typography that represent your business professionally.",
  },
  {
    num: '2',
    title: 'Explore premium layouts',
    desc: "Browse modern website structures designed to deliver a seamless and engaging user experience.",
  },
  {
    num: '3',
    title: 'Refine your business content',
    desc: 'Update and personalize your website content to perfectly align with your brand and services.',
  },
]

const aiTools = [
  {
    title: 'Professional content creation',
    desc: 'Our team crafts clear, engaging, and brand-focused content tailored specifically for your business.',
    cta: 'Get Free Demo',
  },
  {
    title: 'Custom website sections',
    desc: "From service showcases to contact forms and portfolios, we design every section to fit your business needs.",
    cta: 'Get Free Demo',
  },
  {
    title: 'Premium branding & visuals',
    desc: 'Enhance your online presence with modern visuals, refined branding, and a polished professional look.',
    cta: 'Get Free Demo',
  },
]

const steps = [
  {
    num: '1',
    title: 'Share your requirements',
    desc: "Tell us about your business, goals, and the type of website you want through our quick consultation process.",
  },
  {
    num: '2',
    title: 'We craft your website strategy',
    desc: 'Our team plans your website structure, branding, and overall user experience tailored to your business.',
  },
  {
    num: '3',
    title: 'Review and refine',
    desc: 'We work closely with you to adjust layouts, content, and design details until everything feels perfect.',
  },
  {
    num: '4',
    title: 'Launch with confidence',
    desc: 'Once finalized, we deliver a premium, business-ready website built to strengthen your online presence.',
  },
]

  const [activeStep, setActiveStep] = useState(0)

  const powerCards = [
  {
    color: '#faa85e',
    title: 'Performance & reliability',
    desc: (
      <>
        Your website is optimized for fast performance, smooth user experience,
        and reliable long-term stability across all devices.
      </>
    ),
  },
  {
    color: '#d1e6d1',
    title: 'Domain & hosting support',
    desc: (
      <>
        Get scalable hosting solutions and a professional custom domain
        tailored to strengthen your online presence.
      </>
    ),
  },
  {
    color: '#8fa3ff',
    title: 'Business growth solutions',
    desc: (
      <>
        Expand your business with integrated marketing, SEO, analytics,
        and customer management solutions designed for growth.
      </>
    ),
  },
]

const faqs = [
  {
    q: 'How does Vexa create websites?',
    a: (
      <p>
        Vexa works closely with businesses to understand their goals,
        branding, and requirements before crafting a premium website
        tailored to their vision and business needs.
      </p>
    ),
  },
  {
    q: 'How do I choose the right website solution?',
    a: (
      <p>
        Choosing the right website depends on your business goals,
        scalability needs, branding, and customer experience. Vexa
        focuses on delivering modern, professional, and growth-oriented
        digital solutions for every business type.
      </p>
    ),
  },
  {
    q: 'Why choose Vexa for your website?',
    a: (
      <p>
        Vexa combines premium design, modern technology, and business-focused
        strategy to create websites that not only look exceptional but also
        help businesses grow online with confidence.
      </p>
    ),
  },
  {
    q: 'Can I customize my website design?',
    a: (
      <p>
        Yes, every website is fully customizable. From layouts and branding
        to content and functionality, we refine every detail to ensure your
        website perfectly reflects your business identity.
      </p>
    ),
  },
  {
    q: 'How long does it take to build a website?',
    a: (
      <p>
        Timelines depend on the scope and requirements of the project, but
        our streamlined process ensures your website is delivered efficiently
        without compromising on quality or performance.
      </p>
    ),
  },
  {
    q: 'Will my website be mobile-friendly?',
    a: (
      <p>
        Absolutely. Every website we create is fully responsive and optimized
        to deliver a seamless experience across desktop, tablet, and mobile devices.
      </p>
    ),
  },
  {
    q: 'Will my website support SEO and growth?',
    a: (
      <p>
        Yes, all websites are built with modern SEO practices, performance
        optimization, and scalable business solutions to help strengthen your
        online visibility and long-term growth.
      </p>
    ),
  },
]

  const HERO_VIDEO_THUMB = 'https://cdn.corenexis.com/files/c/2692493720.png'
  const SECTION_IMG = 'https://static.wixstatic.com/media/0784b1_58ac1f3f9ce24665aff993f7c6902aa5~mv2.jpg'

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          NAVBAR — Vexa Navbar
      ══════════════════════════════════════════════════════════ */}
      <Navbar />

      <main style={{ fontFamily: WIX_FONT, background: '#fff', overflowX: 'hidden', paddingTop: 60 }}>

        {/* ══════════════════════════════════════════════════════════
            HERO — "AI WEBSITE BUILDER / Experience site creation like never before"
            White bg · centered label + huge h2 + subtitle + black CTA + note
        ══════════════════════════════════════════════════════════ */}
        <section style={{
          background: '#fff',
          paddingTop: 'clamp(48px,8vw,120px)',
          paddingBottom: 'clamp(60px,9vw,140px)',
          paddingLeft: 24, paddingRight: 24,
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42 }}
              style={labelSt}
            >
              Your Digital Growth Partner
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ ...h1St, marginBottom: 20 }}
            >
              Experience site creation like never before
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              style={{ ...bodySt, fontSize: 'clamp(16px,1.25vw,24px)', marginBottom: 40 }}
            >
              Transform your vision into a premium digital presence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
            >
              <a
                href="https://www.wix.com/intro/sg"
                style={btnBlack}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
              >
                Get Free Demo
              </a>
              <p style={{ fontFamily: WIX_BODY, fontSize: 14, color: '#a7a8a8' }}>
                ✨Start for free. No credit card required.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HERO VIDEO — Full-width video player (Wix demo video)
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#1c1d21', position: 'relative' }}>
          <div style={{
            maxWidth: '80vw', margin: '0 auto',
            position: 'relative', cursor: 'pointer',
          }}>
            <img
              src={HERO_VIDEO_THUMB}
              alt="Wix AI website builder demo"
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M6 4l12 6-12 6V4z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PANEL 1 — "Your ideas go in. Your site comes out."
            Gradient bg with colored bars · h2 left + video right + CTA
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: 'clamp(54px,7vw,100px) 5vw', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div className="wix-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'flex-start' }}>

              <motion.div {...fadeUp(0)}>
                <h2 style={{ ...h2St, fontSize: 'clamp(28px,5vw,96px)', marginBottom: 20 }}>
                  Your ideas go in. Your site comes out.
                </h2>
                <p style={{ ...bodySt, marginBottom: 36 }}>
                  Turn your vision into a premium, AI-crafted website designed to elevate your business.
                </p>
                <a
                  href="https://www.wix.com/intro/sg"
                  style={btnBlack}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                >
                  Get Free Demo
                </a>
              </motion.div>

                            <motion.div {...fadeUp(0.1)} style={{ position: 'relative' }}>
                <div style={{
                  background: '#f4f4f4', borderRadius: 16, overflow: 'hidden',
                  aspectRatio: '1.6/1',    // Thoda bada (was 1.8/1)
                  position: 'relative',
                  maxWidth: '520px',
                  minHeight: '300px',
                }}>
                  <img
                    src="https://static.wixstatic.com/media/dea07e_ed8e9ef4c50b431a9eaa21e1248de325f000.png"
                    alt="Wix AI website builder tweaks site style"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PANEL 2 — "Built for high standards." + Video tabs
            Gradient/color bg · 3 tabs on left + video on right
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: 'clamp(54px,7vw,100px) 5vw', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div className="wix-grid-2col" style={{ display: 'grid', gridTemplateColumns: '47vw 1fr', gap: 0, alignItems: 'flex-start' }}>

              {/* Right: big video (sticky on desktop) */}
              <motion.div {...fadeUp(0.1)} style={{ order: 1 }}>
                <div style={{
                  borderRadius: 16, overflow: 'hidden',
                  background: '#1c1d21',
                  aspectRatio: '1.7/1',
                  minHeight: '280px',
                  maxWidth: '480px',
                  marginLeft: 'auto',
                  marginRight: '0',
                  transform: 'translateX(30px)',  // Push right
                }}>
                  <img
                    src={[
                      'https://static.wixstatic.com/media/dea07e_95de6932bfa64d32bfb360191b33b035f000.png',
                      'https://static.wixstatic.com/media/dea07e_3b384fad4ce9441687c13cc29cd1fc75f000.png',
                      'https://static.wixstatic.com/media/dea07e_935a4d9263b643ac99b2c2eaa95dd97bf000.png',
                    ][activeVideoTab]}
                    alt={videoTabs[activeVideoTab].title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    key={activeVideoTab}
                  />
                </div>
              </motion.div>

              {/* Left: text + tabs */}
              <motion.div {...fadeUp(0)} style={{ paddingLeft: 'clamp(0px,3vw,60px)', order: 0 }}>
                <h2 style={{ ...h2St, fontSize: 'clamp(28px,5vw,96px)', marginBottom: 16 }}>
                  Built for high standards.
                </h2>
                <p style={{ ...bodySt, marginBottom: 36 }}>
                  Refine every detail — from design and layouts to content and branding — until your website perfectly reflects your vision.
                </p>
                <a
                  href="https://www.wix.com/intro/sg"
                  style={{ ...btnBlack, marginBottom: 40 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                >
                  Get Free Demo
                </a>

                <div style={{ borderTop: '1px solid #c8c8c8', marginTop: 0 }}>
                  {videoTabs.map((tab, i) => (
                    <VideoTab
                      key={tab.title}
                      num={tab.num}
                      title={tab.title}
                      desc={tab.desc}
                      open={activeVideoTab === i}
                      onClick={() => setActiveVideoTab(i)}
                    />
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PANEL 3 — "More than just a good-looking site."
            White bg · text left + video right
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: 'clamp(54px,7vw,140px) 5vw', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div className="wix-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}>

              <motion.div {...fadeUp(0)}>
                <h2 style={{ ...h2St, fontSize: 'clamp(28px,5vw,96px)', marginBottom: 20 }}>
                  More than just a good-looking site.
                </h2>
                <p style={{ ...bodySt, marginBottom: 32 }}>
                  With integrated business solutions like booking systems, online stores,
                  portfolio showcases, contact management, and more — your website is built
                  to support real business growth from day one.
                </p>
                <a
                  href="https://www.wix.com/intro/sg"
                  style={btnBlack}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                >
                  Get Free Demo
                </a>
              </motion.div>

              <motion.div {...fadeUp(0.1)}>
                <div style={{
                  borderRadius: 16, overflow: 'hidden',
                  background: '#f4f4f4',
                  aspectRatio: '2.06/1',
                  transform: 'scale(1.15)',
                  transformOrigin: 'center center',
                }}>
                  <img
                    src="https://static.wixstatic.com/media/dea07e_cf35b61a85754bae9063ea144c5a4953f000.png"
                    alt="Wix AI adds business functions"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            AI TOOLS — "Keep customizing your website with intuitive AI tools."
            Gray bg · 3-tab accordion left + video right
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#f4f4f4', padding: 'clamp(54px,7vw,100px) 5vw' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>

            <div className="wix-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'flex-start' }}>

              <motion.div {...fadeUp(0)}>
                <h2 style={{ ...h2St, fontSize: 'clamp(24px,3.33vw,64px)', marginBottom: 20 }}>
                  Refine your website effortlessly to match your business vision.
                </h2>
                <p style={{ ...bodySmSt, marginBottom: 40 }}>
                  After your website is created, our team helps refine every detail to ensure the design, content, and overall experience perfectly represent your brand.
                </p>

                {aiTools.map((tool, i) => (
                  <AIToolTab
                    key={tool.title}
                    title={tool.title}
                    desc={tool.desc}
                    cta={tool.cta}
                    active={activeAITool === i}
                    onClick={() => setActiveAITool(i)}
                  />
                ))}
              </motion.div>

              <motion.div
                key={activeAITool}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'sticky', top: '18vw' }}
              >
                <div style={{
                  background: ['#d8e2ec', '#8fa3ff', '#d1e6d1'][activeAITool],
                  borderRadius: 16,
                  overflow: 'hidden',
                  padding: 28,
                  aspectRatio: '1.5/1',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                }}>
                  <h3 style={{ ...h3St, fontSize: 'clamp(18px,2.08vw,40px)', marginBottom: 12, color: '#000' }}>
                    {aiTools[activeAITool].title}
                  </h3>
                  <p style={{ ...bodySmSt, fontSize: 'clamp(14px,1.04vw,20px)', color: '#1c1d21' }}>
                    {aiTools[activeAITool].desc}
                  </p>
                  <div style={{ marginTop: 16 }}>
                    <a
                      href="https://www.wix.com/intro/sg"
                      style={{ ...btnBlack, fontSize: 'clamp(12px,0.94vw,18px)', height: 42 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                    >
                      Get Free Demo
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HOW TO — "How to create a website with AI for free."
            Gray bg · h2 + desc + CTA + image left · 4 expandable steps right
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#f4f4f4', padding: 'clamp(54px,7vw,100px) 5vw', borderTop: '1px solid #c8c8c8' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div className="wix-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'flex-start' }}>

              {/* Left: heading + image */}
              <motion.div {...fadeUp(0)}>
                <h2 style={{ ...h2St, fontSize: 'clamp(24px,3.33vw,64px)', marginBottom: 20 }}>
                  How to create a professional website for your business.
                </h2>
                <p style={{ ...bodySmSt, marginBottom: 32 }}>
                  Build and launch your professional website in 4 simple steps.
                </p>
                <a
                  href="https://www.wix.com/intro/sg"
                  style={btnBlack}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                >
                  Get Free Demo
                </a>

                {/* Image card */}
                <div style={{ marginTop: 32, borderRadius: 16, overflow: 'hidden', background: '#8fa3ff' }}>
                  <img
                    src={SECTION_IMG}
                    alt="Wix AI website builder creates a Matcha eComm store"
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              </motion.div>

              {/* Right: 4 expandable steps */}
              <motion.div {...fadeUp(0.1)}>
                <div style={{ borderTop: '1px solid #c8c8c8' }}>
                  {steps.map((step, i) => (
                    <VideoTab
                      key={step.num}
                      num={step.num}
                      title={step.title}
                      desc={step.desc}
                      open={activeStep === i}
                      onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                    />
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            POWER CARDS — "Your sites come packed with power."
            White bg · h2 left + CTA right + 3 colored feature cards
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: 'clamp(54px,7vw,100px) 5vw', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>

            <motion.div {...fadeUp(0)} style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48,
            }}>
              <h2 style={{ ...h2St, fontSize: 'clamp(24px,5vw,96px)', maxWidth: 560, margin: 0 }}>
                Your sites come packed with power.
              </h2>
              <a
                href="https://www.wix.com/intro/sg"
                style={btnBlack}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
              >
                Get Free Demo
              </a>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="wix-grid-3col">
              {powerCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  {...fadeUp(i * 0.08)}
                  style={{
                    background: card.color,
                    borderRadius: 16,
                    padding: 'clamp(28px,2.1vw,40px) clamp(20px,1.6vw,30px) clamp(24px,1.9vw,36px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    minHeight: 'clamp(160px,16vw,300px)',
                  }}
                >
                  <h3 style={{
                    fontFamily: WIX_FONT,
                    fontSize: 'clamp(18px,2.6vw,50px)',
                    fontWeight: 700, color: '#000',
                    lineHeight: 1.2, marginBottom: 16,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ ...bodySmSt, fontSize: 'clamp(13px,1.04vw,20px)' }}>{card.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SUPPORT — "We're here for you 24/7."
            Black bg · h2 white + blue "Go to Help Center" + 2 help cards
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#1c1d21', padding: 'clamp(54px,7vw,100px) 5vw' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>

            <motion.div {...fadeUp(0)} style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexWrap: 'wrap',
              gap: 24, marginBottom: 48,
            }}>
              <h2 style={{ ...h2St, fontSize: 'clamp(24px,5vw,96px)', color: '#fff', margin: 0 }}>
                We're here for you 24/7.
              </h2>
              <a
                href="https://support.wix.com/en"
                style={btnBlueSt}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#2d83ff')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#166aea')}
              >
                Go to Help Center
              </a>
            </motion.div>

            <div className="wix-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                {
                  bg: '#d8e2ec',
                  title: 'Find answers',
                  desc: 'Visit our Help Center for detailed articles and tutorials.',
                  href: 'https://support.wix.com/en',
                },
                {
                  bg: '#8fa3ff',
                  title: 'Contact us',
                  desc: 'Chat with us for real-time support or schedule a call with our experts.',
                  href: 'https://www.wix.com/contact',
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  {...fadeUp(i * 0.08)}
                  style={{
                    background: card.bg,
                    borderRadius: 16,
                    padding: 'clamp(32px,2.1vw,40px) clamp(24px,1.8vw,36px) clamp(36px,2.5vw,48px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    minHeight: 'clamp(140px,14.5vw,280px)',
                  }}
                >
                  <div>
                    <h3 style={{
                      fontFamily: WIX_FONT,
                      fontSize: 'clamp(20px,2.9vw,56px)',
                      fontWeight: 700, color: '#000', lineHeight: 1.2,
                      marginBottom: 16,
                    }}>
                      {card.title}
                    </h3>
                    <p style={{ ...bodySmSt, fontSize: 'clamp(13px,1.04vw,20px)' }}>{card.desc}</p>
                  </div>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...btnBlack, marginTop: 16, alignSelf: 'flex-start', fontSize: 'clamp(12px,0.94vw,18px)', height: 42 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                  >
                    {card.title === 'Find answers' ? 'Go to Help Center' : 'Contact us'}
                  </a>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FAQ — "AI Website Builder FAQ"
            White bg · h2 + accordion items
        ══════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: 'clamp(54px,7vw,100px) 5vw', borderTop: '1px solid #eaeaea' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>

            <motion.h2 {...fadeUp(0)} style={{ ...h2St, fontSize: 'clamp(24px,5vw,96px)', marginBottom: 48 }}>
              AI Website Builder FAQ
            </motion.h2>

            <motion.div {...fadeUp(0.06)} style={{ borderTop: '1px solid #eaeaea' }}>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FOOTER CTA — "Now that's how you create a site."
            Gradient bg · huge centered h2 + small note below + CTA button
        ══════════════════════════════════════════════════════════ */}
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
                That’s how modern websites are built.
              </h2>

              <motion.div {...fadeUp(0.08)}>
                <a
                  href="https://www.wix.com/intro/sg"
                  style={{ ...btnBlack, fontSize: 'clamp(14px,0.94vw,18px)', height: 54 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
                >
                  Get Free Demo
                </a>
              </motion.div>

              <motion.p {...fadeUp(0.14)} style={{ fontFamily: WIX_BODY, fontSize: 'clamp(12px,0.73vw,14px)', color: '#a7a8a8', marginTop: 20 }}>
                ✨Start for free. No credit card required.
              </motion.p>
            </motion.div>

          </div>
        </section>

        {/* Global responsive styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
          * { box-sizing: border-box; }

          @media (max-width: 767px) {
            .wix-grid-2col {
              grid-template-columns: 1fr !important;
            }
            .wix-grid-3col {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 1199px) {
            .wix-grid-2col > div:nth-child(2) {
              order: -1;
            }
          }
        `}</style>

      </main>

      {/* ══════════════════════════════════════════════════════════
          FOOTER — Vexa Footer
      ══════════════════════════════════════════════════════════ */}
   
    </>
  )
}