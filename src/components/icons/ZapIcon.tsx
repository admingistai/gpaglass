import React from 'react';

interface ZapIconProps {
  className?: string;
}

export const ZapIcon: React.FC<ZapIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 1L3 9H8L7 15L13 7H8L9 1Z"
        fill="currentColor"
      />
    </svg>
  );
};