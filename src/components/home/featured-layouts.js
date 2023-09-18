import { useState, useEffect } from "react"
import { Layout } from '@/api'
import { GridLayouts, CategoryNav } from "@/components/shared"

const layoutCtrl = new Layout()

export default function FeaturedLayouts (props) {
  const [layouts, setLayouts] = useState([])
  const { limit = 9, categoryId } = props

  useEffect(() => {
    (async () => {
      try {
        const response = await layoutCtrl.getFeaturedLayouts({
          limit,
          categoryId
        })
        setLayouts(response.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <>
    <h1>Featured designs</h1>
      <div className="my-8">
        <CategoryNav categorySlug='featured' />
      </div>
      <GridLayouts layouts={ layouts } />
    </>
  )
}