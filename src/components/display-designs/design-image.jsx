import Image from 'next/image'

export function DesignImage(props) {
  const { coverSrc, title } = props

  return (
    <div
      className={`
              aspect-[3/4] overflow-hidden w-full bg-gray-500 
              origin-top cursor-pointer rounded-lg border border-gray-10 
              dark:border-gray-600
            `}
      /* onClick={() => showcaseDesign(design.slug)} */
    >
      {coverSrc ? (
        <Image
          src={coverSrc}
          alt={title}
          className="w-full h-full object-cover mx-auto"
          style={{ objectPosition: 'top' }}
          width="0"
          height="0"
          sizes="100%"
          priority={true}
        />
      ) : null}
    </div>
  )
}
