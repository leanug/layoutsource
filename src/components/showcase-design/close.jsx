import React from 'react'

import { XMarkIcon } from '@heroicons/react/24/solid'

function Close({ handleCloseShowcaseDesign }) {
  return (
    <div className="flex justify-end mt-3">
      <button
        className="btn btn-circle btn-neutral"
        onClick={
          handleCloseShowcaseDesign // Close the showcase
        }
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  )
}

export default Close
