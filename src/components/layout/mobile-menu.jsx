import { useMobileMenuStore } from '@/store'
import { Navigation } from '..'

export function MobileMenu() {
  const { toggleMenu, isOpen } = useMobileMenuStore()

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} absolute top-4 right-10 w-72 shadow-md rounded-lg`}
    >
      <div className="bg-white p-6 rounded-lg relative">
        <Navigation vertical={true} />
        <button onClick={toggleMenu} className="absolute top-8 right-7 h-8 w-8">X</button>
      </div>
    </div>
  )
}
