import { GridLayouts, NoResults, Pagination } from "@/components/shared"

export default function SearchPage (props) {
  const { layouts, searchText, pagination } = props
  const hasLayouts = layouts.length > 0;

  return (
    <>
     {
        hasLayouts ? (
          <div>
            <h1 className="text-xl">{ searchText }</h1>
            <GridLayouts layouts={ layouts } />
            <Pagination 
              currentPage={ pagination.page } 
              totalPages={ pagination.pageCount }
            />
          </div>
        ) : (
          <NoResults text="No results" />
        )
      }
    </>
  )
}