import { DisplayCategories, DropdownMenu } from ".";

export function PageMenu (props) {
  const { 
    query,
    categorySlug, 
    designCount,
    type, 
    categories,
    handleSorting,
    className,
    displayCategories,
    displaySearchQueryData
  } = props
  
  return (
    designCount ? (
      <section>
        <div className="section-full mb-3 gap-8 flex-row flex items-center justify-between">
          {
            displayCategories ? (
              <DisplayCategories 
                categorySlug={ categorySlug }
                type={ type }
                categories={ categories }
                className={ className }
              />
            ) : null
          }
          
          {
            displaySearchQueryData ? (
              <h1 className="text-center">Query: { query || '-' }</h1>
            ) : null
          }

          <div className="flex flex-row items-center gap-3">
            <span className="w-40 text-right">
              { designCount } { designCount === 1 ? 'result' : 'results'}
            </span>
            <DropdownMenu handleSorting={ handleSorting } />
          </div>
        </div>
      </section>
    ) : null
  )
}