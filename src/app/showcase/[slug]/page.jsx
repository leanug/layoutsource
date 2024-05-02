'use client'

import { usePathname } from 'next/navigation'

const Showcase = () => {
  const data = usePathname()
  return (
    <div className="flex flex-col items-center justify-center h-full">
      Showecase {data}
    </div>
  )
}

export default Showcase
