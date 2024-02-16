import Link from "next/link"

export function SettingsMenu({ currentPage }) {
  return (
    <div className="flex flex-col gap-3">
      <Link 
        href="/account/settings" 
        className={`btn-settings-menu w-48 ${ currentPage === 'general' ? 'active' : '' }`}
      >
        General
      </Link>
      <Link 
        href="/account/settings/password" 
        className={`btn-settings-menu w-48 ${ currentPage === 'password' ? 'active' : '' }`}
      >
        Password
      </Link>
      <button className="text-red-500 hover:text-red-700 ease-in transition duration-200 mt-2 font-medium">
        Delete Account
      </button>
    </div>
  )
}