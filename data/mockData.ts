import React from 'react';
import type { Basket, StockDetails, NewsItem, MarketMoverItem, SectorPerformanceItem } from '../types';

// FIX: Moved SectorIcons from components/SectorPerformance.tsx to break a circular dependency.
// FIX: Converted JSX to React.createElement to support .ts file extension.
const SectorIcons = {
    Restaurant: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M12 21a9 9 0 01-9-9h18a9 9 0 01-9 9zM6 12a6 6 0 016-6v6H6z" })),
    Printing: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" })),
    Shipbuilding: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0zM12 22V12m0 10a8 8 0 008-8h-8m-8 8a8 8 0 018-8H4" })),
    Metals: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })),
    EdibleOil: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19.5 12.572l-7.5 7.428-7.5-7.428m15 0A23.978 23.978 0 0012 3.75 23.978 23.978 0 004.5 12.572" })),
    DryCells: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 14.25l.5-2.25M12 14.25l.5-2.25M16.2 14.25l.5-2.25M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" })),
};


export const mockBasketData: { [key: string]: Basket } = {
    'Tech Momentum': {
        alert: null,
        stocks: [
            { ticker: 'MSFT', summary: 'Price > 50 SMA, RSI 68' },
            { ticker: 'AAPL', summary: 'MACD Crossover, Price > 50 SMA' },
            { ticker: 'NVDA', summary: 'Strong Trend, RSI 72' },
        ]
    },
    'Banking Breakouts': {
        alert: 'JPM has an earnings call today. Expect high volatility.',
        stocks: [
            { ticker: 'JPM', summary: 'Breakout > $150, High Volume' },
            { ticker: 'HDFCBANK', summary: 'Price > 200 SMA' },
        ]
    },
    'Mean Reversion': {
        alert: null,
        stocks: [
            { ticker: 'PFE', summary: 'Oversold (RSI 28), Bounce Likel' },
            { ticker: 'INTC', summary: 'Oversold (RSI 29), Price > 20 SMA' },
        ]
    },
    'Pharma Surge': {
        alert: 'PFE reports earnings next week.',
        stocks: [
            { ticker: 'PFE', summary: 'Oversold (RSI 28)' },
            { ticker: 'LLY', summary: 'New 52-Week High' },
        ]
    },
    'EV Ecosystem': {
        alert: null,
        stocks: [
            { ticker: 'TSLA', summary: 'Price > 50 SMA' },
            { ticker: 'TATAMOTORS', summary: 'Volume Spike' },
        ]
    }
};

export const mockWhyData: { [key: string]: StockDetails } = {
    'MSFT': {
        company: 'Microsoft Corporation', price: '$345.10', change: '+1.20 (+0.35%)', changeColor: 'text-green-500',
        aiScore: {
            score: 72, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 85, explanation: 'The stock is in a strong uptrend, trading consistently above its 50-day and 200-day moving averages.' },
                { name: 'Momentum', value: 70, explanation: 'RSI is at 68, indicating strong buying pressure but not yet overbought. MACD is positive.' },
                { name: 'Value', value: 40, explanation: 'Valuation is high compared to the industry P/E. This is a growth-focused score, not value.' }
            ]
        },
        inBaskets: ['Tech Momentum'],
        fundamentals: [
            { label: 'Market Cap', value: '$2.58T' }, { label: 'ROE', value: '38.7%' },
            { label: 'P/E Ratio (TTM)', value: '35.20' }, { label: 'EPS (TTM)', value: '$9.80' },
            { label: 'P/B Ratio', value: '10.8' }, { label: 'Dividend Yield', value: '0.85%' },
            { label: 'Industry P/E', value: '30.5' }, { label: 'Book Value', value: '$31.95' },
            { label: 'Debt to Equity', value: '0.25' }, { label: 'Face Value', value: '$1.00' }
        ],
        checklist: [
            { rule: 'Price > 50-day SMA', pass: true, details: '$345.10 > $330.20' },
            { rule: 'RSI (14) < 75', pass: true, details: 'RSI is 68.0' },
            { rule: 'MACD > Signal Line', pass: true, details: 'Crossover 2 days ago' },
            { rule: 'Volume > 20-day Avg', pass: false, details: 'Volume is -15% vs. Avg' }
        ]
    },
    'PFE': {
        company: 'Pfizer Inc.', price: '$32.50', change: '-0.15 (-0.46%)', changeColor: 'text-red-500',
        aiScore: {
            score: 35, label: 'Hold', color: 'text-yellow-500', bgColor: 'bg-yellow-500',
            subScores: [
                { name: 'Trend', value: 20, explanation: 'The stock is in a clear downtrend, trading below all key moving averages.' },
                { name: 'Momentum', value: 30, explanation: 'RSI is 28 (oversold), suggesting a potential bounce, but momentum remains negative.' },
                { name: 'Value', value: 75, explanation: 'P/E Ratio is low (10.15) and Dividend Yield is high (4.5%), indicating strong value characteristics.' }
            ]
        },
        inBaskets: ['Mean Reversion', 'Pharma Surge'],
        fundamentals: [
            { label: 'Market Cap', value: '$182.5B' }, { label: 'ROE', value: '15.2%' },
            { label: 'P/E Ratio (TTM)', value: '10.15' }, { label: 'EPS (TTM)', value: '$3.20' },
            { label: 'P/B Ratio', value: '2.5' }, { label: 'Dividend Yield', value: '4.50%' },
            { label: 'Industry P/E', value: '22.0' }, { label: 'Book Value', value: '$13.00' },
            { label: 'Debt to Equity', value: '0.40' }, { label: 'Face Value', value: '$0.05' }
        ],
        checklist: [
            { rule: 'RSI (14) < 30', pass: true, details: 'RSI is 28.0' },
            { rule: 'Price > 50-day SMA', pass: false, details: 'Price is below SMA' },
            { rule: 'MACD > Signal Line', pass: false, details: 'No Crossover' },
        ]
    },
    'AAPL': {
        company: 'Apple Inc.', price: '$180.50', change: '+1.98 (+1.10%)', changeColor: 'text-green-500',
        aiScore: {
            score: 68, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 70, explanation: 'Stock is in a stable uptrend, recently bouncing off its 50-day SMA.' },
                { name: 'Momentum', value: 60, explanation: 'A recent MACD crossover suggests new positive momentum is building.' },
                { name: 'Value', value: 65, explanation: 'Valuation is reasonable for its sector, supported by extremely strong ROE.' }
            ]
        },
        inBaskets: ['Tech Momentum'],
        fundamentals: [
            { label: 'Market Cap', value: '$2.8T' }, { label: 'ROE', value: '160.5%' },
            { label: 'P/E Ratio (TTM)', value: '30.1' }, { label: 'EPS (TTM)', value: '$6.00' },
            { label: 'P/B Ratio', value: '45.0' }, { label: 'Dividend Yield', value: '0.55%' }
        ],
        checklist: [
            { rule: 'Price > 50-day SMA', pass: true, details: '$180.50 > $175.10' },
            { rule: 'MACD > Signal Line', pass: true, details: 'Crossover 1 day ago' },
        ]
    },
    'NVDA': {
        company: 'NVIDIA Corporation', price: '$450.00', change: '+10.50 (+2.39%)', changeColor: 'text-green-500',
        aiScore: {
            score: 85, label: 'Strong Buy', color: 'text-green-500', bgColor: 'bg-green-500',
            subScores: [
                { name: 'Trend', value: 90, explanation: 'Stock is in a very strong, long-term uptrend.' },
                { name: 'Momentum', value: 88, explanation: 'RSI is high (72) and volume is strong, indicating significant buying interest.' },
                { name: 'Value', value: 60, explanation: 'Valuation is high, but justified by a very high ROE and market leadership.' }
            ]
        },
        inBaskets: ['Tech Momentum'],
        fundamentals: [
            { label: 'Market Cap', value: '$1.1T' }, { label: 'ROE', value: '45.0%' },
            { label: 'P/E Ratio (TTM)', value: '59.8' }, { label: 'EPS (TTM)', value: '$7.52' },
            { label: 'P/B Ratio', value: '30.0' }, { label: 'Dividend Yield', value: '0.04%' }
        ],
        checklist: [
            { rule: 'Price > 50-day SMA', pass: true, details: '$450.00 > $420.00' },
            { rule: 'RSI (14) < 75', pass: true, details: 'RSI is 72.0' },
        ]
    },
    'TSLA': {
        company: 'Tesla, Inc.', price: '$240.10', change: '-2.05 (-0.85%)', changeColor: 'text-red-500',
        aiScore: {
            score: 55, label: 'Hold', color: 'text-yellow-500', bgColor: 'bg-yellow-500',
            subScores: [
                { name: 'Trend', value: 60, explanation: 'The long-term trend is positive, but short-term price action has been choppy.' },
                { name: 'Momentum', value: 40, explanation: 'Momentum indicators are neutral, with no clear buy or sell signal.' },
                { name: 'Value', value: 30, explanation: 'Stock trades at a high P/E ratio, indicating it is priced for future growth, not current value.' }
            ]
        },
        inBaskets: ['EV Ecosystem'],
        fundamentals: [
            { label: 'Market Cap', value: '$760B' }, { label: 'ROE', value: '28.0%' },
            { label: 'P/E Ratio (TTM)', value: '75.5' }, { label: 'EPS (TTM)', value: '$3.18' },
        ],
        checklist: [{ rule: 'Price > 50-day SMA', pass: true, details: '$240.10 > $235.00' }]
    },
    'JPM': {
        company: 'JPMorgan Chase & Co.', price: '$151.00', change: '+2.50 (+1.68%)', changeColor: 'text-green-500',
        aiScore: {
            score: 78, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 80, explanation: 'Stock has broken above a key resistance level of $150.' },
                { name: 'Momentum', value: 75, explanation: 'Breakout is supported by high volume, indicating strong momentum.' },
                { name: 'Value', value: 70, explanation: 'P/E ratio is low for the banking sector, representing good value.' }
            ]
        },
        inBaskets: ['Banking Breakouts'],
        fundamentals: [
            { label: 'Market Cap', value: '$430B' }, { label: 'ROE', value: '14.5%' },
            { label: 'P/E Ratio (TTM)', value: '10.5' }, { label: 'Dividend Yield', value: '2.8%' }
        ],
        checklist: [
            { rule: 'Breakout > $150', pass: true, details: '$151.00 > $150.00' },
            { rule: 'Volume > 20-day Avg', pass: true, details: 'Volume is +40% vs. Avg' }
        ]
    },
    'HDFCBANK': {
        company: 'HDFC Bank Ltd', price: '₹1580.00', change: '+39.50 (+2.55%)', changeColor: 'text-green-500',
        aiScore: {
            score: 65, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 70, explanation: 'Stock is showing a strong reversal and is now above its 200-day SMA.' },
                { name: 'Momentum', value: 60, explanation: 'Positive momentum is returning after a period of underperformance.' },
                { name: 'Value', value: 60, explanation: 'P/E ratio is at a historically low level for this high-quality bank.' }
            ]
        },
        inBaskets: ['Banking Breakouts'],
        fundamentals: [
            { label: 'Market Cap', value: '₹12T' }, { label: 'ROE', value: '17.0%' },
            { label: 'P/E Ratio (TTM)', value: '21.0' }, { label: 'Dividend Yield', value: '1.0%' },
        ],
        checklist: [{ rule: 'Price > 200-day SMA', pass: true, details: '₹1580.00 > ₹1550.00' }]
    },
    'INTC': {
        company: 'Intel Corporation', price: '$35.00', change: '+0.20 (+0.57%)', changeColor: 'text-green-500',
        aiScore: {
            score: 40, label: 'Hold', color: 'text-yellow-500', bgColor: 'bg-yellow-500',
            subScores: [
                { name: 'Trend', value: 30, explanation: 'Stock is in a long-term downtrend, but showing signs of basing.' },
                { name: 'Momentum', value: 40, explanation: 'RSI is 29 (oversold), suggesting a potential short-term bounce.' },
                { name: 'Value', value: 60, explanation: 'Stock looks cheap on a Price-to-Book basis, but P/E is high due to depressed earnings.' }
            ]
        },
        inBaskets: ['Mean Reversion'],
        fundamentals: [
            { label: 'Market Cap', value: '$148B' }, { label: 'ROE', value: '5.1%' },
            { label: 'P/E Ratio (TTM)', value: '30.5' }, { label: 'Dividend Yield', value: '1.43%' },
        ],
        checklist: [
            { rule: 'RSI (14) < 30', pass: true, details: 'RSI is 29.0' },
            { rule: 'Price > 20-day SMA', pass: true, details: '$35.00 > $34.50' }
        ]
    },
    'LLY': {
        company: 'Eli Lilly and Company', price: '$580.00', change: '+10.00 (+1.75%)', changeColor: 'text-green-500',
        aiScore: {
            score: 80, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 90, explanation: 'Stock is in a very strong, long-term uptrend.' },
                { name: 'Momentum', value: 80, explanation: 'Stock just hit a new 52-week high, confirming strong positive momentum.' },
                { name: 'Value', value: 40, explanation: 'Valuation is very high, reflecting strong market optimism for its drug pipeline.' }
            ]
        },
        inBaskets: ['Pharma Surge'],
        fundamentals: [
            { label: 'Market Cap', value: '$550B' }, { label: 'ROE', value: '30.2%' },
            { label: 'P/E Ratio (TTM)', value: '65.0' }, { label: 'Dividend Yield', value: '0.78%' },
        ],
        checklist: [
            { rule: 'New 52-Week High', pass: true, details: 'Price at $580.00' },
            { rule: 'Price > 50-day SMA', pass: true, details: '$580.00 > $550.00' }
        ]
    },
    'TATAMOTORS': {
        company: 'Tata Motors', price: '₹650.00', change: '+5.20 (+0.81%)', changeColor: 'text-green-500',
        aiScore: {
            score: 75, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 80, explanation: 'Stock is in a strong uptrend, consistently making higher highs and higher lows.' },
                { name: 'Momentum', value: 70, explanation: 'A massive volume spike (3.2x avg) confirms strong buying interest.' },
                { name: 'Value', value: 65, explanation: 'P/E ratio has become reasonable (18.0) following a strong earnings turnaround.' }
            ]
        },
        inBaskets: ['EV Ecosystem'],
        fundamentals: [
            { label: 'Market Cap', value: '₹2.2T' }, { label: 'ROE', value: '10.2%' },
            { label: 'P/E Ratio (TTM)', value: '18.0' }, { label: 'Dividend Yield', value: '0.30%' },
        ],
        checklist: [
            { rule: 'Price > 50-day SMA', pass: true, details: '₹650.00 > ₹630.00' },
            { rule: 'Volume > 20-day Avg', pass: true, details: 'Volume is +220% vs. Avg' }
        ]
    }
};

export const mockNewsData: NewsItem[] = [
    {
        title: "Reliance Retail set to acquire local partner for global brand expansion",
        source: "Economic Times",
        time: "1h ago",
        ticker: "RELIANCE",
        url: "https://economictimes.indiatimes.com/",
        description: "Reliance Retail Ventures Ltd (RRVL) is in advanced talks to acquire a majority stake in a local partner of a global fashion brand, sources said. The move is part of the company's strategy to expand its portfolio of international brands in India. The deal, if it goes through, will be one of the largest in the retail sector this year."
    },
    {
        title: "Infosys bags multi-year AI deal from European telecom giant",
        source: "Moneycontrol",
        time: "3h ago",
        ticker: "INFY",
        url: "https://www.moneycontrol.com/",
        description: "Infosys has secured a multi-year contract from a leading European telecom and communications provider to power its AI-driven customer service and analytics platforms. The deal is valued at over $150 million and will see Infosys deploy its proprietary AI suite to enhance customer experience and operational efficiency for the client."
    },
    {
        title: "Tata Motors reports record-breaking Q3 sales for JLR",
        source: "Business Standard",
        time: "8h ago",
        ticker: "TATAMOTORS",
        url: "https://www.business-standard.com/",
        description: "Jaguar Land Rover (JLR), a subsidiary of Tata Motors, has reported its best-ever third-quarter sales, driven by strong demand for its new Range Rover and Defender models. The company said that sales in the quarter were up 25% year-on-year, with significant growth seen in North America and China."
    },
    {
        title: "RBI maintains repo rate at 6.5% in latest policy meeting",
        source: "Livemint",
        time: "1d ago",
        url: "https://www.livemint.com/",
        description: "The Reserve Bank of India's Monetary Policy Committee (MPC) has decided to keep the repo rate unchanged at 6.5% for the fifth consecutive time. The decision was unanimous, with the committee citing concerns about inflation and global economic uncertainty. The MPC also retained its 'withdrawal of accommodation' stance."
    },
    {
        title: "HDFC Bank raises $750 million through international bond sale",
        source: "Reuters",
        time: "2d ago",
        ticker: "HDFCBANK",
        url: "https://www.reuters.com/",
        description: "India's largest private sector lender, HDFC Bank, has successfully raised $750 million from an overseas bond sale. The issue was oversubscribed multiple times, indicating strong investor confidence. The funds will be used for general corporate purposes and to support the bank's offshore growth."
    }
];

export const mockMarketMoversData: MarketMoverItem[] = [
    {
        logo: "https://companieslogo.com/img/orig/BAJHL.NS-a72a445d.png?t=1633591039",
        company: "Bajaj Hold & Invest",
        price: "₹12,560.00",
        change: "579.00",
        changePercent: "4.83%",
        changePositive: true,
        volume: "1,35,441",
        sparkline: "M0 25L10 20L20 22L30 15L40 18L50 12L60 8L70 14L80 10L90 5L100 8",
    },
    {
        logo: "https://companieslogo.com/img/orig/ADANIENT.NS-0c698b53.png?t=1648275323",
        company: "Adani Enterprises",
        price: "₹2,537.60",
        change: "49.40",
        changePercent: "1.99%",
        changePositive: true,
        volume: "29,87,450",
        sparkline: "M0 15L10 18L20 12L30 15L40 20L50 25L60 22L70 18L80 20L90 15L100 18",
    },
    {
        logo: "https://companieslogo.com/img/orig/CANBK.NS-628d4993.png?t=1633592652",
        company: "Canara Bank",
        price: "₹145.48",
        change: "2.03",
        changePercent: "1.42%",
        changePositive: true,
        volume: "1,78,97,359",
        sparkline: "M0 20L10 18L20 22L30 19L40 15L50 16L60 10L70 12L80 8L90 10L100 5",
    },
    {
        logo: "https://companieslogo.com/img/orig/VBL.NS-5942d919.png?t=1654238192",
        company: "Varun Beverages",
        price: "₹459.25",
        change: "6.25",
        changePercent: "1.38%",
        changePositive: true,
        volume: "34,27,380",
        sparkline: "M0 22L10 18L20 20L30 17L40 14L50 16L60 12L70 15L80 11L90 13L100 8",
    },
    {
        logo: "https://companieslogo.com/img/orig/ADANIPOWER.NS-7223969a.png?t=1633590740",
        company: "Adani Power",
        price: "₹153.77",
        change: "-1.92",
        changePercent: "1.26%",
        changePositive: false,
        volume: "2,24,92,529",
        sparkline: "M0 5L10 8L20 12L30 10L40 15L50 18L60 14L70 18L80 22L90 20L100 25",
    },
];

export const mockSectorPerformanceData: SectorPerformanceItem[] = [
    {
        // FIX: Changed JSX component to function call to avoid JSX parsing error in .ts file.
        icon: SectorIcons.Restaurant(),
        sector: "Quick Service Restaurant",
        gainers: 2,
        losers: 7,
        priceChange: "+2.25%",
        changePositive: true,
    },
    {
        // FIX: Changed JSX component to function call to avoid JSX parsing error in .ts file.
        icon: SectorIcons.Printing(),
        sector: "Printing & Stationery",
        gainers: 8,
        losers: 9,
        priceChange: "+1.91%",
        changePositive: true,
    },
    {
        // FIX: Changed JSX component to function call to avoid JSX parsing error in .ts file.
        icon: SectorIcons.Shipbuilding(),
        sector: "Shipbuilding",
        gainers: 2,
        losers: 2,
        priceChange: "+1.82%",
        changePositive: true,
    },
    {
        // FIX: Changed JSX component to function call to avoid JSX parsing error in .ts file.
        icon: SectorIcons.Metals(),
        sector: "Non-Ferrous Metals",
        gainers: 24,
        losers: 18,
        priceChange: "-1.52%",
        changePositive: false,
    },
    {
        // FIX: Changed JSX component to function call to avoid JSX parsing error in .ts file.
        icon: SectorIcons.EdibleOil(),
        sector: "Edible Oil",
        gainers: 12,
        losers: 12,
        priceChange: "-2.40%",
        changePositive: false,
    },
    {
        // FIX: Changed JSX component to function call to avoid JSX parsing error in .ts file.
        icon: SectorIcons.DryCells(),
        sector: "Dry cells",
        gainers: 0,
        losers: 3,
        priceChange: "-2.89%",
        changePositive: false,
    },
];
