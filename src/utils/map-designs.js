export function mapDesigns(data) {
  if (!data?.length) return []

  return data.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      updatedAt: new Date(item.attributes.updatedAt).toLocaleDateString(),
      views: item.attributes.views,
      likes: item.attributes.likes,
      slug: item.attributes.slug,
      image: item.attributes.image
        ? {
            //name: item.attributes.cover.data?.attributes.name || null,
            url:
              item.attributes.image.data.attributes.formats.medium.url || null,
            height:
              item.attributes.image.data.attributes.formats.medium.height ||
              null,
            width:
              item.attributes.image.data.attributes.formats.medium.width ||
              null,
          }
        : null,
    }
  })
}
