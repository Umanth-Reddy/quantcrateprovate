import React from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';
import type { BasketStock } from '../types';

interface PerformanceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    basketName: string;
    stocks: BasketStock[];
}

const ChartLegendItem: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</span>
    </div>
);


const PerformanceDetailModal: React.FC<PerformanceDetailModalProps> = ({ isOpen, onClose, basketName, stocks }) => {
    const colors = ['bg-cyan-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
    const basketColor = 'bg-orange-500';

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-6 max-h-[80vh] overflow-y-auto max-w-4xl w-full">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-8">
                        Performance Details: {basketName}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {/* Placeholder for date range selectors etc */}
                 <div className="my-4 p-2 bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20 text-center text-sm text-gray-500 dark:text-gray-400">
                    [Date Range Selectors Placeholder]
                </div>


                <div className="h-96 bg-stone-50 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20 flex items-center justify-center p-4">
                    {/* Static SVG Placeholder */}
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <path d="M 0 80 Q 25 20, 50 60 T 100 70 T 150 40 T 200 50" stroke="#f97316" fill="none" strokeWidth="1" strokeDasharray="2 1" />
                        <path d="M 0 50 Q 25 60, 50 40 T 100 30 T 150 70 T 200 60" stroke="#06b6d4" fill="none" strokeWidth="1" />
                        <path d="M 0 30 Q 25 40, 50 20 T 100 50 T 150 30 T 200 20" stroke="#8b5cf6" fill="none" strokeWidth="1" />
                    </svg>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="p-3 bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Basket CAGR</p>
                        <p className="text-xl font-bold font-mono text-green-500">22.5%</p>
                    </div>
                    <div className="p-3 bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Avg. Volatility</p>
                        <p className="text-xl font-bold font-mono text-gray-900 dark:text-white">18.2%</p>
                    </div>
                    <div className="p-3 bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Max Drawdown</p>
                        <p className="text-xl font-bold font-mono text-red-500">-12.8%</p>
                    </div>
                    <div className="p-3 bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Beta</p>
                        <p className="text-xl font-bold font-mono text-gray-900 dark:text-white">0.85</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
                    <ChartLegendItem name="Overall Basket" color={basketColor} />
                    {stocks.map((stock, index) => (
                        <ChartLegendItem key={stock.ticker} name={stock.ticker} color={colors[index % colors.length]} />
                    ))}
                </div>

            </GlassPane>
        </Modal>
    );
};

export default PerformanceDetailModal;
