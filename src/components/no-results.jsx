import { ThinkingFace } from '@/components'

export function NoResults({
  isDataFetched,
  pagination,
  text,
  showIcon = true,
}) {
  if (
    typeof pagination.totalItems === 'number' &&
    pagination.totalItems === 0 &&
    isDataFetched
  ) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center justify-center">
        {showIcon && <ThinkingFace width={120} height={120} />}
        <h1 className="text-gray-950 font-semibold dark:text-white text-xl lg:text-3xl">
          {text}
        </h1>
      </div>
    )
  } else {
    return null
  }
}
