import { 
  GridLayouts, 
  NoResults, 
  CategoryNav, 
  Pagination 
} from "@/components/shared"

export default function CategoryPage (props) {
  const { data } = props
  const { layouts, category, pagination } = data || {}
  const categorySlug = category?.attributes?.slug
  const hasLayouts = layouts && layouts.length > 0

  const loadMoreLayouts = async () => {
    const layoutCtrl = new Layout();
    const nextPage = page + 1;
    const responseLayouts = await layoutCtrl.getLayoutsByCategory({
      slug: category,
      page: nextPage,
    });

    setLayouts(prevLayouts => [...prevLayouts, ...responseLayouts.data]);
    setPage(nextPage);
  };
  
  return (
    <>
      {data ? (
        hasLayouts ? (
          <div>
            <div className="my-8">
              <CategoryNav categorySlug={categorySlug} />
            </div>
            <GridLayouts layouts={layouts} />
            <Pagination
              pageSize={pagination.pageSize}
              totalPages={pagination.total}
            />
          </div>
        ) : (
          <NoResults text="No results" />
        )
      ) : (
        <NoResults text="Category not found" />
      )}
    </>
  )
}