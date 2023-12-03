import { useEffect, useState } from 'react'
import { UserLayout } from '@/api'
import { useLoading } from '@/hooks'
import { DesignItem } from './design-item'
import Link from 'next/link'

const layoutCtrl = new UserLayout()

/*
 * User suggested designs
 */
export function UserDesigns (props) {
  const { userId } = props
  const { loading, startLoading, stopLoading } = useLoading()
  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      startLoading()
      try {
        const response = await layoutCtrl.get(userId)
        setDesigns(response.data)
      } finally {
        stopLoading()
      }
    })()
  }, [page])

  return (
    <ul>
      {
        designs.map(item => (
          <li key={ item.id } className='flex flex-row justify-between'>
            <div>
              { item.attributes.title }
            </div>
            <div>
              { item.attributes.status ? 'Accepted' : 'Submited' }
            </div>
          </li>
        ))
      }
    </ul>
  )
}