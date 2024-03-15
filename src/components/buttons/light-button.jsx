import Link from 'next/link'

export function LightButton({ onClick, children, to }) {
  if (to) {
    return (
      <Link to={to} className="btn-light">
        {children}
      </Link>
    )
  } else {
    return (
      <button className="btn-light" onClick={onClick}>
        {children}
      </button>
    )
  }
}
