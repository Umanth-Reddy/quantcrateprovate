
import React from 'react';
import GlassPane from './ui/GlassPane';
import { mockSectorPerformanceData } from '../data/mockData';
import type { SectorPerformanceItem } from '../types';

const SectorPerformance: React.FC = () => {
    return (
        <GlassPane className="mt-8 p-6" interactiveGlow={true}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Performance by Sector</h2>
            <div className="space-y-4">
                {mockSectorPerformanceData.map((item, index) => {
                    const total = item.gainers + item.losers;
                    const gainerWidth = total > 0 ? (item.gainers / total) * 100 : 0;
                    const loserWidth = total > 0 ? (item.losers / total) * 100 : 0;

                    return (
                        <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            {/* Icon & Name */}
                            <div className="col-span-5 flex items-center space-x-3">
                                <div className="text-gray-500 dark:text-gray-400">{item.icon}</div>
                                <span className="font-medium text-gray-900 dark:text-white text-sm">{item.sector}</span>
                            </div>
                            {/* Bar */}
                            <div className="col-span-5 flex items-center h-4">
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
             <div className="mt-4">
                <button className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm font-medium">
                    See all sectors &rarr;
                </button>
            </div>
        </GlassPane>
    );
};

export default SectorPerformance;