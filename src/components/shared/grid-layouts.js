import Link from "next/link"

export function GridLayouts ({ layouts }) {
  console.log('layouts=', layouts);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {layouts.map((layout) => (
        <Link href={`/layouts/${layout.attributes.slug}`} key={layout.id}>
          <div className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition cursor-pointer">
            <div className="h-48 w-full mb-4">
              <img
                src={layout.attributes.cover.data.attributes.url} // Replace with the actual image URL
                alt={layout.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{layout.title}</h2>
            <p className="text-gray-600 mb-4">{layout.attributes.publishedAt}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-500">{layout.likes} Likes</span>
              <span className="text-green-500">
                {layout.views} Views
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}