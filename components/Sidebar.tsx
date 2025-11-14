import React, { useState } from 'react';
import GlassPane from './ui/GlassPane';
import Sparkline from './ui/Sparkline';
import { mockWatchlistBasketsData, mockNewsData, mockWhyData } from '../data/mockData';
import type { NewsItem } from '../types';

interface SidebarProps {
    onNavigateToStock: (ticker: string) => void;
    onNavigateToPortfolio: (defaultTab: 'stocks' | 'baskets') => void;
    onNavigateToBasket: (basketName: string) => void;
    onOpenNewsModal: (newsItem: NewsItem) => void;
    watchlistedStocks: string[];
    watchlistedBaskets: string[];
}

const AISignalCard: React.FC<{ onNavigateToStock: (ticker: string) => void }> = ({ onNavigateToStock }) => (
    <GlassPane hover={true} className="p-6 cursor-pointer" onClick={() => onNavigateToStock('NVDA')}>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Signal of the Day</h3>
        <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-gray-200 dark:text-gray-700/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                    <path className="text-green-500" strokeWidth="3" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white font-mono">85</span>
                    <span className="text-md font-medium text-green-500">Buy</span>
                </div>
            </div>
            <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white font-mono">NVDA</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Strong momentum signal detected. Trend, Momentum, and Volume all positive.</p>
            </div>
        </div>
    </GlassPane>
);

const Watchlist: React.FC<{ 
    onNavigateToStock: (ticker: string) => void; 
    onNavigateToPortfolio: (defaultTab: 'stocks' | 'baskets') => void; 
    onNavigateToBasket: (basketName: string) => void;
    watchlistedStocks: string[];
    watchlistedBaskets: string[];
}> = ({ onNavigateToStock, onNavigateToPortfolio, onNavigateToBasket, watchlistedStocks, watchlistedBaskets }) => {
    const [selectedView, setSelectedView] = useState<'stocks' | 'baskets'>('stocks');
    const [isOpen, setIsOpen] = useState(false);

    const views = {
        stocks: 'Stocks',
        baskets: 'Baskets'
    };

    const handleSelect = (view: 'stocks' | 'baskets') => {
        setSelectedView(view);
        setIsOpen(false);
    };

    return (
        <GlassPane className="p-6">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => onNavigateToPortfolio(selectedView)} className="w-full text-left">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">My Watchlist &rarr;</h3>
                </button>
                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-2 rounded-lg bg-stone-100 dark:bg-black/30 border border-stone-200 dark:border-purple-400/20">
                        <span>{views[selectedView]}</span>
                         <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-stone-200 dark:border-purple-400/20 z-10">
                            <button onClick={() => handleSelect('stocks')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800">Stocks</button>
                            <button onClick={() => handleSelect('baskets')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800">Baskets</button>
                        </div>
                    )}
                </div>
            </div>
            
            {selectedView === 'stocks' && (
                 <div className="space-y-2">
                     {watchlistedStocks.length > 0 ? watchlistedStocks.map(ticker => {
                        const stock = mockWhyData[ticker];
                        const isPositive = stock.change.startsWith('+');
                        return (
                            <div key={ticker} onClick={() => onNavigateToStock(ticker)} className="grid grid-cols-3 items-center p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-gray-900/50 cursor-pointer">
                                <div><span className="font-medium text-gray-900 dark:text-white font-mono">{ticker}</span><span className="block text-xs text-gray-500 dark:text-gray-400">{stock.company}</span></div>
                                <Sparkline color={isPositive ? "green" : "red"} data={isPositive ? "M0 15L10 12L20 14L30 10L40 12L50 18L60 15L70 12L80 10L90 14L100 12" : "M0 10L10 15L20 12L30 18L40 20L50 15L60 18L70 22L80 25L90 20L100 22"} />
                                <div className="text-right">
                                    <span className={`font-medium ${stock.changeColor} font-mono`}>{stock.change.split(' ')[1]}</span>
                                    <span className="block text-xs text-gray-900 dark:text-white font-mono">{stock.price}</span>
                                </div>
                            </div>
                        )
                     }) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">Your stock watchlist is empty.</p>}
                </div>
            )}
            
            {selectedView === 'baskets' && (
                 <div className="space-y-2">
                    {watchlistedBaskets.length > 0 ? watchlistedBaskets.map(basketName => {
                        const basket = mockWatchlistBasketsData.find(b => b.name === basketName) || { name: basketName, stockCount: 0, changePercent: 'N/A', changePositive: true };
                        return (
                         <div key={basket.name} onClick={() => onNavigateToBasket(basket.name)} className="flex justify-between items-center p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-gray-900/50 cursor-pointer">
                            <div>
                                <span className="font-medium text-gray-900 dark:text-white">{basket.name}</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400 font-mono">{basket.stockCount} Stocks</span>
                            </div>
                            <span className={`font-medium font-mono ${basket.changePositive ? 'text-green-500' : 'text-red-500'}`}>{basket.changePercent}</span>
                        </div>
                    )}) : <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">Your basket watchlist is empty.</p>}
                 </div>
            )}
        </GlassPane>
    );
}


const UpcomingEvents: React.FC = () => (
     <GlassPane className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <ul className="space-y-3">
            <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-stone-100 dark:bg-gray-900/50 border border-stone-200 dark:border-cyan-400/20 rounded-lg w-10 h-10 flex flex-col items-center justify-center font-mono">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300 uppercase">NOV</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">15</span>
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">RELIANCE Earnings Call</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Post-Market</p>
                </div>
            </li>
            <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-stone-100 dark:bg-gray-900/50 border border-stone-200 dark:border-cyan-400/20 rounded-lg w-10 h-10 flex flex-col items-center justify-center font-mono">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300 uppercase">NOV</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">17</span>
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">RBI Policy Meeting</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">10:00 AM IST</p>
                </div>
            </li>
        </ul>
    </GlassPane>
);

const MiniNews: React.FC<{onOpenNewsModal: (newsItem: NewsItem) => void;}> = ({onOpenNewsModal}) => (
    <GlassPane className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mini News</h3>
        <div className="space-y-3">
            {mockNewsData.slice(3, 6).map((item, index) => (
                <div key={index} className="border-b border-stone-200 dark:border-purple-400/20 pb-3 last:border-b-0 last:pb-0">
                     <h4 onClick={() => onOpenNewsModal(item)} className="font-medium text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer text-sm leading-tight">{item.title}</h4>
                    <div className="flex text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2 font-mono">
                        <span>{item.source}</span>
                        <span>&bull;</span>
                        <span>{item.time}</span>
                    </div>
                </div>
            ))}
        </div>
    </GlassPane>
);

const Sidebar: React.FC<SidebarProps> = ({ onNavigateToStock, onNavigateToPortfolio, onNavigateToBasket, onOpenNewsModal, watchlistedStocks, watchlistedBaskets }) => {
    return (
        <div className="w-[380px] flex-shrink-0 h-full overflow-y-auto p-6 space-y-6 border-l border-gray-200 dark:border-cyan-400/20 hidden lg:block">
            <AISignalCard onNavigateToStock={onNavigateToStock} />
            <Watchlist onNavigateToStock={onNavigateToStock} onNavigateToPortfolio={onNavigateToPortfolio} onNavigateToBasket={onNavigateToBasket} watchlistedStocks={watchlistedStocks} watchlistedBaskets={watchlistedBaskets} />
            <UpcomingEvents />
            <MiniNews onOpenNewsModal={onOpenNewsModal} />
        </div>
    );
};

export default Sidebar;