'use client'

export function PageMenu(props) {
  const { info, resultsInfo, action } = props

  return (
    <section className="mt-16 mb-8 section-full ">
      <div
        className={`
          mb-3 gap-8 flex-col xl:flex-row flex items-center 
          justify-between
        `}
      >
        {info} {/* Sub categories / Search query / Tag name */}
        <div className="flex flex-row items-center justify-end gap-3">
          {resultsInfo}
          {action}
        </div>
      </div>
    </section>
  )
}
