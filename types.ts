
import type { ReactElement } from 'react';

export type View = 'home' | 'dashboard' | 'explore' | 'basket' | 'stock-terminal' | 'news';

export interface Stock {
    ticker: string;
    summary: string;
}

export interface Basket {
    alert: string | null;
    stocks: Stock[];
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
    logo: string;
    company: string;
    price: string;
    change: string;
    changePercent: string;
    changePositive: boolean;
    volume: string;
    sparkline: string;
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