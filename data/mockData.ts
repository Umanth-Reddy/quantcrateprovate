
import React from 'react';
import type { Basket, StockDetails, NewsItem, MarketMoverItem, SectorPerformanceItem, WatchlistBasket, PortfolioBasket } from '../types';

const SectorIcons = {
    Restaurant: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M12 21a9 9 0 01-9-9h18a9 9 0 01-9 9zM6 12a6 6 0 016-6v6H6z" })),
    Printing: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" })),
    Shipbuilding: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0zM12 22V12m0 10a8 8 0 008-8h-8m-8 8a8 8 0 018-8H4" })),
    Metals: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })),
    EdibleOil: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19.5 12.572l-7.5 7.428-7.5-7.428m15 0A23.978 23.978 0 0012 3.75 23.978 23.978 0 004.5 12.572" })),
    DryCells: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 14.25l.5-2.25M12 14.25l.5-2.25M16.2 14.25l.5-2.25M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" })),
    Technology: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })),
    Banking: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" })),
    Pharma: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zM12 12a3 3 0 100-6 3 3 0 000 6zM12 12a3 3 0 100-6 3 3 0 000 6z" })),
    Auto: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zM12 12a3 3 0 100-6 3 3 0 000 6zM12 12a3 3 0 100-6 3 3 0 000 6z" })),
    FMCG: () => React.createElement('svg', { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" })),
};


export const mockBasketData: { [key: string]: Basket } = {
    'Tech Momentum': {
        alert: null,
        stocks: [
            { ticker: 'MSFT', summary: 'Price > 50 SMA, RSI 68', weight: 40, value: '₹20,000' },
            { ticker: 'AAPL', summary: 'MACD Crossover, Price > 50 SMA', weight: 35, value: '₹17,500' },
            { ticker: 'NVDA', summary: 'Strong Trend, RSI 72', weight: 25, value: '₹12,500' },
        ],
        summary: "This basket scores high on Momentum and Trend factors, identifying tech stocks in strong, established uptrends. It is less focused on traditional value metrics.",
        aiScore: {
            score: 78, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 90, explanation: 'The basket average shows a strong, consistent uptrend across its components, with all stocks trading above their 50-day moving averages.' },
                { name: 'Momentum', value: 82, explanation: 'Overall momentum is high, with an average RSI of 69, indicating significant buying pressure across the selected tech stocks.' },
                { name: 'Value', value: 35, explanation: 'This is a growth-focused basket. The average P/E is high, reflecting market expectations for future growth rather than current value.' }
            ]
        },
        performanceMetrics: {
            totalReturn: '+28.5%',
            volatility: '22.1%',
            sharpeRatio: '1.45'
        }
    },
    'Banking Breakouts': {
        alert: 'JPM has an earnings call today. Expect high volatility.',
        stocks: [
            { ticker: 'JPM', summary: 'Breakout > $150, High Volume', weight: 60, value: '₹60,000' },
            { ticker: 'HDFCBANK', summary: 'Price > 200 SMA', weight: 40, value: '₹40,000' },
        ],
        summary: "Focuses on banking stocks exhibiting breakout patterns, confirmed by high volume. The score reflects strong technical signals and reasonable valuations within the sector.",
        aiScore: {
            score: 75, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 85, explanation: 'Components are showing strong technical breakouts above key resistance levels, signaling the start of a potential new uptrend.' },
                { name: 'Momentum', value: 78, explanation: 'Breakouts are supported by above-average trading volume, confirming the strength of the move.' },
                { name: 'Value', value: 65, explanation: 'The selected banks trade at reasonable P/E ratios relative to the broader market and their historical averages.' }
            ]
        },
        performanceMetrics: {
            totalReturn: '+15.2%',
            volatility: '18.9%',
            sharpeRatio: '1.10'
        }
    },
    'Mean Reversion': {
        alert: null,
        stocks: [
            { ticker: 'PFE', summary: 'Oversold (RSI 28), Bounce Likel', weight: 50, value: '₹15,000' },
            { ticker: 'INTC', summary: 'Oversold (RSI 29), Price > 20 SMA', weight: 50, value: '₹15,000' },
        ],
        summary: "This strategy identifies fundamentally sound stocks that are technically oversold (low RSI). The AI score is lower, reflecting poor current momentum but high potential value.",
        aiScore: {
            score: 48, label: 'Hold', color: 'text-yellow-500', bgColor: 'bg-yellow-500',
            subScores: [
                { name: 'Trend', value: 25, explanation: 'The stocks are in clear downtrends, trading below key moving averages. This is a contrarian strategy.' },
                { name: 'Momentum', value: 30, explanation: 'Momentum is negative, but the low average RSI (28.5) suggests the stocks are oversold and may be due for a short-term bounce.' },
                { name: 'Value', value: 80, explanation: 'This basket scores very high on value. The components have low P/E ratios and attractive dividend yields.' }
            ]
        },
        performanceMetrics: {
            totalReturn: '-5.8%',
            volatility: '25.5%',
            sharpeRatio: '0.35'
        }
    },
    'Pharma Surge': {
        alert: 'PFE reports earnings next week.',
        stocks: [
            { ticker: 'PFE', summary: 'Oversold (RSI 28)', weight: 40, value: '₹40,000' },
            { ticker: 'LLY', summary: 'New 52-Week High', weight: 60, value: '₹60,000' },
        ],
        summary: "A momentum-focused basket targeting pharmaceutical stocks with strong recent performance, including new 52-week highs. High growth potential is prioritized over value.",
        aiScore: {
            score: 72, label: 'Buy', color: 'text-cyan-400', bgColor: 'bg-cyan-500',
            subScores: [
                { name: 'Trend', value: 88, explanation: 'The basket is driven by stocks in powerful uptrends, with components consistently hitting new highs.' },
                { name: 'Momentum', value: 75, explanation: 'Strong price momentum is confirmed by high relative strength and positive indicator readings.' },
                { name: 'Value', value: 40, explanation: 'Valuations are high, reflecting the market\'s optimism about the drug pipelines and growth prospects of these companies.' }
            ]
        },
        performanceMetrics: {
            totalReturn: '+35.1%',
            volatility: '28.3%',
            sharpeRatio: '1.60'
        }
    },
    'EV Ecosystem': {
        alert: null,
        stocks: [
            { ticker: 'TSLA', summary: 'Price > 50 SMA', weight: 55, value: '₹82,500' },
            { ticker: 'TATAMOTORS', summary: 'Volume Spike', weight: 45, value: '₹67,500' },
        ],
        summary: "This basket captures key players in the Electric Vehicle space. The score is balanced, reflecting positive long-term trends but also recent market volatility and high valuations.",
        aiScore: {
            score: 62, label: 'Hold', color: 'text-yellow-500', bgColor: 'bg-yellow-500',
            subScores: [
                { name: 'Trend', value: 70, explanation: 'The long-term trend for the EV sector is positive, though individual stocks may experience short-term volatility.' },
                { name: 'Momentum', value: 55, explanation: 'Momentum is mixed. While there is strong volume interest, price action has been choppy recently.' },
                { name: 'Value', value: 30, explanation: 'This is a high-growth theme. Valuations are elevated as they are priced for significant future growth, not current earnings.' }
            ]
        },
        performanceMetrics: {
            totalReturn: '+42.0%',
            volatility: '35.8%',
            sharpeRatio: '1.30'
        }
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
    },
    {
        title: "Pharma sector sees renewed interest on strong Q2 results",
        source: "BloombergQuint",
        time: "2d ago",
        ticker: "PFE",
        url: "https://www.bloombergquint.com/",
        description: "Pharmaceutical stocks are back in focus after a series of strong quarterly earnings announcements. Companies like Pfizer and Eli Lilly have reported better-than-expected results, driven by strong sales of their blockbuster drugs and a robust pipeline of new products. Analysts are optimistic about the sector's growth prospects in the coming months."
    }
];

export const mockTopGainers: MarketMoverItem[] = [
    { ticker: 'NVDA', logo: 'https://companieslogo.com/img/orig/NVDA.D-8519de8d.png?t=1633499182', company: 'NVIDIA Corp', price: '$450.00', change: '+10.50', changePercent: '+2.39%', changePositive: true, volume: '45.2M' },
    { ticker: 'JPM', logo: 'https://companieslogo.com/img/orig/JPM-92262184.png?t=1633502229', company: 'JPMorgan Chase', price: '$151.00', change: '+2.50', changePercent: '+1.68%', changePositive: true, volume: '12.8M' },
    { ticker: 'LLY', logo: 'https://companieslogo.com/img/orig/LLY-59b9409b.png?t=1633502691', company: 'Eli Lilly', price: '$580.00', change: '+10.00', changePercent: '+1.75%', changePositive: true, volume: '3.1M' },
    { ticker: 'AAPL', logo: 'https://companieslogo.com/img/orig/AAPL.D-15494200.png?t=1633496924', company: 'Apple Inc.', price: '$180.50', change: '+1.98', changePercent: '+1.10%', changePositive: true, volume: '55.6M' },
];

export const mockTopLosers: MarketMoverItem[] = [
    { ticker: 'TSLA', logo: 'https://companieslogo.com/img/orig/TSLA-24e29969.png?t=1633499423', company: 'Tesla, Inc.', price: '$240.10', change: '-2.05', changePercent: '-0.85%', changePositive: false, volume: '110.5M' },
    { ticker: 'PFE', logo: 'https://companieslogo.com/img/orig/PFE-219a16cb.png?t=1633503521', company: 'Pfizer Inc.', price: '$32.50', change: '-0.15', changePercent: '-0.46%', changePositive: false, volume: '35.7M' },
    { ticker: 'NKE', logo: 'https://companieslogo.com/img/orig/NKE-0c8addb1.png?t=1633503198', company: 'NIKE, Inc.', price: '$102.50', change: '-1.50', changePercent: '-1.44%', changePositive: false, volume: '8.9M' },
    { ticker: 'DIS', logo: 'https://companieslogo.com/img/orig/DIS-22255792.png?t=1633499933', company: 'Walt Disney', price: '$85.20', change: '-0.95', changePercent: '-1.10%', changePositive: false, volume: '15.2M' },
];

export const mockMostVolume: MarketMoverItem[] = [
    { ticker: 'TSLA', logo: 'https://companieslogo.com/img/orig/TSLA-24e29969.png?t=1633499423', company: 'Tesla, Inc.', price: '$240.10', change: '-2.05', changePercent: '-0.85%', changePositive: false, volume: '110.5M' },
    { ticker: 'AAPL', logo: 'https://companieslogo.com/img/orig/AAPL.D-15494200.png?t=1633496924', company: 'Apple Inc.', price: '$180.50', change: '+1.98', changePercent: '+1.10%', changePositive: true, volume: '55.6M' },
    { ticker: 'NVDA', logo: 'https://companieslogo.com/img/orig/NVDA.D-8519de8d.png?t=1633499182', company: 'NVIDIA Corp', price: '$450.00', change: '+10.50', changePercent: '+2.39%', changePositive: true, volume: '45.2M' },
    { ticker: 'AMZN', logo: 'https://companieslogo.com/img/orig/AMZN.D-15104436.png?t=1633497042', company: 'Amazon.com', price: '$135.50', change: '+0.80', changePercent: '+0.59%', changePositive: true, volume: '42.1M' },
];

export const mockSectorPerformanceData: SectorPerformanceItem[] = [
     {
        icon: SectorIcons.Technology(),
        sector: "Information Technology",
        gainers: 45,
        losers: 15,
        priceChange: "+3.10%",
        changePositive: true,
    },
    {
        icon: SectorIcons.Restaurant(),
        sector: "Quick Service Restaurant",
        gainers: 2,
        losers: 7,
        priceChange: "+2.25%",
        changePositive: true,
    },
     {
        icon: SectorIcons.Banking(),
        sector: "Private Banks",
        gainers: 12,
        losers: 3,
        priceChange: "+2.05%",
        changePositive: true,
    },
    {
        icon: SectorIcons.Printing(),
        sector: "Printing & Stationery",
        gainers: 8,
        losers: 9,
        priceChange: "+1.91%",
        changePositive: true,
    },
    {
        icon: SectorIcons.Shipbuilding(),
        sector: "Shipbuilding",
        gainers: 2,
        losers: 2,
        priceChange: "+1.82%",
        changePositive: true,
    },
    {
        icon: SectorIcons.Pharma(),
        sector: "Pharmaceuticals",
        gainers: 30,
        losers: 25,
        priceChange: "+0.45%",
        changePositive: true,
    },
    {
        icon: SectorIcons.Auto(),
        sector: "Automobiles",
        gainers: 18,
        losers: 22,
        priceChange: "+0.15%",
        changePositive: true,
    },
    {
        icon: SectorIcons.FMCG(),
        sector: "FMCG",
        gainers: 20,
        losers: 25,
        priceChange: "-0.80%",
        changePositive: false,
    },
    {
        icon: SectorIcons.Metals(),
        sector: "Non-Ferrous Metals",
        gainers: 24,
        losers: 18,
        priceChange: "-1.52%",
        changePositive: false,
    },
    {
        icon: SectorIcons.EdibleOil(),
        sector: "Edible Oil",
        gainers: 12,
        losers: 12,
        priceChange: "-2.40%",
        changePositive: false,
    },
    {
        icon: SectorIcons.DryCells(),
        sector: "Dry cells",
        gainers: 0,
        losers: 3,
        priceChange: "-2.89%",
        changePositive: false,
    },
];


export const mockWatchlistBasketsData: WatchlistBasket[] = [
    { name: 'Pharma Surge', stockCount: 4, changePercent: '+5.2%', changePositive: true },
    { name: 'EV Ecosystem', stockCount: 6, changePercent: '+3.1%', changePositive: true },
    { name: 'Mean Reversion', stockCount: 7, changePercent: '-1.8%', changePositive: false },
];

export const mockInvestedBasketsData: PortfolioBasket[] = [
    { name: 'Tech Momentum', investedValue: '₹50,000', currentValue: '₹54,250', totalReturn: '+₹4,250', totalReturnPercent: '+8.50%', isPositive: true, investmentDate: '2023-10-15' },
    { name: 'Banking Breakouts', investedValue: '₹1,20,000', currentValue: '₹1,15,800', totalReturn: '-₹4,200', totalReturnPercent: '-3.50%', isPositive: false, investmentDate: '2023-09-01' },
];
