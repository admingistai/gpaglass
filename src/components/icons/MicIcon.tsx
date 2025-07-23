import React from 'react';

interface MicIconProps {
  className?: string;
}

export const MicIcon: React.FC<MicIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 12.5C11.38 12.5 12.5 11.38 12.5 10V5C12.5 3.62 11.38 2.5 10 2.5C8.62 2.5 7.5 3.62 7.5 5V10C7.5 11.38 8.62 12.5 10 12.5Z"
        fill="currentColor"
      />
      <path
        d="M14.5 8.5V10C14.5 12.48 12.48 14.5 10 14.5C7.52 14.5 5.5 12.48 5.5 10V8.5H4V10C4 13.03 6.27 15.48 9.25 15.93V17.5H10.75V15.93C13.73 15.48 16 13.03 16 10V8.5H14.5Z"
        fill="currentColor"
      />
    </svg>
  );
};