import Link from "next/link"
import { LikedLayoutsIcon } from "./liked-layouts-icon"

export function GridLayouts ({ layouts }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {layouts.map((layout) => (
        <div className="relative" key={layout.id}>
          <div className="hover:shadow-lg transition">
            <div className="w-full mb-4 relative">
              <div className="absolute bottom-2 right-2">
                <LikedLayoutsIcon layoutId={ layout.id } />
              </div>
              <Link href={`/${layout.attributes.slug}`}>
                <img
                  src={layout.attributes.cover.data.attributes.url}
                  alt={layout.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </Link>
            </div>
            <div className="flex flex-row  justify-between gap-3">
              <Link href={`/${layout.attributes.slug}`}>
                <h2 className="text-gray-600 mb-4">
                  { layout.attributes.title }
                </h2>
              </Link>
              <div className="flex flex-row items-center gap-3">
                <span className="text-green-500">{ layout.attributes.views } V</span>
                <span className="text-green-500">{ layout.attributes.likes } L</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}