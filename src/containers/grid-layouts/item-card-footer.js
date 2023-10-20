import { 
  HeartSolid, 
  EyeSolid, 
} from '@/components'
import Link from 'next/link'

export function ItemCardFooter (props) {
  const { slug, views, likes, title } = props
  
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <Link href={`/showcase/${ slug }` }>
        <h2 className="text-gray-900">
          { title }
        </h2>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-1.5 items-center">
          <EyeSolid className="w-4 h-4 fill-slate-400" />
          <span className="text-gray-600">{ views }</span>
        </div>
        <div className="flex flex-row gap-1.5 items-center">
          <HeartSolid className="w-4 h-4 fill-slate-400" />
          <span className="text-gray-600">{ likes }</span>
        </div>
      </div>
    </div>
  )
}