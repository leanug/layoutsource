import { useEffect, useState } from "react"
import { LikedLayouts as LikedLayoutsCtrl } from "@/api"
import { useAuth } from "@/hooks"
import { GridLayouts } from "@/containers"

const likedLayoutsCtrl = new LikedLayoutsCtrl()

export function LikedLayoutList() {
  const { user } = useAuth()
  const [likedLayouts, setLikedLayouts] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await likedLayoutsCtrl.getAll(user.id)
      console.log(response);
      const newArray = response?.map(item => item.attributes.layout.data);
      setLikedLayouts(newArray)
    })()
  }, [user.id])

  return (
    <div>
      {likedLayouts === null ? (
        <p>Error fetching liked layouts.</p>
      ) : likedLayouts.length === 0 ? (
        <p>No liked layouts found.</p>
      ) : (
        <GridLayouts layouts={ likedLayouts } />
      )}
    </div>
  )
}