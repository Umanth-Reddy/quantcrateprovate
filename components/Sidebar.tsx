
import React from 'react';
import GlassPane from './ui/GlassPane';
import Sparkline from './ui/Sparkline';

interface SidebarProps {
    onNavigateToStock: (ticker: string) => void;
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

const Watchlist: React.FC<{ onNavigateToStock: (ticker: string) => void }> = ({ onNavigateToStock }) => (
    <GlassPane className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Watchlist</h3>
        <div className="space-y-0">
            <div onClick={() => onNavigateToStock('AAPL')} className="grid grid-cols-3 items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 cursor-pointer border-b border-gray-200 dark:border-cyan-400/20 pb-2 mb-2">
                <div><span className="font-medium text-gray-900 dark:text-white font-mono">AAPL</span><span className="block text-xs text-gray-500 dark:text-gray-400">Apple Inc.</span></div>
                <Sparkline color="green" data="M0 15L10 12L20 14L30 10L40 12L50 18L60 15L70 12L80 10L90 14L100 12" />
                <div className="text-right">
                    <span className="font-medium text-green-500 font-mono">+1.10%</span>
                    <span className="block text-xs text-gray-900 dark:text-white font-mono">$180.50</span>
                </div>
            </div>
            <div onClick={() => onNavigateToStock('TSLA')} className="grid grid-cols-3 items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 cursor-pointer">
                <div><span className="font-medium text-gray-900 dark:text-white font-mono">TSLA</span><span className="block text-xs text-gray-500 dark:text-gray-400">Tesla, Inc.</span></div>
                <Sparkline color="red" data="M0 10L10 15L20 12L30 18L40 20L50 15L60 18L70 22L80 25L90 20L100 22" />
                <div className="text-right">
                    <span className="font-medium text-red-500 font-mono">-0.85%</span>
                    <span className="block text-xs text-gray-900 dark:text-white font-mono">$240.10</span>
                </div>
            </div>
        </div>
    </GlassPane>
);

const UpcomingEvents: React.FC = () => (
     <GlassPane className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <ul className="space-y-3">
            <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-cyan-400/20 rounded-lg w-10 h-10 flex flex-col items-center justify-center font-mono">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300 uppercase">NOV</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">15</span>
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">RELIANCE Earnings Call</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Post-Market</p>
                </div>
            </li>
            <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-cyan-400/20 rounded-lg w-10 h-10 flex flex-col items-center justify-center font-mono">
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

const Sidebar: React.FC<SidebarProps> = ({ onNavigateToStock }) => {
    return (
        <div className="w-[380px] flex-shrink-0 h-full overflow-y-auto p-6 space-y-6 border-l border-gray-200 dark:border-cyan-400/20 hidden lg:block">
            <AISignalCard onNavigateToStock={onNavigateToStock} />
            <Watchlist onNavigateToStock={onNavigateToStock} />
            <UpcomingEvents />
        </div>
    );
};

export default Sidebar;
