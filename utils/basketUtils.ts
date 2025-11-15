import type { Basket, BasketStock, PortfolioBasket } from '../types';
import { mockWhyData } from '../data/mockData';

// Generates a new Basket object for a custom basket definition
export const generateNewBasket = (name: string, stockTickers: string[]): Basket => {
    const stocks: BasketStock[] = stockTickers.map(ticker => {
        // Find the stock details to get a summary
        const stockDetail = mockWhyData[ticker];
        return {
            ticker,
            summary: stockDetail ? stockDetail.checklist[0]?.rule || 'Custom stock' : 'Custom stock',
            // Default equal weight, can be adjusted later
            weight: parseFloat((100 / stockTickers.length).toFixed(2)),
            // Value would be calculated based on investment amount
            value: '₹0'
        };
    });

    // Simple summary and default scores for a new basket
    return {
        alert: null,
        stocks,
        summary: `A custom basket named "${name}" with ${stockTickers.length} stock(s).`,
        aiScore: {
            score: 50, // Neutral score
            label: 'N/A',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500',
            subScores: [] // Sub-scores would require complex calculation
        },
        performanceMetrics: {
            totalReturn: '0.00%',
            volatility: 'N/A',
            sharpeRatio: 'N/A'
        }
    };
};

// Generates a new PortfolioBasket object for tracking a new investment
export const generateNewPortfolioBasket = (name: string): PortfolioBasket => {
    const today = new Date();
    const investmentDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
    return {
        name,
        investedValue: '₹25,000', // Default mock value
        currentValue: '₹25,000',  // Default mock value
        totalReturn: '+₹0.00',
        totalReturnPercent: '+0.00%',
        isPositive: true,
        investmentDate,
    };
};
