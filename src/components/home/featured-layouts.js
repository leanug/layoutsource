import { useState, useEffect } from "react"
import { Layout } from '@/api'
import { GridLayouts } from "@/components/shared"

const layoutCtrl = new Layout()

export default function FeaturedLayouts (props) {
  const [layouts, setLayouts] = useState([])
  const { title, limit = 9, categoryId } = props

  useEffect(() => {
    (async () => {
      try {
        const response = await layoutCtrl.getFeaturedLayouts({
          limit,
          categoryId
        })
        setLayouts(response.data)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <>
      <h2 className="text-xl">{ title }</h2>
      <GridLayouts layouts={ layouts } />
    </>
  )
}