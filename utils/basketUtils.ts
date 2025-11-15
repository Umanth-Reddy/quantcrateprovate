
import type { Basket, BasketStock, PortfolioBasket } from '../types';
import { mockWhyData } from '../data/mockData';

// Generates a new Basket object for a custom basket definition
export const generateNewBasket = (name: string, stocksWithDetails: BasketStock[]): Basket => {
    return {
        alert: null,
        stocks: stocksWithDetails,
        summary: `A custom basket named "${name}" with ${stocksWithDetails.length} stock(s).`,
        aiScore: {
            score: 50, // Neutral score for custom basket
            label: 'N/A',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500',
            subScores: [] // Sub-scores require complex calculation
        },
        performanceMetrics: {
            totalReturn: '0.00%',
            volatility: 'N/A',
            sharpeRatio: 'N/A'
        }
    };
};


// Generates a new PortfolioBasket object for tracking a new investment
export const generateNewPortfolioBasket = (name: string, totalValue: number = 25000): PortfolioBasket => {
    const today = new Date();
    const investmentDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedValue = `₹${totalValue.toLocaleString('en-IN')}`;
    return {
        name,
        investedValue: formattedValue,
        currentValue: formattedValue,
        totalReturn: '+₹0.00',
        totalReturnPercent: '+0.00%',
        isPositive: true,
        investmentDate,
    };
};
