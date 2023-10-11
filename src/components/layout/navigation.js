import Link from 'next/link';

export function Navigation() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/designs/home-pages">Homepages</Link>
        </li>
        <li>
          <Link href="/designs/inner-pages">Subpages</Link>
        </li>
        <li>
          <Link href="/designs/landing-pages">Landingpages</Link>
        </li>
        <li>
          <Link href="/designs/components">Components</Link>
        </li>
      </ul>
    </nav>
  )
}