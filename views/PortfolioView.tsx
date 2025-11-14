
import React, { useState } from 'react';
import GlassPane from '../components/ui/GlassPane';
import { mockWatchlistBasketsData, mockWhyData } from '../data/mockData';
import type { PortfolioBasket } from '../types';
import CreateEditBasket from '../components/CreateEditBasket';

interface PortfolioViewProps {
    onNavigateToBasket: (basketName: string) => void;
    onNavigateToStock: (ticker: string) => void;
    defaultTab?: 'stocks' | 'baskets';
    investments: PortfolioBasket[];
    archivedBaskets: PortfolioBasket[];
    watchlistedBaskets: string[];
    watchlistedStocks: string[];
    onSaveCustomBasket: (basketName: string, stocks: string[]) => void;
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


const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigateToBasket, onNavigateToStock, defaultTab, investments, archivedBaskets, watchlistedBaskets, watchlistedStocks, onSaveCustomBasket }) => {
    const [activeTab, setActiveTab] = useState<'baskets' | 'stocks'>(defaultTab || 'baskets');
    const tabClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
    const activeTabClasses = "bg-cyan-600/30 text-cyan-100 border border-cyan-500/50";
    const inactiveTabClasses = "text-gray-500 dark:text-gray-400 hover:bg-stone-200 dark:hover:bg-gray-900/50";

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Portfolio</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* Investments Section */}
                    <GlassPane className="p-6" interactiveGlow>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Investments</h2>
                        {investments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {investments.map(basket => (
                                    <InvestedBasketCard key={basket.name} basket={basket} onClick={() => onNavigateToBasket(basket.name)} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400">You haven't invested in any baskets yet.</p>
                            </div>
                        )}
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
                                {watchlistedBaskets.length > 0 ? watchlistedBaskets.map(basketName => {
                                    const basket = mockWatchlistBasketsData.find(b => b.name === basketName) || { name: basketName, stockCount: 0, changePercent: 'N/A', changePositive: true };
                                    return (
                                        <li key={basket.name} onClick={() => onNavigateToBasket(basket.name)} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-black/40 cursor-pointer">
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">{basket.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{basket.stockCount} Stocks</p>
                                            </div>
                                            <p className={`font-mono font-semibold ${basket.changePositive ? 'text-green-500' : 'text-red-500'}`}>{basket.changePercent}</p>
                                        </li>
                                    )
                                }) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">Your basket watchlist is empty.</p>}
                             </ul>
                        )}

                        {activeTab === 'stocks' && (
                            <ul className="space-y-2">
                                {watchlistedStocks.length > 0 ? watchlistedStocks.map(ticker => {
                                    const stock = mockWhyData[ticker];
                                    if (!stock) return null;
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
                                }) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">Your stock watchlist is empty.</p>}
                            </ul>
                        )}
                    </GlassPane>

                    {/* Archived Baskets Section */}
                     <GlassPane className="p-6" interactiveGlow>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Archived Baskets</h2>
                        {archivedBaskets.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {archivedBaskets.map(basket => (
                                    <GlassPane key={basket.name} hover className="p-3 cursor-pointer !bg-stone-100 dark:!bg-black/30" onClick={() => onNavigateToBasket(basket.name)}>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">{basket.name}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">View performance history</p>
                                    </GlassPane>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400">You have no archived baskets.</p>
                            </div>
                        )}
                    </GlassPane>

                </div>
                
                {/* Create Basket Section */}
                <div className="lg:col-span-1">
                    <CreateEditBasket onSaveBasket={onSaveCustomBasket} />
                </div>
            </div>
        </div>
    );
};

export default PortfolioView;
