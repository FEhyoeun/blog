import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            dev.hyoeun
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/posts"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/activities"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Activities
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
