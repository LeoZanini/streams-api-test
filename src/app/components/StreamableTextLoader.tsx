'use client';

import { useState } from 'react';

export const StreamableTextLoader = ({ data, className }) => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent((prev) => !prev);
  };

  return (
    <>
      <button className={className} onClick={handleClick} >
        Toggle Content
      </button>
      {showContent && (
        <div className="mt-2">
          <pre>{data}</pre> {/* Use <pre> for preserving formatting */}
        </div>
      )}
    </>
  );
};
