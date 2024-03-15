import Link from 'next/link'

export function PrimaryButton({ onClick, children, to }) {
  if (to) {
    return (
      <Link to={to} className="btn-primary">
        {children}
      </Link>
    )
  } else {
    return (
      <button className="btn-primary" onClick={onClick}>
        {children}
      </button>
    )
  }
}
