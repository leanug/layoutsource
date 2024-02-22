import Link from 'next/link'

export function Navigation({ vertical }) {
  const navClass = vertical
    ? 'flex flex-col font-medium gap-5 py-2 font-normal'
    : 'flex flex-row space-x-4'

  return (
    <nav>
      <ul className={navClass}>
        <li>
          <Link
            href="/designs/homepages"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            Homepages
          </Link>
        </li>
        <li>
          <Link
            href="/designs/subpages"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            Subpages
          </Link>
        </li>
        <li>
          <Link
            href="/designs/landingpages"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            Landingpages
          </Link>
        </li>
        <li>
          <Link
            href="/designs/components"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            Components
          </Link>
        </li>
      </ul>
    </nav>
  )
}
