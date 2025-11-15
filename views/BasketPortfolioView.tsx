
import React, { useState, useMemo, useRef, useEffect } from 'react';
import GlassPane from '../components/ui/GlassPane';
import AIScoreDetails from '../components/AIScoreDetails';
import FundamentalsTable from '../components/FundamentalsTable';
import ComparisonChart from '../components/ComparisonChart';
import InvestSellPanel from '../components/InvestSellPanel';
import { mockWhyData } from '../data/mockData';
import type { Basket, StockDetails, BasketStock, AIScore, PerformanceMetrics, View } from '../types';

interface BasketPortfolioViewProps {
    basketName: string;
    basketData: Basket;
    onBack: () => void;
    isInvested: boolean;
    investmentDate?: string;
    onInvest: (basketName: string) => void;
    onSell: (basketName: string) => void;
    isWatchlisted: boolean;
    onToggleWatchlist: (basketName: string) => void;
    onOpenEditModal: () => void;
    onOpenPerfDetailModal: () => void;
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

const EditHistoryTooltip: React.FC<{ currentStocks: BasketStock[]; originalStocks: BasketStock[] }> = ({ currentStocks, originalStocks }) => {
    const currentTickers = new Set(currentStocks.map(s => s.ticker));
    const originalTickers = new Set(originalStocks.map(s => s.ticker));

    const added = [...currentTickers].filter(t => !originalTickers.has(t));
    const removed = [...originalTickers].filter(t => !currentTickers.has(t));

    return (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-stone-200 dark:border-purple-400/20 z-10 p-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Basket Edit History</h4>
            {added.length > 0 && (
                <div className="mb-2">
                    <p className="font-semibold text-green-600 dark:text-green-400">Added:</p>
                    <p className="text-gray-600 dark:text-gray-300 font-mono">{added.join(', ')}</p>
                </div>
            )}
            {removed.length > 0 && (
                <div>
                    <p className="font-semibold text-red-600 dark:text-red-400">Removed:</p>
                    <p className="text-gray-600 dark:text-gray-300 font-mono">{removed.join(', ')}</p>
                </div>
            )}
             {added.length === 0 && removed.length === 0 && (
                 <p className="text-gray-500 dark:text-gray-400">Stocks have been reordered.</p>
             )}
        </div>
    );
};

const PerformanceMetricsSummary: React.FC<{ metrics: PerformanceMetrics; investmentDate?: string }> = ({ metrics, investmentDate }) => (
    <GlassPane className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">Total Return</span>
                 <p className="text-2xl font-bold text-green-500 font-mono">{metrics.totalReturn}</p>
                 <span className="text-xs text-gray-400 dark:text-gray-500">{investmentDate ? `Since ${investmentDate}` : 'YTD'}</span>
            </div>
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">Volatility</span>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{metrics.volatility}</p>
                 <span className="text-xs text-gray-400 dark:text-gray-500">Annualized</span>
            </div>
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">Sharpe Ratio</span>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{metrics.sharpeRatio}</p>
                 <span className="text-xs text-gray-400 dark:text-gray-500">Risk-Adjusted</span>
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


const BasketPortfolioView: React.FC<BasketPortfolioViewProps> = ({ basketName, basketData, onBack, isInvested, investmentDate, onInvest, onSell, isWatchlisted, onToggleWatchlist, onOpenEditModal, onOpenPerfDetailModal }) => {
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    
    // Reset view when basket changes
    useEffect(() => {
        setSelectedTicker(null);
    }, [basketName]);

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

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back</button>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{basketName}</h1>
                        {isInvested && investmentDate && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
                                Invested on: {new Date(investmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                    </div>
                    <WatchlistButton isWatchlisted={isWatchlisted} onClick={() => onToggleWatchlist(basketName)} />
                    {isInvested && (
                        <button onClick={onOpenEditModal} className="text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors" aria-label="Edit basket">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    )}
                </div>
                 <div className="flex items-center space-x-3">
                    {basketData.isEdited && basketData.originalStocks && (
                        <div className="relative group">
                            <div className="px-3 py-1 text-xs font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 rounded-full border border-yellow-300 dark:border-yellow-600 flex items-center space-x-1 cursor-pointer">
                                <span>Edited</span>
                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                            <EditHistoryTooltip currentStocks={basketData.stocks} originalStocks={basketData.originalStocks} />
                        </div>
                    )}
                    {isInvested && (
                        <div className="px-3 py-1 text-sm font-bold text-green-700 dark:text-green-300 bg-green-200 dark:bg-green-900/50 rounded-full border border-green-300 dark:border-green-600">
                            Invested
                        </div>
                    )}
                </div>
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
                            {basketData.stocks.map((stock, index) => (
                                <li 
                                    key={stock.ticker} 
                                    onClick={() => setSelectedTicker(stock.ticker)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedTicker === stock.ticker ? 'bg-cyan-600/30 text-cyan-100 border border-cyan-500/50' : 'hover:bg-stone-100 dark:hover:bg-black/40'}`}
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
                            <PerformanceMetricsSummary metrics={basketData.performanceMetrics} investmentDate={investmentDate} />
                            <StockAllocationTable stocks={basketData.stocks} />
                             <ComparisonChart stocks={basketData.stocks} onOpenDetailView={onOpenPerfDetailModal} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BasketPortfolioView;
