import React, { useEffect, useState } from 'react';
import { Category } from '@/api';
import Link from 'next/link';

const categoryCtrl = new Category()

export const CategoryNav = ({ categorySlug, type }) => {
  const [categories, setCategories] = useState(null)
  
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getByType(type)
        setCategories(response.data)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <aside className="">
      <ul className="flex flex-row gap-2">
        {categories?.map((category) => (
          <li key={ category.id }>
            <a
              href={`/layouts/${ category.attributes.slug }`}
              className={`${
                categorySlug === category.attributes.slug ? 'bg-blue-500 text-white' : ''
              } text-blue-500 hover:text-blue-700 transition-colors duration-300`}
            >
              { category.attributes.title }
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};