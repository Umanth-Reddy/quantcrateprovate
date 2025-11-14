import React from 'react';
import GlassPane from '../components/ui/GlassPane';
import { mockSectorPerformanceData } from '../data/mockData';

interface SectorsViewProps {
    onBack: () => void;
}

const SectorsView: React.FC<SectorsViewProps> = ({ onBack }) => {
    // Sort sectors by performance, descending
    const sortedSectors = [...mockSectorPerformanceData].sort((a, b) => {
        const performanceA = parseFloat(a.priceChange.replace('%', ''));
        const performanceB = parseFloat(b.priceChange.replace('%', ''));
        return performanceB - performanceA;
    });

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back to Dashboard</button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Sector Performance Ranking</h1>
                
                <GlassPane className="p-6">
                    <div className="space-y-4">
                        {sortedSectors.map((item, index) => {
                            const total = item.gainers + item.losers;
                            const gainerWidth = total > 0 ? (item.gainers / total) * 100 : 0;
                            const loserWidth = total > 0 ? (item.losers / total) * 100 : 0;

                            return (
                                <div key={index} className="grid grid-cols-12 gap-4 items-center border-b border-stone-200 dark:border-purple-400/20 pb-4 last:border-0 last:pb-0">
                                    {/* Rank */}
                                    <div className="col-span-1 text-center">
                                        <span className="text-lg font-bold text-gray-500 dark:text-gray-400 font-mono">{index + 1}</span>
                                    </div>
                                    {/* Icon & Name */}
                                    <div className="col-span-5 flex items-center space-x-3">
                                        <div className="text-gray-500 dark:text-gray-400">{item.icon}</div>
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">{item.sector}</span>
                                    </div>
                                    {/* Bar */}
                                    <div className="col-span-4 flex items-center h-4">
                                        <span className="font-mono text-xs text-green-500 pr-2">{item.gainers}</span>
                                        <div className="flex-grow flex h-2 rounded-full overflow-hidden bg-stone-200 dark:bg-gray-700">
                                            <div className="bg-green-500" style={{ width: `${gainerWidth}%` }}></div>
                                            <div className="bg-red-500" style={{ width: `${loserWidth}%` }}></div>
                                        </div>
                                        <span className="font-mono text-xs text-red-500 pl-2">{item.losers}</span>
                                    </div>
                                    {/* Change */}
                                    <div className={`col-span-2 text-right font-mono text-sm font-semibold ${item.changePositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.priceChange}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassPane>
            </div>
        </div>
    );
};

export default SectorsView;