import { useMobileMenuStore } from '@/store'
import { MenuSolid } from './icons/menu-solid'

export function MobileMenuButton() {
  const { toggleMenu } = useMobileMenuStore()

  return (
    <button onClick={toggleMenu} className="xl:hidden">
      <MenuSolid className="w-8 h-8 fill-gray-700 dark:fill-white" />
    </button>
  )
}
