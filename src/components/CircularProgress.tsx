import { useEffect, useState } from 'react';

interface CircularProgressProps {
  value: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'green' | 'orange' | 'primary';
  animate?: boolean;
  hideLabel?: boolean;
}

const colorMap = {
  blue: 'text-blue-500 dark:text-blue-400',
  green: 'text-green-500 dark:text-green-400',
  orange: 'text-orange-500 dark:text-orange-400',
  primary: 'text-primary-500 dark:text-primary-400'
};

export default function CircularProgress({
  value,
  label,
  size = 60,
  strokeWidth = 4,
  color = 'primary',
  animate = false,
  hideLabel = false,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgress(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(value);
    }
  }, [value, animate]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colorMap[color]} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {!hideLabel && (
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xs font-semibold dark:text-white">{value}</span>
          {label && <span className="text-[10px] text-gray-500 dark:text-gray-400">{label}</span>}
        </div>
      )}
      {hideLabel && (
        <div className="absolute flex items-center justify-center">
          <span className="text-xs font-semibold dark:text-white">{value}</span>
        </div>
      )}
    </div>
  );
}