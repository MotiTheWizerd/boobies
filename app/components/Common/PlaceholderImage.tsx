"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type PlaceholderImageProps = Omit<ImageProps, "onError"> & {
  fallbackSrc?: string;
  initials?: string;
  backgroundColor?: string;
  textColor?: string;
};

const PlaceholderImage = ({
  src,
  alt,
  fallbackSrc = "/images/placeholder.webp",
  initials,
  backgroundColor = "#8a2be2",
  textColor = "#ffffff",
  className = "",
  ...rest
}: PlaceholderImageProps) => {
  const [error, setError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
      setUseFallback(true);
    }
  };

  // If we're using initials as a fallback
  if (error && initials && !fallbackSrc) {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{
          backgroundColor,
          color: textColor,
          width: "100%",
          height: "100%",
          ...rest.style,
        }}
      >
        <span className="text-2xl font-bold">{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={useFallback ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
};

export default PlaceholderImage;
