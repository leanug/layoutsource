export function mapDesigns(data) {
  if (!data?.length) return []

  return data.map((item) => {
    return {
      id: item.id,
      tags: item.attributes.tags.data,
      title: item.attributes.title,
      updatedAt: new Date(item.attributes.updatedAt).toLocaleDateString(),
      views: item.attributes.views,
      likes: item.attributes.likes,
      link: item.attributes.link,
      slug: item.attributes.slug,
      image: item.attributes.image.data.attributes,
    }
  })
}
