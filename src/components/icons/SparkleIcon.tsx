import React from 'react';

interface SparkleIconProps {
  className?: string;
}

export const SparkleIcon: React.FC<SparkleIconProps> = ({ className = "" }) => {
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
        d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
        fill="currentColor"
      />
      <path
        d="M12 3L12.5 4.5L14 5L12.5 5.5L12 7L11.5 5.5L10 5L11.5 4.5L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
};