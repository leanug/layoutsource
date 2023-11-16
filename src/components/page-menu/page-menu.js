import { DisplayCategories, DropdownMenu } from ".";

export function PageMenu (props) {
  const { 
    categorySlug, 
    designCount,
    type, 
    categories,
    handleSorting,
    className 
  } = props
  
  return (
    categories ? (
      <section>
      <div className="section-full mb-3 gap-8 flex-row flex items-center justify-between">
        <DisplayCategories 
          categorySlug={ categorySlug }
          type={ type }
          categories={ categories }
          className={ className }
        />
        <div className="flex flex-row items-center gap-3">
          <span className="w-40 text-right">{ designCount } results</span>
          {
          designCount ? (
          <DropdownMenu handleSorting={ handleSorting } />
          ) : null
        }
        </div>
      </div>
    </section>
    ) : null
  )
}