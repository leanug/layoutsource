import { SearchBar } from '@/components'
import { useFullSearchBarStore } from '@/store'

export function SearchBarFull() {
  const { isOpen } = useFullSearchBarStore()

  return (
    <div
      className={`
        w-full px-5 block xl:hidden mt-8
        ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}
      `}
    >
      <SearchBar />
    </div>
  )
}
