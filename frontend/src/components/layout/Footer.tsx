import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react'

const services = ['WhatsApp Automation', 'AI Customer Support', 'Business Automation', 'Website Development', 'Inventory Management', 'Digital Branding']
const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto section-padding pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Vyapar<span className="text-brand-400">Sathi</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Premium automation for Indian MSMEs. We help businesses grow smarter with intelligent automation solutions.
            </p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link 
                    to="/services" 
                    onClick={handleLinkClick}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link 
                    to={l.href} 
                    onClick={handleLinkClick}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>+91 8115067311</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>hello@VyaparSathi.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()}  VyaparSathi. All rights reserved.</p>
          <p className="text-xs text-slate-500">Built with ❤️ for Indian businesses</p>
        </div>
      </div>
    </footer>
  )
}