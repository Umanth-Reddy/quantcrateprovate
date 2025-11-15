import React from 'react';

const ArrowIcon: React.FC<{ up: boolean }> = ({ up }) => (
    up ? (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
        </svg>
    ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
    )
);

const TickerItem: React.FC<{ name: string, value: string, change: string, positive: boolean }> = ({ name, value, change, positive }) => (
    <div className="flex items-center space-x-4">
        <span className="font-sans text-sm font-medium text-stone-800 dark:text-stone-300">{name}</span>
        <div className="flex items-center space-x-2">
            <span className={`font-mono text-sm font-semibold text-stone-900 dark:text-stone-100`}>{value}</span>
            <div className={`flex items-center text-xs font-mono font-bold ${positive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                <ArrowIcon up={positive} />
                <span>{change}</span>
            </div>
        </div>
    </div>
);

const TickerContent: React.FC = () => (
    <div className="flex items-center divide-x divide-stone-200 dark:divide-cyan-400/20">
        <div className="px-6 py-2"><TickerItem name="NIFTY 50" value="25,876.15" change="+8.65 (0.01%)" positive={true} /></div>
        <div className="px-6 py-2"><TickerItem name="SENSEX" value="84,478.67" change="+12.16 (0.01%)" positive={true} /></div>
        <div className="px-6 py-2"><TickerItem name="BANKNIFTY" value="58,931.95" change="+107.80 (0.18%)" positive={true} /></div>
        <div className="px-6 py-2"><TickerItem name="MIDCPNIFTY" value="13,826.60" change="-28.90 (0.21%)" positive={false} /></div>
        <div className="px-6 py-2"><TickerItem name="FINNIFTY" value="27,890.30" change="+15.10 (0.05%)" positive={true} /></div>
    </div>
);

const MarketTicker: React.FC = () => {
    return (
        <div className="w-full bg-stone-50 dark:bg-black/30 backdrop-blur-sm border-b border-stone-200 dark:border-cyan-400/20 overflow-hidden flex-shrink-0">
            <div className="flex animate-marquee-slow whitespace-nowrap">
                <TickerContent />
                <TickerContent />
            </div>
        </div>
    );
};

export default MarketTicker;