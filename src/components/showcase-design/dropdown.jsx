import React from 'react'

export default function Dropdown({ designData }) {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content z-[1] p-5 shadow bg-base-100 rounded-box w-72 flex flex-col gap-3"
    >
      <li className="flex justify-between py-1 bg-base-100">
        <span>Likes:</span>
        <span>{designData?.likes}</span>
      </li>
      <li className="flex justify-between py-1">
        <span>Views:</span>
        <span>{designData?.views}</span>
      </li>
      {designData?.link ? (
        <li className="flex justify-between py-1">
          <span>Link:</span>
          <a className="link" href={designData?.link}>
            {designData?.link}
          </a>
        </li>
      ) : null}
      {/* Exclude tags for now */}
      {/* <li>
            <a>Tags: {designData.tags}</a>
          </li> */}
    </ul>
  )
}
