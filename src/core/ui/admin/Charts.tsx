import React from 'react';
import { cn } from '@/core/lib/utils';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showDots?: boolean;
  className?: string;
}

export const Sparkline = ({
  data,
  width = 100,
  height = 30,
  color = 'currentColor',
  showDots = false,
  className,
}: SparklineProps) => {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return { x, y, value };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg
      width={width}
      height={height}
      className={cn('overflow-visible', className)}
      style={{ color }}
    >
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDots &&
        points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            fill="currentColor"
          />
        ))}
    </svg>
  );
};

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
}

export const BarChart = ({
  data,
  height = 200,
  showLabels = true,
  showValues = true,
  className,
}: BarChartProps) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn('space-y-3', className)}>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        const barColor = item.color || 'bg-primary-600';

        return (
          <div key={index}>
            {showLabels && (
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
                {showValues && (
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            )}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', barColor)}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface DonutChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
  thickness?: number;
  showLegend?: boolean;
  className?: string;
}

export const DonutChart = ({
  data,
  size = 200,
  thickness = 30,
  showLegend = true,
  className,
}: DonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentAngle = -90;
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const segment = {
      ...item,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    };
    currentAngle += angle;
    return segment;
  });

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className="text-gray-200 dark:text-gray-700"
        />
        {segments.map((segment, index) => {
          const offset = ((360 - segment.startAngle - 90) / 360) * circumference;
          const dashArray = (segment.percentage / 100) * circumference;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={thickness}
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={-offset}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {showLegend && (
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {segment.label}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">
                {segment.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
