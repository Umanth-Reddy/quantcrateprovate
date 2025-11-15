import React from 'react';
import GlassPane from '../components/ui/GlassPane';
import type { View } from '../types';

interface ExploreBasketCardProps {
    name: string;
    creator: string;
    description: string;
    returns: string;
    positivePeriods: string;
    winLoss: string;
    minInvest: string;
    tags: string[];
    onNavigate: () => void;
    isInvested: boolean;
}

const ExploreBasketCard: React.FC<ExploreBasketCardProps> = ({ name, creator, description, returns, positivePeriods, winLoss, minInvest, tags, onNavigate, isInvested }) => (
    <GlassPane className="flex flex-col justify-between">
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 flex items-center justify-center">
                        <span className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-300">{name.split(' ')[0][0]}{name.split(' ')[1]?.[0]}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">by {creator}</p>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 h-12">
                {description}
            </p>
            <div className="grid grid-cols-4 gap-4 text-center mt-4 border-t border-b border-stone-200 dark:border-cyan-400/20 py-4">
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">2M Returns</span>
                    <p className="text-lg font-bold text-green-500 font-mono">{returns}</p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Pos. Periods</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{positivePeriods}</p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Win/Loss</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{winLoss}</p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Min. Invest</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{minInvest}</p>
                </div>
            </div>
        </div>
        <div className="bg-stone-100 dark:bg-black/30 p-4 flex justify-between items-center border-t border-stone-200 dark:border-cyan-400/20">
            <div className="flex items-center space-x-2">
                {tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 rounded-full border border-yellow-300 dark:border-yellow-600">{tag}</span>
                ))}
            </div>
            <button 
                onClick={onNavigate} 
                className={`${isInvested ? 'bg-stone-200 dark:bg-gray-700 hover:bg-stone-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200' : 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-cyan-600/20'} font-semibold py-2 px-4 rounded-lg transition-colors shadow-md`}
            >
                {isInvested ? 'View Details' : 'Bookmark'}
            </button>
        </div>
    </GlassPane>
);

const exploreBasketsData = [
    {
        name: 'Pharma Surge',
        creator: 'QuantCrate AI',
        description: "A momentum-focused basket targeting pharmaceutical stocks with strong recent performance, including new 52-week highs.",
        returns: '35.1%', positivePeriods: '3/3 Mths', winLoss: '18/4', minInvest: '₹1,00,000',
        tags: ['PREMIUM', 'Momentum'],
    },
    {
        name: 'EV Ecosystem',
        creator: 'QuantCrate AI',
        description: "Captures key players in the Electric Vehicle space, balancing long-term trends with recent market volatility.",
        returns: '42.0%', positivePeriods: '2/3 Mths', winLoss: '12/9', minInvest: '₹1,50,000',
        tags: ['PREMIUM', 'Thematic'],
    },
    {
        name: 'Mean Reversion',
        creator: 'QuantCrate AI',
        description: "This contrarian strategy identifies fundamentally sound stocks that are technically oversold and poised for a potential bounce.",
        returns: '-5.8%', positivePeriods: '1/3 Mths', winLoss: '6/15', minInvest: '₹30,000',
        tags: ['PREMIUM', 'Value'],
    },
     {
        name: 'Tech Momentum',
        creator: 'QuantCrate AI',
        description: "Stocks in the technology sector showing strong upward price trends and positive momentum signals.",
        returns: '28.5%', positivePeriods: '3/3 Mths', winLoss: '22/3', minInvest: '₹50,000',
        tags: ['PREMIUM', 'Momentum'],
    }
];


interface ExploreBasketsViewProps {
    onNavigateToBasket: (basketName: string, source: View) => void;
    investedBasketNames: string[];
}

const ExploreBasketsView: React.FC<ExploreBasketsViewProps> = ({ onNavigateToBasket, investedBasketNames }) => {
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Explore Baskets</h1>
            <GlassPane className="p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-grow max-w-xs">
                        <input type="text" placeholder="Search Baskets..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:border-cyan-500 text-gray-900 dark:text-gray-100" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                    {/* Filters and Sort components would go here */}
                </div>
            </GlassPane>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exploreBasketsData.map(basket => (
                     <ExploreBasketCard 
                        key={basket.name}
                        {...basket}
                        onNavigate={() => onNavigateToBasket(basket.name, 'explore')}
                        isInvested={investedBasketNames.includes(basket.name)}
                     />
                ))}
            </div>
        </div>
    );
};

export default ExploreBasketsView;