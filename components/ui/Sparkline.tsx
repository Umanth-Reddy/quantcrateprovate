
import React from 'react';

interface SparklineProps {
    color: 'green' | 'red' | 'cyan';
    data: string; // SVG path data 'd' attribute
}

const Sparkline: React.FC<SparklineProps> = ({ color, data }) => {
    const colorMap = {
        green: '#22c55e',
        red: '#ef4444',
        cyan: '#22d3ee'
    };

    return (
        <svg className="w-full h-8 max-w-[100px]" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={data} stroke={colorMap[color]} strokeWidth="2" />
        </svg>
    );
};

export default Sparkline;
