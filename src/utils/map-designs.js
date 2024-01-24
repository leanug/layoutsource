export function mapDesigns(data) {
  if (! data?.length) return []

  return data.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      updatedAt: new Date(item.attributes.updatedAt).toLocaleDateString(),
      views: item.attributes.views,
      likes: item.attributes.likes,
      slug: item.attributes.slug,
      cover: item.attributes.cover
        ? {
            id: item.attributes.cover.data?.id || null,
            name: item.attributes.cover.data?.attributes.name || null,
            url: item.attributes.cover.data?.attributes.url || null,
            width: item.attributes.cover.data?.attributes.width || null,
            height: item.attributes.cover.data?.attributes.height || null,
          }
        : null,
    }
  })
}