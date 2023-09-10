export function Pagination(props) {
  const { currentPage, totalPages } = props
  
  return (
    <>
      <p>Pagination { currentPage } / { totalPages }</p>
    </>
  )
}