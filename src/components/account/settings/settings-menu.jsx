import Link from 'next/link'

export function SettingsMenu({ currentPage }) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/account/settings"
        className={`btn w-48 ${currentPage === 'general' ? 'btn-active' : ''}`}
      >
        General
      </Link>
      <Link
        href="/account/settings/password"
        className={`btn w-48 ${currentPage === 'password' ? 'btn-active' : ''}`}
      >
        Password
      </Link>
    </div>
  )
}
