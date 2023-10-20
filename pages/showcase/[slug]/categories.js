import Link from 'next/link';

export function Categories({ categories }) {
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