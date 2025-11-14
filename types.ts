import type { ReactElement } from 'react';

export type View = 'home' | 'dashboard' | 'explore' | 'basket-portfolio' | 'stock-terminal' | 'news' | 'portfolio' | 'how-it-works' | 'subscribe' | 'sectors';
export type StockNavigationSource = 'dashboard' | 'basket' | 'portfolio';

export interface Stock {
    ticker: string;
    summary: string;
}

export interface BasketStock {
    ticker: string;
    summary: string;
    weight: number;
    value: string;
}

export interface PerformanceMetrics {
    totalReturn: string;
    volatility: string;
    sharpeRatio: string;
}

export interface Basket {
    alert: string | null;
    stocks: BasketStock[];
    summary: string;
    aiScore: AIScore;
    performanceMetrics: PerformanceMetrics;
}

export interface SubScore {
    name: string;
    value: number;
    explanation: string;
}

export interface AIScore {
    score: number;
    label: string;
    color: string;
    bgColor: string;
    subScores: SubScore[];
}

export interface Fundamental {
    label: string;
    value: string;
}

export interface ChecklistItem {
    rule: string;
    pass: boolean;
    details: string;
}

export interface StockDetails {
    company: string;
    price: string;
    change: string;
    changeColor: string;
    aiScore: AIScore;
    inBaskets: string[];
    fundamentals: Fundamental[];
    checklist: ChecklistItem[];
}

export interface NewsItem {
    title: string;
    source: string;
    time: string;
    ticker?: string;
    description: string;
    url: string;
}

export interface MarketMoverItem {
    ticker: string;
    logo: string;
    company: string;
    price: string;
    change: string;
    changePercent: string;
    changePositive: boolean;
    volume: string;
}

export interface WatchlistBasket {
    name: string;
    stockCount: number;
    changePercent: string;
    changePositive: boolean;
}

export interface PortfolioBasket {
    name: string;
    investedValue: string;
    currentValue: string;
    totalReturn: string;
    totalReturnPercent: string;
    isPositive: boolean;
}

export interface User {
    username: string;
    role: 'user' | 'admin';
}

export interface SectorPerformanceItem {
    // FIX: Changed JSX.Element to ReactElement to resolve "Cannot find namespace 'JSX'" error.
    icon: ReactElement;
    sector: string;
    gainers: number;
    losers: number;
    priceChange: string;
    changePositive: boolean;
}