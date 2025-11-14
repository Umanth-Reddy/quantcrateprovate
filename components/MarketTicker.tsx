
import React from 'react';

const TickerItem: React.FC<{ name: string, value: string, change: string, positive: boolean }> = ({ name, value, change, positive }) => (
    <>
        <span className="text-gray-600">|</span>
        <span className="font-mono text-sm font-medium">{name}</span>
        <span className={`font-mono text-sm font-bold ${positive ? 'text-green-500' : 'text-red-500'}`}>{value} <span className="text-xs">{change}</span></span>
    </>
);

const TickerContent: React.FC = () => (
    <div className="flex items-center space-x-6 px-4 py-2">
        <TickerItem name="NIFTY 50" value="25,876.15" change="+8.65 (0.01%)" positive={true} />
        <TickerItem name="SENSEX" value="84,478.67" change="+12.16 (0.01%)" positive={true} />
        <TickerItem name="BANKNIFTY" value="58,931.95" change="+107.80 (0.18%)" positive={true} />
        <TickerItem name="MIDCPNIFTY" value="13,826.60" change="-28.90 (0.21%)" positive={false} />
        <TickerItem name="FINNIFTY" value="27,890.30" change="+15.10 (0.05%)" positive={true} />
    </div>
);

const MarketTicker: React.FC = () => {
    return (
        <div className="w-full bg-black/30 backdrop-blur-md border-b border-cyan-400/20 overflow-hidden flex-shrink-0">
            <div className="flex animate-marquee-slow whitespace-nowrap">
                <TickerContent />
                <TickerContent />
            </div>
        </div>
    );
};

export default MarketTicker;
