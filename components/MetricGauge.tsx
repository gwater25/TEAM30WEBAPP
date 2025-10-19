
import React from 'react';

interface MetricGaugeProps {
    value: number; // 0-100
}

const MetricGauge: React.FC<MetricGaugeProps> = ({ value }) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    const circumference = 2 * Math.PI * 90; // 2 * pi * radius
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    const getColor = () => {
        if (clampedValue > 90) return 'stroke-error';
        if (clampedValue > 75) return 'stroke-warning';
        return 'stroke-info';
    };
    
    const getTextColor = () => {
        if (clampedValue > 90) return 'text-error';
        if (clampedValue > 75) return 'text-warning';
        return 'text-info';
    }


    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="transparent"
                    strokeWidth="12"
                    className="stroke-base-100/50"
                />
                {/* Foreground circle (progress) */}
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="transparent"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className={`transform -rotate-90 origin-center transition-all duration-500 ease-out ${getColor()}`}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                    }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-5xl font-bold ${getTextColor()}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {clampedValue.toFixed(1)}
                </span>
                <span className="text-xl text-gray-400">% FULL</span>
            </div>
        </div>
    );
};

export default MetricGauge;
