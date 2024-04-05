export const mapCategories = (data) => {
  const mappedData = data.map((item) => ({
    id: item.id,
    title: item.attributes.title,
    slug: item.attributes.slug,
  }))
  return mappedData
}
