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
      cover: {
        id: item.attributes.cover.data.id,
        name: item.attributes.cover.data.attributes.name,
        url: item.attributes.cover.data.attributes.url,
        width: item.attributes.cover.data.attributes.width,
        height: item.attributes.cover.data.attributes.height,
      },
    };
  });
}