import Link from 'next/link'

export function SecondaryButton({ onClick, children, to }) {
  if (to) {
    return (
      <Link to={to} className="btn-secondary">
        {children}
      </Link>
    )
  } else {
    return (
      <button className="btn-secondary" onClick={onClick}>
        {children}
      </button>
    )
  }
}
