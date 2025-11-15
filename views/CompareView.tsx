
import React, { useState, useMemo } from 'react';
import GlassPane from '../components/ui/GlassPane';
import { mockWhyData } from '../data/mockData';
import type { StockDetails, Fundamental } from '../types';

interface CompareViewProps {
    onBack: () => void;
    onNavigateToStock: (ticker: string) => void;
}

const allStocksData: (StockDetails & { ticker: string })[] = Object.entries(mockWhyData).map(([ticker, details]) => ({
    ticker,
    ...details
}));

const CompareView: React.FC<CompareViewProps> = ({ onBack, onNavigateToStock }) => {
    const [selectedTickers, setSelectedTickers] = useState<string[]>(['MSFT', 'AAPL', 'NVDA']);
    const [searchTerm, setSearchTerm] = useState('');

    const addStock = (ticker: string) => {
        if (!selectedTickers.includes(ticker)) {
            setSelectedTickers([...selectedTickers, ticker]);
        }
        setSearchTerm('');
    };

    const removeStock = (ticker: string) => {
        setSelectedTickers(selectedTickers.filter(t => t !== ticker));
    };

    const filteredStocks = useMemo(() => {
        if (!searchTerm) return [];
        return allStocksData.filter(stock =>
            (stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !selectedTickers.includes(stock.ticker)
        ).slice(0, 5); // Limit results for performance
    }, [searchTerm, selectedTickers]);
    
    const comparisonData = useMemo(() => {
        return selectedTickers.map(ticker => ({ ticker, ...mockWhyData[ticker] }));
    }, [selectedTickers]);

    const allFundamentalLabels = useMemo(() => {
        const labels = new Set<string>();
        comparisonData.forEach(stock => {
            stock.fundamentals.forEach(f => labels.add(f.label));
        });
        return Array.from(labels);
    }, [comparisonData]);

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back to Dashboard</button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Compare Stocks</h1>
                
                <GlassPane className="p-6 mb-6">
                    <label htmlFor="stock-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add stocks to comparison</label>
                    <div className="relative">
                        <input
                            id="stock-search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Ticker or Company..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100"
                        />
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        {filteredStocks.length > 0 && (
                            <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-stone-200 dark:border-purple-400/20 z-10">
                                {filteredStocks.map(stock => (
                                    <button key={stock.ticker} onClick={() => addStock(stock.ticker)} className="w-full text-left p-2 hover:bg-stone-100 dark:hover:bg-gray-800">
                                        <span className="font-mono font-bold">{stock.ticker}</span> - <span className="text-sm text-gray-500">{stock.company}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                     <div className="flex flex-wrap gap-2 mt-4">
                        {selectedTickers.map(ticker => (
                            <div key={ticker} className="flex items-center gap-2 px-2 py-1 bg-cyan-100 dark:bg-black/50 rounded-full border border-cyan-300 dark:border-cyan-500/30">
                                <span className="font-mono font-medium text-sm text-cyan-800 dark:text-cyan-200">{ticker}</span>
                                <button onClick={() => removeStock(ticker)} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200">
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </GlassPane>
                
                {comparisonData.length > 0 ? (
                <GlassPane>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-stone-50 dark:bg-black/30">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Metric</th>
                                    {comparisonData.map(stock => (
                                        <th key={stock.ticker} className="p-4 font-semibold text-center text-gray-900 dark:text-white">
                                            <button onClick={() => onNavigateToStock(stock.ticker)} className="font-mono text-lg hover:text-cyan-500">{stock.ticker}</button>
                                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400 truncate max-w-[150px] mx-auto">{stock.company}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-stone-200 dark:border-purple-400/20">
                                    <td className="p-4 font-medium text-gray-800 dark:text-gray-100">Price</td>
                                    {comparisonData.map(stock => (
                                        <td key={stock.ticker} className="p-4 font-mono font-bold text-center text-gray-900 dark:text-white">{stock.price}</td>
                                    ))}
                                </tr>
                                 <tr className="border-b border-stone-200 dark:border-purple-400/20">
                                    <td className="p-4 font-medium text-gray-800 dark:text-gray-100">Change</td>
                                    {comparisonData.map(stock => (
                                        <td key={stock.ticker} className={`p-4 font-mono font-semibold text-center ${stock.changeColor}`}>{stock.change.split(' ')[0]} ({stock.change.split(' ')[1]})</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-stone-200 dark:border-purple-400/20">
                                    <td className="p-4 font-medium text-gray-800 dark:text-gray-100">AI Score</td>
                                    {comparisonData.map(stock => (
                                        <td key={stock.ticker} className={`p-4 font-mono font-bold text-center ${stock.aiScore.color}`}>
                                            {stock.aiScore.score} <span className="text-xs">({stock.aiScore.label})</span>
                                        </td>
                                    ))}
                                </tr>
                                {allFundamentalLabels.map(label => (
                                    <tr key={label} className="border-b border-stone-200 dark:border-purple-400/20 last:border-0">
                                        <td className="p-4 font-medium text-gray-500 dark:text-gray-400">{label}</td>
                                        {comparisonData.map(stock => {
                                            const fundamental = stock.fundamentals.find(f => f.label === label);
                                            return <td key={stock.ticker} className="p-4 font-mono text-center text-gray-800 dark:text-gray-200">{fundamental?.value || 'N/A'}</td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassPane>
                ) : (
                    <div className="text-center py-16">
                         <p className="text-gray-500 dark:text-gray-400">Search for and add stocks to begin your comparison.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareView;
