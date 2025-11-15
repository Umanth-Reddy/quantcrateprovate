import React from 'react';
import GlassPane from '../components/ui/GlassPane';
import type { StockDetails, View } from '../types';
import AIScoreDetails from '../components/AIScoreDetails';
import FundamentalsTable from '../components/FundamentalsTable';

interface StockTerminalViewProps {
    ticker: string;
    details: StockDetails;
    onBack: () => void;
    onNavigateToBasket: (basketName: string, source: View) => void;
    onNavigateToStock: (ticker: string) => void;
    isWatchlisted: boolean;
    onToggleWatchlist: (ticker: string) => void;
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

const StockTerminalView: React.FC<StockTerminalViewProps> = ({ ticker, details, onBack, onNavigateToBasket, onNavigateToStock, isWatchlisted, onToggleWatchlist }) => {
    
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back</button>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-mono">{ticker}</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">{details.company}</p>
                    </div>
                    <WatchlistButton isWatchlisted={isWatchlisted} onClick={() => onToggleWatchlist(ticker)} />
                </div>
                <div className="text-right font-mono">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{details.price}</p>
                    <p className={`text-lg font-medium ${details.changeColor}`}>{details.change}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <GlassPane className="p-4 h-96 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500 text-lg">[Interactive TradingView Chart Placeholder]</span>
                    </GlassPane>
                    <GlassPane className="p-6">
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">In Baskets</h3>
                        <div className="flex flex-wrap gap-3">
                            {details.inBaskets.map(basketName => (
                                <button key={basketName} onClick={() => onNavigateToBasket(basketName, 'stock-terminal')} className="bg-stone-200 dark:bg-gray-700/50 text-cyan-700 dark:text-cyan-300 text-sm font-medium px-3 py-1 rounded-full hover:bg-stone-300 dark:hover:bg-gray-700 transition-colors border border-stone-300 dark:border-purple-400/20">
                                    {basketName}
                                </button>
                            ))}
                        </div>
                    </GlassPane>
                     <GlassPane className="p-6">
                        <FundamentalsTable fundamentals={details.fundamentals} />
                    </GlassPane>
                </div>
                <div className="space-y-6">
                    <GlassPane className="p-6">
                        <AIScoreDetails aiScore={details.aiScore} />
                    </GlassPane>
                     <GlassPane className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Signal Checklist</h3>
                        <ul className="space-y-0">
                            {details.checklist.map((item, idx) => {
                                const passClass = item.pass ? 'text-green-500' : 'text-red-500';
                                const icon = item.pass
                                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
                                return (
                                    <li key={idx} className={`flex items-center text-sm ${passClass} border-b border-stone-200 dark:border-purple-400/20 last:border-b-0 pb-2 mb-2`}>
                                        {icon}
                                        <span className="flex-grow"><span className="font-medium">{item.rule}:</span> <span className="font-mono">{item.details}</span></span>
                                    </li>
                                );
                            })}
                        </ul>
                    </GlassPane>
                </div>
            </div>
        </div>
    );
};

export default StockTerminalView;