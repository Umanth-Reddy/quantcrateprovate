import React from 'react';
import type { Fundamental } from '../types';

interface FundamentalsTableProps {
    fundamentals: Fundamental[];
}

const FundamentalsTable: React.FC<FundamentalsTableProps> = ({ fundamentals }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Fundamentals</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {fundamentals.map((item) => (
                    <React.Fragment key={item.label}>
                        <div className="text-gray-500 dark:text-gray-400">{item.label}</div>
                        <div className="text-right font-mono font-medium text-gray-900 dark:text-white">{item.value}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default FundamentalsTable;
