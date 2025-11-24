import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Let&apos;s Fit Go</h3>
            <p className="text-gray-600 mb-4">
              Your fitness accountability partner. Challenge friends, track progress, and achieve your goals together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@letsfitgo.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  support@letsfitgo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Let&apos;s Fit Go. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {/* Social Media Links - Placeholder */}
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


