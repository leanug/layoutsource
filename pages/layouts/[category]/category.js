import { GridLayouts, NoResults, Pagination } from "@/components/shared"

export default function CategoryPage (props) {
  const { layouts, category, pagination } = props
  const hasLayouts = layouts.length > 0;

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
      {
        hasLayouts ? (
          <div>
            <h1>{ category.attributes.title }</h1>
            <GridLayouts layouts={ layouts } />
            <Pagination 
              pageSize={ pagination.pageSize } 
              totalPages={ pagination.total }
            />
          </div>
        ) : (
          <NoResults text="No results" />
        )
      }
    </>
  )
}