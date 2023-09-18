import Link from 'next/link';

function CategoryList({ categories }) {
  return (
    <div>
      <h2>Categories:</h2>
      {
        !categories || categories.length === 0 ? (
          null
        ) : (
          <ul>
          {categories.map(category => (
            <li key={category.id}>
              <Link href={`/layouts/${category.attributes.slug}`}>
              {category.attributes.title}
              </Link>
            </li>
          ))}
        </ul>
        )
      }
    </div>
  );
}

export default CategoryList;