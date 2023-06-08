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
        console.log(categories)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <aside className="bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
      <ul className="space-y-2">
        {categories?.map((category) => (
          <li key={category.id}>
            <a href={`/category/${category.attributes.slug}`} className="text-blue-500 hover:text-blue-700">
              {category.attributes.title}
            </a>
          </li>
        ))}
      </ul>
      </ul>
    </aside>
  );
};

export default AsideMenu;
