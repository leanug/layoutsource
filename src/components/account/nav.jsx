import Link from "next/link"

export function Nav({ activeTab, slug }) {
  const generateLinkClass = (tab, activeTab) => `
    w-40 text-center px-4 py-3 rounded-lg font-semibold
    ${ activeTab === tab ? 'bg-gray-100' : 'border border-gray-200 hover:bg-gray-50 text-gray-900' }
  `

  return (
    <div className="space-x-3 flex flex-row justify-center mb-20">
      <Link href={`/${slug}/liked`} className={generateLinkClass('liked', activeTab)}>
        Liked Designs
      </Link>

      <Link href={`/${slug}/submitted`} className={generateLinkClass('submitted', activeTab)}>
        Submitted
      </Link>

      <Link href={`/${slug}/collections`} className={generateLinkClass('collections', activeTab)}>
        Collections
      </Link>
    </div>
  )
}