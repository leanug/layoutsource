import React, { useState } from 'react';
import { ColorSelector } from '.';

export function DropdownMenu () {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative flex justify-end">
      <button
        onClick={toggleDropdown}
        className={`py-2 px-4 bg-green-500 text-white rounded-lg ml-auto ${
          dropdownVisible ? 'ring ring-green-300' : ''
        }`}
      >
        Click me
      </button>
      {dropdownVisible && (
        <div className="absolute z-40 mt-10 p-2 bg-gray-100 rounded-lg shadow-lg mr-0">
          {/* Additional content goes here */}
          <a href="#" className="block hover:bg-gray-200 py-2 px-4">
            Item 1
          </a>
          <a href="#" className="block hover:bg-gray-200 py-2 px-4">
            Item 2
          </a>
          <a href="#" className="block hover-bg-gray-200 py-2 px-4">
            Item 3
          </a>
          <ColorSelector />
        </div>
      )}
    </div>
  );
}