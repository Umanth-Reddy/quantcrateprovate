import React, { useState } from 'react';
import GlassPane from '../components/ui/GlassPane';
import { mockInvestedBasketsData, mockWatchlistBasketsData, mockWhyData } from '../data/mockData';
import type { PortfolioBasket, WatchlistBasket } from '../types';

interface PortfolioViewProps {
    onNavigateToBasket: (basketName: string) => void;
    onNavigateToStock: (ticker: string) => void;
    defaultTab?: 'stocks' | 'baskets';
}

const InvestedBasketCard: React.FC<{ basket: PortfolioBasket, onClick: () => void }> = ({ basket, onClick }) => {
    const glowClass = basket.isPositive ? '!shadow-glow-green border-green-500/50' : '!shadow-glow-red border-red-500/50';
    return (
        <GlassPane hover className={`p-4 cursor-pointer ${glowClass}`} onClick={onClick}>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{basket.name}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 font-mono text-sm">
                <div className="text-gray-500 dark:text-gray-400">Invested</div>
                <div className="text-right text-gray-900 dark:text-white">{basket.investedValue}</div>
                <div className="text-gray-500 dark:text-gray-400">Current</div>
                <div className="text-right text-gray-900 dark:text-white">{basket.currentValue}</div>
                <div className="text-gray-500 dark:text-gray-400">P&L</div>
                <div className={`text-right font-semibold ${basket.isPositive ? 'text-green-500' : 'text-red-500'}`}>{basket.totalReturn} ({basket.totalReturnPercent})</div>
            </div>
        </GlassPane>
    );
};

const CreateBasket: React.FC = () => {
    return (
        <GlassPane className="p-6 h-full sticky top-8" interactiveGlow>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create a New Basket</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="basket-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Basket Name</label>
                    <input type="text" id="basket-name" placeholder="e.g., 'My Growth Stocks'" className="mt-1 block w-full pl-3 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                     <label htmlFor="add-stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Add Stock</label>
                    <div className="relative mt-1">
                        <input type="text" id="add-stock" placeholder="Search Ticker (e.g., AAPL)" className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="h-48 bg-stone-100 dark:bg-black/30 rounded-lg border border-dashed border-stone-300 dark:border-cyan-400/30 flex items-center justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your selected stocks will appear here.</p>
                </div>
                 <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20">
                    Create Basket
                </button>
            </div>
        </GlassPane>
    )
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigateToBasket, onNavigateToStock, defaultTab }) => {
    const [activeTab, setActiveTab] = useState<'baskets' | 'stocks'>(defaultTab || 'baskets');
    const tabClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
    const activeTabClasses = "bg-cyan-600/30 text-cyan-100 border border-cyan-500/50";
    const inactiveTabClasses = "text-gray-500 dark:text-gray-400 hover:bg-stone-200 dark:hover:bg-gray-900/50";

    return (
        <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Portfolio</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* Investments Section */}
                    <GlassPane className="p-6" interactiveGlow>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Investments</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockInvestedBasketsData.map(basket => (
                                <InvestedBasketCard key={basket.name} basket={basket} onClick={() => onNavigateToBasket(basket.name)} />
                            ))}
                        </div>
                    </GlassPane>
                    
                    {/* Watchlist Section */}
                    <GlassPane className="p-6" interactiveGlow>
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Watchlist</h2>
                             <div className="flex items-center space-x-2 p-1 bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                                <button onClick={() => setActiveTab('baskets')} className={`${tabClasses} ${activeTab === 'baskets' ? activeTabClasses : inactiveTabClasses}`}>Baskets</button>
                                <button onClick={() => setActiveTab('stocks')} className={`${tabClasses} ${activeTab === 'stocks' ? activeTabClasses : inactiveTabClasses}`}>Stocks</button>
                             </div>
                        </div>
                        
                        {activeTab === 'baskets' && (
                             <ul className="space-y-2">
                                {mockWatchlistBasketsData.map(basket => (
                                    <li key={basket.name} onClick={() => onNavigateToBasket(basket.name)} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-black/40 cursor-pointer">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{basket.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{basket.stockCount} Stocks</p>
                                        </div>
                                        <p className={`font-mono font-semibold ${basket.changePositive ? 'text-green-500' : 'text-red-500'}`}>{basket.changePercent}</p>
                                    </li>
                                ))}
                             </ul>
                        )}

                        {activeTab === 'stocks' && (
                            <ul className="space-y-2">
                                {['AAPL', 'TSLA', 'MSFT'].map(ticker => {
                                    const stock = mockWhyData[ticker];
                                    return (
                                        <li key={ticker} onClick={() => onNavigateToStock(ticker)} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-black/40 cursor-pointer">
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white font-mono">{ticker}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{stock.company}</p>
                                            </div>
                                            <div className="text-right font-mono">
                                                <p className="font-semibold text-gray-900 dark:text-white">{stock.price}</p>
                                                <p className={`text-sm ${stock.changeColor}`}>{stock.change.split(' ')[1]}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </GlassPane>
                </div>
                
                {/* Create Basket Section */}
                <div className="lg:col-span-1">
                    <CreateBasket />
                </div>
            </div>
        </div>
    );
};

export default PortfolioView;