import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Input, Button } from 'semantic-ui-react'

const Menu = (props) => {
  const [categories, setCategories]  = useState(null)
  const [searchText, setSearchText] = useState("");
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        // TODO peticion
      } catch (error) {
        console.error(error)
      }
    })()
  },[])  

  const onSearchClick = () => {
    if (searchText.trim() !== "") {
      const encodedSearchText = encodeURIComponent(searchText);
      router.push(`/search?s=${encodedSearchText}`);
    }
  };

  return (
    <div className="flex flex-row">
      Menu
      <Input
        id="search-layouts"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={onSearchClick}>Search</Button>
    </div>
  )
}

export default Menu