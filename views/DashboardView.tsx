import React from 'react';
import GlassPane from '../components/ui/GlassPane';
import Sidebar from '../components/Sidebar';
import { mockNewsData, mockTopGainers, mockTopLosers, mockMostVolume } from '../data/mockData';
import type { NewsItem } from '../types';
import MarketMoversGrid from '../components/MarketMoversGrid';
import SectorPerformance from '../components/SectorPerformance';

interface DashboardViewProps {
    onNavigateToBasket: (basketName: string) => void;
    onNavigateToStock: (ticker: string) => void;
    onOpenNewsModal: (newsItem: NewsItem) => void;
    onNavigateToPortfolio: (defaultTab: 'stocks' | 'baskets') => void;
    watchlistedBaskets: string[];
    watchlistedStocks: string[];
    onNavigateToSectors: () => void;
}

const CuratedBasketCard: React.FC<{ title: string; description: string; stockCount: number; scanTime: string; status: 'Fresh' | 'Recent'; onSelect: () => void; }> = ({ title, description, stockCount, scanTime, status, onSelect }) => {
    const isFresh = status === 'Fresh';
    return (
        <GlassPane hover={true} className="flex flex-col justify-between">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{description}</p>
            </div>
            <div className="bg-stone-100 dark:bg-black/30 p-4 flex justify-between items-center border-t border-stone-200 dark:border-purple-400/20">
                <div className="flex items-center space-x-4">
                    <div>
                        <span className="text-xs text-gray-500 dark:text-gray-300 font-medium uppercase">Stocks</span>
                        <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{stockCount}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500 dark:text-gray-300 font-medium uppercase">Last Scan</span>
                        <div className="flex items-center space-x-2">
                            <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{scanTime}</p>
                            <span className={`flex items-center text-xs font-medium ${isFresh ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-black/50 border-green-300 dark:border-green-500/30' : 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-black/50 border-yellow-300 dark:border-yellow-500/30'} px-2 py-0.5 rounded-full border`}>
                                <span className={`h-2 w-2 ${isFresh ? 'bg-green-500' : 'bg-yellow-500'} rounded-full mr-1.5`}></span>
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={onSelect} className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20">
                    View
                </button>
            </div>
        </GlassPane>
    );
};

const TopNews: React.FC<{newsItems: NewsItem[]; onOpenNewsModal: (newsItem: NewsItem) => void;}> = ({newsItems, onOpenNewsModal}) => (
    <GlassPane className="mt-8 p-6" interactiveGlow={true}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Top News (Nifty 500)</h2>
        <div className="space-y-4">
            {newsItems.map((item, index) => (
                <div key={index} className="border-b border-stone-200 dark:border-purple-400/20 pb-4 last:border-b-0 last:pb-0">
                    <h3 onClick={() => onOpenNewsModal(item)} className="font-medium text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer">{item.title}</h3>
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


const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateToBasket, onNavigateToStock, onOpenNewsModal, onNavigateToPortfolio, watchlistedBaskets, watchlistedStocks, onNavigateToSectors }) => {
    return (
        <div className="flex flex-1">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Curated Baskets</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CuratedBasketCard title="Tech Momentum" description="Stocks in the technology sector showing strong upward price trends and positive momentum signals." stockCount={5} scanTime="12m ago" status="Fresh" onSelect={() => onNavigateToBasket('Tech Momentum')} />
                    <CuratedBasketCard title="Banking Breakouts" description="Banking stocks that have recently broken above key resistance levels or trendlines." stockCount={3} scanTime="28m ago" status="Recent" onSelect={() => onNavigateToBasket('Banking Breakouts')} />
                    <CuratedBasketCard title="Mean Reversion Candidates" description="Oversold stocks that are showing early signs of reverting back to their technical average." stockCount={7} scanTime="5m ago" status="Fresh" onSelect={() => onNavigateToBasket('Mean Reversion')} />
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trending Baskets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         <GlassPane 
                            hover={true} 
                            onClick={() => onNavigateToBasket('Pharma Surge')} 
                            className="p-4 flex justify-between items-center cursor-pointer !shadow-glow-green border-green-500/20"
                         >
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Pharma Surge</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">4 Stocks</p>
                            </div>
                            <span className="text-green-500 font-medium font-mono">+5.2%</span>
                        </GlassPane>
                         <GlassPane 
                            hover={true} 
                            onClick={() => onNavigateToBasket('EV Ecosystem')} 
                            className="p-4 flex justify-between items-center cursor-pointer !shadow-glow-green border-green-500/20"
                         >
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">EV Ecosystem</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">6 Stocks</p>
                            </div>
                            <span className="text-green-500 font-medium font-mono">+3.1%</span>
                        </GlassPane>
                    </div>
                </div>

                <MarketMoversGrid 
                    gainers={mockTopGainers}
                    losers={mockTopLosers}
                    volume={mockMostVolume}
                />
                <SectorPerformance onNavigateToSectors={onNavigateToSectors} />
                <TopNews newsItems={mockNewsData.slice(0, 3)} onOpenNewsModal={onOpenNewsModal} />

            </div>
            <Sidebar onNavigateToStock={onNavigateToStock} onNavigateToPortfolio={onNavigateToPortfolio} onNavigateToBasket={onNavigateToBasket} onOpenNewsModal={onOpenNewsModal} watchlistedBaskets={watchlistedBaskets} watchlistedStocks={watchlistedStocks} />
        </div>
    );
};

export default DashboardView;