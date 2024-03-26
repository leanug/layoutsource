import Link from 'next/link'

export function PrimaryButton({ onClick, children, to, type }) {
  if (to) {
    return (
      <Link to={to} className="btn-primary">
        {children}
      </Link>
    )
  } else {
    return (
      <button type={type} className="btn-primary" onClick={onClick}>
        {children}
      </button>
    )
  }
}
