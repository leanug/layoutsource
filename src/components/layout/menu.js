import { useRouter } from "next/router"
import Link from 'next/link';
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
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/designs/home-pages">Home Pages</Link>
          </li>
          <li>
            <Link href="/designs/inner-pages">Inner Pages</Link>
          </li>
          <li>
            <Link href="/designs/landing-pages">Landing Pages</Link>
          </li>
          <li>
            <Link href="/designs/components">Components</Link>
          </li>
        </ul>
      </nav>
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