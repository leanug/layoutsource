import Link from 'next/link';

// type can be home-pages, inner-pages, components, landing-pages
export const DisplayCategories = ({ categorySlug, type, categories }) => {
  
  return (
    <aside className="">
      <ul className="flex flex-row gap-2">
      <li key="all">
    <Link 
      href={`/designs/${ type }`}
      className={`${
        categorySlug === 'all' ? 'bg-blue-500 text-white' : ''
      } text-blue-500 hover:text-blue-700 transition-colors duration-300`}
    >
        All
    </Link>
  </li>
        {categories?.map((category) => (
          <li key={ category.id }>
            <Link
              href={`/designs/${ type }/${ category.attributes.slug }`}
              className={`${
                categorySlug === category.attributes.slug ? 'bg-blue-500 text-white' : ''
              } text-blue-500 hover:text-blue-700 transition-colors duration-300`}
            >
              { category.attributes.title }
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};