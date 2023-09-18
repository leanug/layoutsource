import { useState, useEffect } from "react"
import { Layout } from '@/api'
import { GridLayouts, CategoryNav } from "@/components/shared"

const layoutCtrl = new Layout()

export function DisplayDesigns (props) {
  const [layouts, setLayouts] = useState([])
  const { limit = 9, categoryId, type, headerText } = props

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
    <h1>{ headerText }</h1>
      <div className="my-8">
        <CategoryNav type={ type } />
      </div>
      <GridLayouts layouts={ layouts } />
    </>
  )
}