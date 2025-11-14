
import React from 'react';
import GlassPane from './ui/GlassPane';
import Sparkline from './ui/Sparkline';
import { mockMarketMoversData } from '../data/mockData';
import type { MarketMoverItem } from '../types';

const MarketMoversTable: React.FC = () => {
    return (
        <GlassPane className="mt-8 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Top Market Movers</h2>
            <div className="flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase border-b border-stone-200 dark:border-purple-400/20 pb-2 mb-2">
                    <div className="col-span-4">Company</div>
                    <div className="col-span-4 text-center">Market Price (1D)</div>
                    <div className="col-span-4 text-right">Volume</div>
                </div>

                {/* Table Body */}
                <div className="space-y-2">
                    {mockMarketMoversData.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-gray-900/50">
                            {/* Company */}
                            <div className="col-span-4 flex items-center space-x-3">
                                <img src={item.logo} alt={`${item.company} logo`} className="h-8 w-8 object-contain rounded-full bg-white p-1 border border-stone-200 dark:border-gray-700" />
                                <span className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.company}</span>
                            </div>
                            {/* Market Price & Sparkline */}
                            <div className="col-span-4 flex items-center justify-between">
                                <div className="w-24">
                                     <Sparkline color={item.changePositive ? 'green' : 'red'} data={item.sparkline} />
                                </div>
                                <div className="text-right font-mono text-sm">
                                    <div className="font-semibold text-gray-900 dark:text-white">{item.price}</div>
                                    <div className={item.changePositive ? 'text-green-500' : 'text-red-500'}>
                                        {item.change} ({item.changePercent})
                                    </div>
                                </div>
                            </div>
                            {/* Volume */}
                            <div className="col-span-4 text-right font-mono text-sm font-semibold text-gray-900 dark:text-white">
                                {item.volume}
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-4">
                    <button className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm font-medium">
                        See more &rarr;
                    </button>
                </div>
            </div>
        </GlassPane>
    );
};

export default MarketMoversTable;