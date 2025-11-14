
import React, { useState, useMemo, useEffect } from 'react';
import GlassPane from './ui/GlassPane';
import { mockWhyData, mockBasketData } from '../data/mockData';
import type { StockDetails } from '../types';

interface CreateEditBasketProps {
    onSaveBasket: (basketName: string, stocks: string[]) => void;
}

const allStocksData: (StockDetails & { ticker: string })[] = Object.entries(mockWhyData).map(([ticker, details]) => ({
    ticker,
    ...details
}));

const templateBaskets = Object.keys(mockBasketData);

const CreateEditBasket: React.FC<CreateEditBasketProps> = ({ onSaveBasket }) => {
    const [basketName, setBasketName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (selectedTemplate) {
            const templateStocks = mockBasketData[selectedTemplate]?.stocks.map(s => s.ticker) || [];
            setSelectedStocks(new Set(templateStocks));
        } else {
            setSelectedStocks(new Set());
        }
    }, [selectedTemplate]);

    const handleStockToggle = (ticker: string) => {
        const newSelection = new Set(selectedStocks);
        if (newSelection.has(ticker)) {
            newSelection.delete(ticker);
        } else {
            newSelection.add(ticker);
        }
        setSelectedStocks(newSelection);
    };

    const handleSave = () => {
        if (basketName.trim() && selectedStocks.size > 0) {
            onSaveBasket(basketName.trim(), Array.from(selectedStocks));
            // Reset form
            setBasketName('');
            setSelectedTemplate('');
            setSelectedStocks(new Set());
            setSearchTerm('');
        } else {
            alert('Please provide a basket name and select at least one stock.');
        }
    };

    const filteredStocks = useMemo(() => {
        return allStocksData.filter(stock =>
            stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <GlassPane className="p-6 sticky top-8" interactiveGlow>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create & Edit Baskets</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="basket-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Basket Name*</label>
                    <input type="text" id="basket-name" placeholder="e.g., 'My Growth Stocks'" value={basketName} onChange={e => setBasketName(e.target.value)} className="mt-1 block w-full pl-3 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                    <label htmlFor="template-basket" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Apply Template (Optional)</label>
                    <select id="template-basket" value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100">
                        <option value="">None</option>
                        {templateBaskets.map(name => <option key={name} value={name}>{name}</option>)}
                    </select>
                </div>
                <div>
                     <label htmlFor="add-stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Stocks*</label>
                    <div className="relative mt-1">
                        <input type="text" id="add-stock" placeholder="Search Ticker or Company..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="h-64 overflow-y-auto bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-300 dark:border-cyan-400/30 p-2 space-y-1">
                    {filteredStocks.map(stock => (
                        <div key={stock.ticker} onClick={() => handleStockToggle(stock.ticker)} className="flex items-center justify-between p-2 rounded-md hover:bg-stone-200 dark:hover:bg-gray-900/50 cursor-pointer">
                            <div>
                                <p className="font-mono font-medium text-gray-900 dark:text-white">{stock.ticker}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{stock.company}</p>
                            </div>
                            <div className={`w-5 h-5 flex-shrink-0 rounded-sm border-2 ${selectedStocks.has(stock.ticker) ? 'bg-cyan-500 border-cyan-500' : 'border-gray-400' } flex items-center justify-center`}>
                                {selectedStocks.has(stock.ticker) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={handleSave} className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!basketName.trim() || selectedStocks.size === 0}>
                    Save Custom Basket
                </button>
            </div>
        </GlassPane>
    );
};

export default CreateEditBasket;
