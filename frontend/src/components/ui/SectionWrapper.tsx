import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ReactNode } from 'react'

// ─── Wix Design Tokens ──────────────────────────────────────────────────────
// Wix sections: generous vertical padding (py-24 lg:py-32)
// Scroll animation: clean fade-up, short distance (y: 20), smooth ease
// No dramatic entrances — Wix motion is refined and purposeful
// Alternating bg: white (#FFFFFF) and light grey (#F7F8FA)
// Section borders: optional top border border-[#E8E8ED]
// ────────────────────────────────────────────────────────────────────────────

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  /**
   * 'white'  → bg-white (default)
   * 'grey'   → bg-[#F7F8FA] with top+bottom border in #E8E8ED
   * 'dark'   → bg-[#111111] for CTA / footer-adjacent sections
   */
  variant?: 'white' | 'grey' | 'dark'
  /** Add a top border separator — useful when two white sections are adjacent */
  bordered?: boolean
}

const variantClasses: Record<string, string> = {
  white: 'bg-white',
  grey:  'bg-[#F7F8FA] border-y border-[#E8E8ED]',
  dark:  'bg-[#111111]',
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  variant = 'white',
  bordered = false,
}: SectionWrapperProps) {
  const { ref, inView } = useInView()

  const bgClass = variantClasses[variant]
  const borderClass = bordered && variant === 'white' ? 'border-t border-[#E8E8ED]' : ''

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],  // Wix's signature ease — smooth, not bouncy
      }}
      className={[
        // Wix uses very generous section padding
        'py-24 lg:py-32',
        bgClass,
        borderClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {children}
    </motion.section>
  )
}
