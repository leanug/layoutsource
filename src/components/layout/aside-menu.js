import React, { useEffect, useState } from 'react';
import { Category } from '@/api';

const categoryCtrl = new Category()

const AsideMenu = () => {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll()
        setCategories(response.data)
        console.log('categories', categories)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <aside className="">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories?.map((category) => (
          <li key={category.id}>
            <a
              href={`/category/${category.attributes.slug}`}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              {category.attributes.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;
