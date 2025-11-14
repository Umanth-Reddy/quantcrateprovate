
import React, { useState, useMemo, useRef, useEffect } from 'react';
import GlassPane from '../components/ui/GlassPane';
import AIScoreDetails from '../components/AIScoreDetails';
import FundamentalsTable from '../components/FundamentalsTable';
import ComparisonChart from '../components/ComparisonChart';
import InvestSellPanel from '../components/InvestSellPanel';
import { mockWhyData } from '../data/mockData';
import type { Basket, StockDetails, BasketStock, AIScore, PerformanceMetrics } from '../types';

interface BasketPortfolioViewProps {
    basketName: string;
    basketData: Basket;
    onBack: () => void;
    isInvested: boolean;
    onInvest: (basketName: string) => void;
    onSell: (basketName: string) => void;
    isWatchlisted: boolean;
    onToggleWatchlist: (basketName: string) => void;
}

const WatchlistButton: React.FC<{isWatchlisted: boolean; onClick: () => void}> = ({ isWatchlisted, onClick }) => (
    <button 
        onClick={onClick}
        className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all active:scale-125"
        aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isWatchlisted ? 'text-yellow-500 dark:text-yellow-400' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    </button>
);


const PerformanceMetricsSummary: React.FC<{ metrics: PerformanceMetrics }> = ({ metrics }) => (
    <GlassPane className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">Total Return (YTD)</span>
                <p className="text-2xl font-bold text-green-500 font-mono">{metrics.totalReturn}</p>
            </div>
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">Volatility</span>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{metrics.volatility}</p>
            </div>
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">Sharpe Ratio</span>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{metrics.sharpeRatio}</p>
            </div>
        </div>
    </GlassPane>
);


const StockAllocationTable: React.FC<{ stocks: BasketStock[] }> = ({ stocks }) => (
    <GlassPane className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stock Allocation</h3>
        <div className="space-y-4">
            {stocks.map(stock => (
                <div key={stock.ticker}>
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900 dark:text-white font-mono">{stock.ticker}</span>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{stock.weight}%</span>
                            <span className="font-medium text-gray-900 dark:text-white font-mono">{stock.value}</span>
                        </div>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-gray-700/50 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${stock.weight}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </GlassPane>
);


const BasketPortfolioView: React.FC<BasketPortfolioViewProps> = ({ basketName, basketData, onBack, isInvested, onInvest, onSell, isWatchlisted, onToggleWatchlist }) => {
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [orderedStocks, setOrderedStocks] = useState<BasketStock[]>(basketData.stocks);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    // Reset view when basket changes
    useEffect(() => {
        setSelectedTicker(null);
        setOrderedStocks(basketData.stocks);
    }, [basketName, basketData.stocks]);

    const selectedStockDetails = useMemo(() => {
        return selectedTicker ? mockWhyData[selectedTicker] : null;
    }, [selectedTicker]);

    const aiAnalysisData = useMemo(() => {
        if (selectedTicker && selectedStockDetails) {
            return {
                title: `${selectedTicker} Analysis`,
                summary: `AI analysis for ${selectedStockDetails.company}.`,
                aiScore: selectedStockDetails.aiScore
            };
        }
        return {
            title: 'Basket AI Overview',
            summary: basketData.summary,
            aiScore: basketData.aiScore
        };
    }, [selectedTicker, selectedStockDetails, basketData]);

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, position: number) => {
        dragItem.current = position;
        e.currentTarget.classList.add('opacity-50', 'bg-stone-200', 'dark:bg-gray-900');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, position: number) => {
        dragOverItem.current = position;
        e.currentTarget.classList.add('bg-stone-200', 'dark:bg-gray-900');
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
        e.currentTarget.classList.remove('bg-stone-200', 'dark:bg-gray-900');
    };
    
    const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
        e.currentTarget.classList.remove('opacity-50', 'bg-stone-200', 'dark:bg-gray-900');
        dragItem.current = null;
        dragOverItem.current = null;
    };

    const handleDrop = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;

        const newStockList = [...orderedStocks];
        const dragItemContent = newStockList[dragItem.current];
        newStockList.splice(dragItem.current, 1);
        newStockList.splice(dragOverItem.current, 0, dragItemContent);
        
        // Recalculate weights based on original weights in new order
        const originalWeights = basketData.stocks.map(s => s.weight).sort((a, b) => b - a);
        const reweightedList = newStockList.map((stock, index) => ({
            ...stock,
            weight: originalWeights[index]
        }));
        
        setOrderedStocks(reweightedList);
    };

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back to Dashboard</button>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{basketName}</h1>
                    <WatchlistButton isWatchlisted={isWatchlisted} onClick={() => onToggleWatchlist(basketName)} />
                </div>
                {isInvested && (
                    <div className="px-3 py-1 text-sm font-bold text-green-700 dark:text-green-300 bg-green-200 dark:bg-green-900/50 rounded-full border border-green-300 dark:border-green-600">
                        Invested
                    </div>
                )}
            </div>
            {basketData.alert && (
                <GlassPane className="p-4 mb-6 bg-yellow-100 dark:bg-yellow-900/50 border-yellow-300 dark:border-yellow-600">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">{basketData.alert}</p>
                </GlassPane>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <GlassPane className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stocks in Basket</h3>
                        <ul className="space-y-2">
                            <li 
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${!selectedTicker ? 'bg-cyan-600/30 text-cyan-100 border border-cyan-500/50' : 'hover:bg-stone-100 dark:hover:bg-black/40'}`}
                                onClick={() => setSelectedTicker(null)}
                            >
                                <p className="font-semibold">Overall Basket Performance</p>
                                <p className="text-sm opacity-80">View the entire portfolio</p>
                            </li>
                            {orderedStocks.map((stock, index) => (
                                <li 
                                    key={stock.ticker} 
                                    onClick={() => setSelectedTicker(stock.ticker)}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragEnter={(e) => handleDragEnter(e, index)}
                                    onDragLeave={handleDragLeave}
                                    onDragEnd={handleDragEnd}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={`p-3 rounded-lg cursor-grab active:cursor-grabbing transition-colors ${selectedTicker === stock.ticker ? 'bg-cyan-600/30 text-cyan-100 border border-cyan-500/50' : 'hover:bg-stone-100 dark:hover:bg-black/40'}`}
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-semibold font-mono">{stock.ticker}</p>
                                            <p className="text-sm opacity-80">{stock.summary}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold font-mono">{stock.weight}%</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </GlassPane>
                     <GlassPane className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{aiAnalysisData.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{aiAnalysisData.summary}</p>
                        <AIScoreDetails aiScore={aiAnalysisData.aiScore} />
                    </GlassPane>
                    <InvestSellPanel basketName={basketName} isInvested={isInvested} onInvest={onInvest} onSell={onSell} />
                </div>

                {/* Right Content */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedTicker && selectedStockDetails ? (
                        <>
                            <GlassPane className="p-4 h-96 flex items-center justify-center">
                                <span className="text-gray-400 dark:text-gray-500 text-lg">[Interactive TradingView Chart for {selectedTicker}]</span>
                            </GlassPane>
                            <GlassPane className="p-6">
                                <FundamentalsTable fundamentals={selectedStockDetails.fundamentals} />
                            </GlassPane>
                        </>
                    ) : (
                         <>
                            <GlassPane className="p-4 h-96 flex items-center justify-center">
                                <span className="text-gray-400 dark:text-gray-500 text-lg">[Overall Portfolio Graph Placeholder]</span>
                            </GlassPane>
                            <PerformanceMetricsSummary metrics={basketData.performanceMetrics} />
                            <StockAllocationTable stocks={orderedStocks} />
                             <ComparisonChart stocks={orderedStocks} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BasketPortfolioView;
