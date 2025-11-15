import React from 'react';
import GlassPane from './ui/GlassPane';
import type { BasketStock } from '../types';

interface ComparisonChartProps {
    stocks: BasketStock[];
    onOpenDetailView: () => void;
}

const ChartLegendItem: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{name}</span>
    </div>
);

const ComparisonChart: React.FC<ComparisonChartProps> = ({ stocks, onOpenDetailView }) => {
    const colors = ['bg-cyan-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
    const basketColor = 'bg-orange-500';

    return (
        <GlassPane hover className="p-6 cursor-pointer" onClick={onOpenDetailView}>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Comparison</h3>
                <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium hidden group-hover:block">&rarr; View Details</span>
            </div>
            <div className="h-64 bg-stone-50 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20 flex items-center justify-center p-4">
                {/* Static SVG Placeholder */}
                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path d="M 0 80 Q 25 20, 50 60 T 100 70 T 150 40 T 200 50" stroke="#f97316" fill="none" strokeWidth="1.5" strokeDasharray="4 2" />
                    <path d="M 0 50 Q 25 60, 50 40 T 100 30 T 150 70 T 200 60" stroke="#06b6d4" fill="none" strokeWidth="1.5" />
                    <path d="M 0 30 Q 25 40, 50 20 T 100 50 T 150 30 T 200 20" stroke="#8b5cf6" fill="none" strokeWidth="1.5" />
                </svg>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                <ChartLegendItem name="Overall Basket" color={basketColor} />
                {stocks.map((stock, index) => (
                    <ChartLegendItem key={stock.ticker} name={stock.ticker} color={colors[index % colors.length]} />
                ))}
            </div>
        </GlassPane>
    );
};

export default ComparisonChart;
