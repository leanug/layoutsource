import { HeartIcon, EyeIcon } from '@heroicons/react/24/solid'

export function DesignInfo(props) {
  const { slug, views, likes, title, showcaseDesign } = props

  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <h2
        onClick={() => showcaseDesign(slug)}
        className="text-gray-900 dark:text-white"
      >
        {title}
      </h2>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-1.5 items-center">
          <EyeIcon className="w-4 h-4 fill-slate-400" />
          <span className="text-gray-600 dark:text-gray-200">{views}</span>
        </div>
        <div className="flex flex-row gap-1.5 items-center">
          <HeartIcon className="w-4 h-4 fill-slate-400" />
          <span className="text-gray-600 dark:text-gray-200">{likes}</span>
        </div>
      </div>
    </div>
  )
}
