import React from "react";

export function CollectionButtons({ isAddCollectionVisible, toggleComponents }) {
  return (
    <div className="p-4 text-center">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md"
        onClick={toggleComponents}
      >
        {isAddCollectionVisible ? "Back to Collections" : "Create New Collection"}
      </button>
    </div>
  );
}
