import React from 'react'

import { CollectionsToggleButton, LikeDesignButton } from '@/components'
import { Collections } from '@/containers'
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid'
import Dropdown from './dropdown'

export default function Header({ user, designData }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between w-full max-w-7xl mx-auto rounded-lg py-2.5 px-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold">{designData.title}</h1>
        <a href={designData.link} className="btn btn-ghost font-semibold">
          {designData.link}
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </a>
      </div>
      {user && (
        <ul className="flex flex-row gap-2">
          <li>
            <CollectionsToggleButton
              collections={
                <Collections userId={user._id} designId={designData._id} />
              }
              modalTitle="Collections"
            />
          </li>
          <li>
            <LikeDesignButton
              userId={user._id}
              designLikes={designData.likes}
              designId={designData._id}
            />
          </li>
          <li>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost mb-2">
                <EllipsisHorizontalIcon className="w-6 h-6" />
              </div>
              <Dropdown designData={designData} />
            </div>
          </li>
        </ul>
      )}
    </div>
  )
}
