// components/Footer.tsx
import Link from 'next/link'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`bg-green-800 text-white py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">MyGolfType</h3>
            <p className="text-green-100 text-sm leading-relaxed mb-4">
              Discover your unique golf personality and unlock personalized insights 
              to improve your game and find compatible playing partners.
            </p>
            <p className="text-green-200 text-xs">
              Available to US golfers only
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition-colors">
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-100 hover:text-white transition-colors">
                  About Golf Types
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@mygolftype.com" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Bar */}
        <div className="border-t border-green-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-green-200">
                &copy; {currentYear} MyGolfType.com. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links - Prominent for compliance */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
              <Link 
                href="/privacy" 
                className="text-green-100 hover:text-white transition-colors underline"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-green-100 hover:text-white transition-colors underline"
              >
                Terms of Service
              </Link>
              <a 
                href="mailto:privacy@mygolftype.com" 
                className="text-green-100 hover:text-white transition-colors"
              >
                Privacy Requests
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}