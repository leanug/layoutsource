import Link from 'next/link'

import { Logo } from '../../../src/components'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-500 py-3">
      <div className="section-full flex flex-col md:flex-row gap-5 justify-between items-center py-3">
        <div className="text-sm flex flex-col md:flex-row gap-2.5 md:gap-5 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <span>
            <Link href="/about">About</Link>
          </span>
          <span>
            <Link href="/blog">Blog</Link>
          </span>
        </div>
        <div className="text-sm flex flex-row gap-5 items-center">
          <span>
            © {new Date().getFullYear()} layoutloom.com All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
