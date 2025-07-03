import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Hyoeun's Blog. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/FEhyoeun"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/fehyoeun/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:khyoeun92@gmail.com"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
