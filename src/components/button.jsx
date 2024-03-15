import Link from 'next/link'

export function Button({ onClick, children }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      {children}
    </button>
  )
}
