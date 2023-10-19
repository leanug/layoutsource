import React, { useState } from 'react';

export const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    'red', 'blue', 'green', 'yellow', 'orange'
  ]

  return (
    <div className="color-selector">
      {
        colors.map((color, index) => (
          <div
            key={index}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))
      }
    </div>
  );
}
