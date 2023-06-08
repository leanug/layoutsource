import { useEffect, useState } from "react"
import { Image, Icon, Input } from 'semantic-ui-react'

const Menu = (props) => {
  const { isOpenSearch } = props
  const { categories, setCategories } = useState(null)

  useEffect(() => {
    (async () => {
      try {
        // TODO peticion
      } catch (error) {
        console.error(error)
      }
    })()
  },[])

  return (
    <div>
      Menu
    </div>
  )
}

export default Menu