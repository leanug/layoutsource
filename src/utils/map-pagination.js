export function mapPagination(paginationData) {
  // Extract relevant fields from the pagination object
  const { page, pageSize, pageCount, total } = paginationData;

  // Map the data to the desired format
  const mappedPagination = {
    currentPage: page,
    itemsPerPage: pageSize,
    totalPages: pageCount,
    totalItems: total,
  };

  return mappedPagination;
}
