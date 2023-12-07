import Link from "next/link"

export function Nav({ activeTab, slug }) {

  return (
    <div className="space-x-4 flex flex-row justify-center">
      <Link
        href={ `/${ slug }/liked` }
        className={`px-4 py-2 ${activeTab === 'liked' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
      >
        Liked
      </Link>

      <Link
        href={ `/${ slug }/submitted` }
        className={`px-4 py-2 ${activeTab === 'submitted' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
      >
        Submitted
      </Link>
      
      <Link
        href={ `/${ slug }/collections` }
        className={`px-4 py-2 ${activeTab === 'collections' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
      >
        Collections
      </Link>
    </div>
  )
}