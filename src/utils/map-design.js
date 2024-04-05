/**
 * Maps design data retrieved from Strapi into a more manageable format.
 * @param {Object} data - The design data retrieved from Strapi.
 * @returns {Object} An object representing the mapped design data.
 */
export function mapDesign(data) {
  const aryBase = data.attributes

  // Extracting name and slug from the type object
  const { name, slug } = aryBase.type.data.attributes;

  const design = {
    id: data.id,
    categories: aryBase.categories.data,
    tags: aryBase.tags.data,
    title: aryBase.title,
    updatedAt: new Date(aryBase.updatedAt).toLocaleDateString(),
    views: aryBase.views,
    likes: aryBase.likes,
    link: aryBase.link,
    slug: aryBase.slug,
    image: aryBase.image.data.attributes,
    type: { name, slug },
  }

  return design
}
