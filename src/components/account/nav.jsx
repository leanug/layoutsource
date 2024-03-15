import Link from 'next/link'

/* 
 * Navigation for user account page
 */
export function Nav({ activeTab, slug }) {
  const generateLinkClass = (tab, activeTab) => `
    w-40 text-center text-gray-900 px-4 py-3 rounded-lg 
    font-semibold dark:text-white border border-gray-200 
    dark:border-gray-500
    ${activeTab === tab ? 'bg-gray-100 dark:bg-gray-700 ' : 'hover:bg-gray-50 dark:hover:bg-gray-700 '}
  `

  return (
    <div className="space-x-3 flex flex-row justify-center mb-20">
      <Link
        href={`/${slug}/liked`}
        className={generateLinkClass('liked', activeTab)}
      >
        Liked Designs
      </Link>

      <Link
        href={`/${slug}/submitted`}
        className={generateLinkClass('submitted', activeTab)}
      >
        Submitted
      </Link>

      <Link
        href={`/${slug}/collections`}
        className={generateLinkClass('collections', activeTab)}
      >
        Collections
      </Link>
    </div>
  )
}
