
import React, { useState, useMemo } from 'react';
import GlassPane from '../components/ui/GlassPane';
import { mockWatchlistBasketsData, mockWhyData } from '../data/mockData';
import type { PortfolioBasket, View, WatchlistBasket } from '../types';

interface PortfolioViewProps {
    onNavigateToBasket: (basketName: string, source: View) => void;
    onNavigateToStock: (ticker: string) => void;
    defaultTab?: 'stocks' | 'baskets';
    investments: PortfolioBasket[];
    archivedBaskets: PortfolioBasket[];
    watchlistedBaskets: string[];
    watchlistedStocks: string[];
    onOpenCreateModal: () => void;
}

const InvestedBasketCard: React.FC<{ basket: PortfolioBasket, onClick: () => void }> = ({ basket, onClick }) => {
    const glowClass = basket.isPositive ? '!shadow-glow-green border-green-500/50' : '!shadow-glow-red border-red-500/50';
    return (
        <GlassPane hover className={`p-4 cursor-pointer ${glowClass}`} onClick={onClick}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{basket.name}</h3>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono self-center">
                    Since {basket.investmentDate}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
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


const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigateToBasket, onNavigateToStock, defaultTab, investments, archivedBaskets, watchlistedBaskets, watchlistedStocks, onOpenCreateModal }) => {
    const [activeTab, setActiveTab] = useState<'baskets' | 'stocks'>(defaultTab || 'baskets');
    
    // State for filtering and sorting
    const [investmentsFilter, setInvestmentsFilter] = useState('');
    const [investmentsSort, setInvestmentsSort] = useState('name-asc');
    const [watchlistFilter, setWatchlistFilter] = useState('');

    const tabClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
    const activeTabClasses = "bg-cyan-600/30 text-cyan-100 border border-cyan-500/50";
    const inactiveTabClasses = "text-gray-500 dark:text-gray-400 hover:bg-stone-200 dark:hover:bg-gray-900/50";
    
    const parseValue = (value: string) => parseFloat(value.replace(/[^0-9.-]+/g, ""));

    const sortedAndFilteredInvestments = useMemo(() => {
        return investments
            .filter(b => b.name.toLowerCase().includes(investmentsFilter.toLowerCase()))
            .sort((a, b) => {
                switch (investmentsSort) {
                    case 'invested-desc': return parseValue(b.investedValue) - parseValue(a.investedValue);
                    case 'pl-desc': return parseValue(b.totalReturn) - parseValue(a.totalReturn);
                    case 'name-desc': return b.name.localeCompare(a.name);
                    case 'name-asc':
                    default:
                        return a.name.localeCompare(b.name);
                }
            });
    }, [investments, investmentsFilter, investmentsSort]);

    const filteredWatchlistBaskets = useMemo(() => {
        return watchlistedBaskets
            .map(name => mockWatchlistBasketsData.find(b => b.name === name) || { name, stockCount: 0, changePercent: 'N/A', changePositive: true })
            .filter(b => b.name.toLowerCase().includes(watchlistFilter.toLowerCase()));
    }, [watchlistedBaskets, watchlistFilter]);

    const filteredWatchlistStocks = useMemo(() => {
        return watchlistedStocks
            .map(ticker => ({ ticker, ...mockWhyData[ticker] }))
            .filter(s => s.ticker.toLowerCase().includes(watchlistFilter.toLowerCase()) || s.company.toLowerCase().includes(watchlistFilter.toLowerCase()));
    }, [watchlistedStocks, watchlistFilter]);


    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Portfolio</h1>
                 <button onClick={onOpenCreateModal} className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20">
                    + Create New Basket
                </button>
            </div>
            <div className="space-y-8">
                {/* Investments Section */}
                <GlassPane className="p-6" interactiveGlow>
                    <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Investments</h2>
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                placeholder="Filter by name..."
                                value={investmentsFilter}
                                onChange={e => setInvestmentsFilter(e.target.value)}
                                className="w-40 px-3 py-1 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                            <select
                                value={investmentsSort}
                                onChange={e => setInvestmentsSort(e.target.value)}
                                className="w-40 px-3 py-1 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                                <option value="name-asc">Sort by Name (A-Z)</option>
                                <option value="name-desc">Sort by Name (Z-A)</option>
                                <option value="invested-desc">Sort by Invested (High-Low)</option>
                                <option value="pl-desc">Sort by P&L (High-Low)</option>
                            </select>
                        </div>
                    </div>

                    {sortedAndFilteredInvestments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sortedAndFilteredInvestments.map(basket => (
                                <InvestedBasketCard key={basket.name} basket={basket} onClick={() => onNavigateToBasket(basket.name, 'portfolio')} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No investments found matching your criteria.</p>
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
                     <input 
                        type="text"
                        placeholder="Filter watchlist..."
                        value={watchlistFilter}
                        onChange={e => setWatchlistFilter(e.target.value)}
                        className="w-full mb-4 px-3 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    
                    {activeTab === 'baskets' && (
                         <ul className="space-y-2">
                            {filteredWatchlistBaskets.length > 0 ? filteredWatchlistBaskets.map(basket => (
                                    <li key={basket.name} onClick={() => onNavigateToBasket(basket.name, 'portfolio')} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-black/40 cursor-pointer">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{basket.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{basket.stockCount} Stocks</p>
                                        </div>
                                        <p className={`font-mono font-semibold ${basket.changePositive ? 'text-green-500' : 'text-red-500'}`}>{basket.changePercent}</p>
                                    </li>
                                )) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">No baskets found in your watchlist.</p>}
                         </ul>
                    )}

                    {activeTab === 'stocks' && (
                        <ul className="space-y-2">
                            {filteredWatchlistStocks.length > 0 ? filteredWatchlistStocks.map(stock => {
                                if (!stock) return null;
                                return (
                                    <li key={stock.ticker} onClick={() => onNavigateToStock(stock.ticker)} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-black/40 cursor-pointer">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white font-mono">{stock.ticker}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{stock.company}</p>
                                        </div>
                                        <div className="text-right font-mono">
                                            <p className="font-semibold text-gray-900 dark:text-white">{stock.price}</p>
                                            <p className={`text-sm ${stock.changeColor}`}>{stock.change.split(' ')[1]}</p>
                                        </div>
                                    </li>
                                )
                            }) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">No stocks found in your watchlist.</p>}
                        </ul>
                    )}
                </GlassPane>

                {/* Archived Baskets Section */}
                 <GlassPane className="p-6" interactiveGlow>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Archived Baskets</h2>
                    {archivedBaskets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {archivedBaskets.map(basket => (
                                <GlassPane key={basket.name} hover className="p-3 cursor-pointer !bg-stone-100 dark:!bg-black/30" onClick={() => onNavigateToBasket(basket.name, 'portfolio')}>
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
        </div>
    );
};

export default PortfolioView;
