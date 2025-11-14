
import React from 'react';
import GlassPane from '../components/ui/GlassPane';
import type { Basket } from '../types';

interface BasketViewProps {
    basketName: string;
    basketData: Basket;
    onNavigateToStock: (ticker: string) => void;
    onBack: () => void;
}

const BasketView: React.FC<BasketViewProps> = ({ basketName, basketData, onNavigateToStock, onBack }) => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
            {basketData.alert && (
                <div className="bg-yellow-500/80 backdrop-blur-sm border border-yellow-300/50 text-black text-sm font-medium p-2 rounded-lg mb-4 overflow-hidden whitespace-nowrap">
                    <span className="inline-block animate-marquee-slow">{basketData.alert}</span>
                </div>
            )}
            <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back to Dashboard</button>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Basket: {basketName}</h1>
            </div>

            <GlassPane className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-cyan-400/20">
                    <thead className="bg-gray-50 dark:bg-black/40">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticker</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Signal Summary</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-cyan-400/20">
                        {basketData.stocks.map(stock => (
                            <tr key={stock.ticker} className="hover:bg-gray-50 dark:hover:bg-black/40">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white font-mono">{stock.ticker}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{stock.summary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onNavigateToStock(stock.ticker)} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300">See 'Why'</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassPane>
        </div>
    );
};

export default BasketView;
