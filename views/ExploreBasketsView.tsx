
import React from 'react';
import GlassPane from '../components/ui/GlassPane';

const ExploreBasketCard: React.FC = () => (
    <GlassPane className="flex flex-col justify-between">
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 flex items-center justify-center">
                        <span className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-300">7M</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Momentum 7 - AllCap</h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">by TRENDLYNE RA</p>
                    </div>
                </div>
                <span className="text-red-500">&darr;</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                The Trendlyne Momentum Basket captures the market's fastest-moving stocks. It's built on a single, powerful premise: find what's working right now...
            </p>
            <div className="grid grid-cols-4 gap-4 text-center mt-4 border-t border-b border-stone-200 dark:border-cyan-400/20 py-4">
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">2M Returns</span>
                    <p className="text-lg font-bold text-green-500 font-mono">15.2%</p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Pos. Periods</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">2<span className="text-gray-500">/3 Mths</span></p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Win/Loss</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">15<span className="text-red-500">/7</span></p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Min. Invest</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">₹20,000</p>
                </div>
            </div>
            <div className="mt-4 p-3 bg-stone-100 dark:bg-gray-900/50 rounded-lg flex justify-between items-center border border-stone-200 dark:border-cyan-400/30">
                <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">6 MONTH FEE</span>
                    <p className="font-bold text-gray-900 dark:text-white"><span className="line-through text-gray-400">₹15,000</span> ₹9,000</p>
                </div>
                <span className="px-3 py-1 text-sm font-bold text-green-700 dark:text-green-300 bg-green-200 dark:bg-green-900/50 rounded-full border border-green-300 dark:border-green-600">40% OFF</span>
            </div>
        </div>
        <div className="bg-stone-100 dark:bg-black/30 p-4 flex justify-between items-center border-t border-stone-200 dark:border-cyan-400/20">
            <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 rounded-full border border-yellow-300 dark:border-yellow-600">PREMIUM</span>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-stone-100 dark:bg-gray-800/50 rounded-full border border-stone-300 dark:border-gray-600">Growth</span>
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20">
                Subscribe
            </button>
        </div>
    </GlassPane>
);

const ExploreBasketsView: React.FC = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
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
                <ExploreBasketCard />
                <ExploreBasketCard />
            </div>
        </div>
    );
};

export default ExploreBasketsView;