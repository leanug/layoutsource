import Link from 'next/link';

export function Navigation() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/designs/homepages">Homepages</Link>
        </li>
        <li>
          <Link href="/designs/subpages">Subpages</Link>
        </li>
        <li>
          <Link href="/designs/landingpages">Landingpages</Link>
        </li>
        <li>
          <Link href="/designs/components">Components</Link>
        </li>
      </ul>
    </nav>
  )
}