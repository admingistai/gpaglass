import React from 'react';

interface NYTimesLogoProps {
  className?: string;
}

export const NYTimesLogo: React.FC<NYTimesLogoProps> = ({ className = "" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        fill="currentColor"
        rx="2"
      />
      <path
        d="M5 4.5H15V6H11.5V16H9.5V6H5V4.5Z"
        fill="black"
      />
    </svg>
  );
};