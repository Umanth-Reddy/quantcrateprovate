
import React, { useState } from 'react';
import GlassPane from './ui/GlassPane';
import type { MarketMoverItem } from '../types';

interface MarketMoversGridProps {
    gainers: MarketMoverItem[];
    losers: MarketMoverItem[];
    volume: MarketMoverItem[];
}

const MoverCard: React.FC<{ item: MarketMoverItem; glowColor: 'green' | 'red' | 'cyan' }> = ({ item, glowColor }) => {
    const glowClasses = {
        green: '!shadow-glow-green border-green-500/50',
        red: '!shadow-glow-red border-red-500/50',
        cyan: '!shadow-glow-cyan border-cyan-500/50',
    };
    
    return (
        <GlassPane hover={true} className={`p-4 ${glowClasses[glowColor]}`}>
            <div className="flex items-center space-x-3 mb-2">
                <img src={item.logo} alt={`${item.company} logo`} className="h-8 w-8 object-contain rounded-full bg-white p-1 border border-stone-200 dark:border-gray-700" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-white font-mono">{item.ticker}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.company}</p>
                </div>
            </div>
            <div className="text-right font-mono">
                <p className="font-semibold text-gray-900 dark:text-white">{item.price}</p>
                <p className={`text-sm ${item.changePositive ? 'text-green-500' : 'text-red-500'}`}>{item.changePercent}</p>
                 {glowColor === 'cyan' && (
                     <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Vol: {item.volume}</p>
                )}
            </div>
        </GlassPane>
    );
};

const MarketMoversGrid: React.FC<MarketMoversGridProps> = ({ gainers, losers, volume }) => {
    const [selectedView, setSelectedView] = useState<'gainers' | 'losers' | 'volume'>('gainers');
    const [isOpen, setIsOpen] = useState(false);

    const views = {
        gainers: { title: 'Top Gainers', data: gainers, glow: 'green' as const },
        losers: { title: 'Top Losers', data: losers, glow: 'red' as const },
        volume: { title: 'Most Active by Volume', data: volume, glow: 'cyan' as const },
    };

    const currentView = views[selectedView];

    const handleSelect = (view: 'gainers' | 'losers' | 'volume') => {
        setSelectedView(view);
        setIsOpen(false);
    };

    return (
        <GlassPane className="mt-8 p-6" interactiveGlow={true}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Market Movers</h2>
                <div className="relative">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 p-2 rounded-lg bg-stone-100 dark:bg-black/30 border border-stone-200 dark:border-purple-400/20"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                    >
                        <span>{currentView.title}</span>
                        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-stone-200 dark:border-purple-400/20 z-10" role="menu">
                            {Object.keys(views).map((key) => (
                                <button 
                                    key={key} 
                                    onClick={() => handleSelect(key as 'gainers' | 'losers' | 'volume')} 
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800"
                                    role="menuitem"
                                >
                                    {views[key as keyof typeof views].title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {currentView.data.map(item => <MoverCard key={item.ticker} item={item} glowColor={currentView.glow} />)}
            </div>
        </GlassPane>
    );
};

export default MarketMoversGrid;
