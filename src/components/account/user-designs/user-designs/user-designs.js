import { useEffect, useState } from 'react'
import { UserLayout } from '@/api'
import { useAuth, useLoading } from '@/hooks'
import { DesignItem } from './design-item'
import { GridLayouts } from '@/containers'

const layoutCtrl = new UserLayout()

export function UserDesigns (props) {
  const { reload } = props
  const { user } = useAuth()
  const { loading, startLoading, stopLoading } = useLoading()
  const [layouts, setLayouts] = useState([])

 /*  useEffect(() => {
    (async () => {
      startLoading()
      try {
        const response = await layoutCtrl.getAll(user.id)
        setLayouts(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        stopLoading()
      }
    })()
  }, [user.id, reload])

  if (loading) return <div>Loading...</div>;

  if (layouts.length === 0) {
    return <div>No layouts found. Please add some layouts.</div>;
  } */

  return (
    <>
     {/* <GridLayouts layouts={ layouts } /> */}
     <div>favs</div>
    </>
   
  )
}