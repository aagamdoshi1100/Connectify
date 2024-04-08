import React from "react";

function Brand({ size }) {
  const textSize = size ?? "xl";
  return (
    <>
      <img
        src="../../connectify_logo.png"
        className="brand-Image w-full h-full object-contain"
        alt="brand logo"
      />
      <span className={`brand-text text-${textSize} font-sans font-bold`}>
        CONNECTIFY
      </span>
    </>
  );
}

export default Brand;
