import React, { useState, useMemo, useEffect } from 'react';
import GlassPane from './ui/GlassPane';
import Modal from './ui/Modal';
import { mockWhyData } from '../data/mockData';
import type { StockDetails, Basket } from '../types';

interface CreateEditBasketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (basketName: string, stocks: { ticker: string; value: number }[], isEditing: boolean) => void;
    initialBasketName?: string;
    allBaskets: { [key: string]: Basket };
}

const allStocksData: (StockDetails & { ticker: string })[] = Object.entries(mockWhyData).map(([ticker, details]) => ({
    ticker,
    ...details
}));

const CreateEditBasketModal: React.FC<CreateEditBasketModalProps> = ({ isOpen, onClose, onSave, initialBasketName, allBaskets }) => {
    const [basketName, setBasketName] = useState('');
    const [selectedStocksWithAmounts, setSelectedStocksWithAmounts] = useState<Map<string, string>>(new Map());
    const [searchTerm, setSearchTerm] = useState('');
    
    const isEditing = !!initialBasketName;

    useEffect(() => {
        if (isOpen && initialBasketName && allBaskets[initialBasketName]) {
            setBasketName(initialBasketName);
            const initialStocksMap = new Map<string, string>();
            allBaskets[initialBasketName].stocks.forEach(s => {
                const numericValue = s.value.replace(/[^0-9.]/g, '');
                initialStocksMap.set(s.ticker, numericValue);
            });
            setSelectedStocksWithAmounts(initialStocksMap);
        } else {
            setBasketName('');
            setSelectedStocksWithAmounts(new Map());
        }
        setSearchTerm('');
    }, [isOpen, initialBasketName, allBaskets]);
    
    const handleAddStock = (ticker: string) => {
        if (!selectedStocksWithAmounts.has(ticker)) {
            const newSelection = new Map(selectedStocksWithAmounts);
            newSelection.set(ticker, '');
            setSelectedStocksWithAmounts(newSelection);
        }
    };

    const handleRemoveStock = (ticker: string) => {
        const newSelection = new Map(selectedStocksWithAmounts);
        newSelection.delete(ticker);
        setSelectedStocksWithAmounts(newSelection);
    };

    const handleAmountChange = (ticker: string, amount: string) => {
        const newSelection = new Map(selectedStocksWithAmounts);
        newSelection.set(ticker, amount);
        setSelectedStocksWithAmounts(newSelection);
    };


    const handleSave = () => {
        const stocksForSave = Array.from(selectedStocksWithAmounts.entries())
            .map(([ticker, value]) => ({ ticker, value: parseFloat(value) || 0 }))
            .filter(stock => stock.value > 0);

        if (basketName.trim() && stocksForSave.length > 0) {
            onSave(basketName.trim(), stocksForSave, isEditing);
        } else {
            alert('Please provide a basket name and at least one stock with an amount greater than 0.');
        }
    };

    const filteredStocks = useMemo(() => {
        return allStocksData.filter(stock =>
            (stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !selectedStocksWithAmounts.has(stock.ticker)
        );
    }, [searchTerm, selectedStocksWithAmounts]);

    const totalInvestment = useMemo(() => {
        // Fix: Explicitly type `value` as `string` to resolve type inference issue with `parseFloat`.
        return Array.from(selectedStocksWithAmounts.values()).reduce((sum: number, value: string) => sum + (parseFloat(value) || 0), 0);
    }, [selectedStocksWithAmounts]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassPane className="p-8 max-w-3xl w-full" interactiveGlow>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? `Edit "${initialBasketName}"` : 'Create New Basket'}
                    </h2>
                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* Left side: Stock Selection */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="basket-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Basket Name*</label>
                            <input type="text" id="basket-name" placeholder="e.g., 'My Growth Stocks'" value={basketName} onChange={e => setBasketName(e.target.value)} disabled={isEditing} className="mt-1 block w-full pl-3 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100 disabled:opacity-50" />
                        </div>
                        <div>
                             <label htmlFor="add-stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Add Stocks*</label>
                            <div className="relative mt-1">
                                <input type="text" id="add-stock" placeholder="Search Ticker or Company..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 overflow-y-auto bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-300 dark:border-cyan-400/30 p-2 space-y-1">
                            {filteredStocks.map(stock => (
                                <div key={stock.ticker} onClick={() => handleAddStock(stock.ticker)} className="flex items-center justify-between p-2 rounded-md hover:bg-stone-200 dark:hover:bg-gray-900/50 cursor-pointer">
                                    <div>
                                        <p className="font-mono font-medium text-gray-900 dark:text-white">{stock.ticker}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{stock.company}</p>
                                    </div>
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                                </div>
                            ))}
                            {searchTerm && filteredStocks.length === 0 && <p className="text-center text-sm text-gray-500 p-4">No available stocks found.</p>}
                        </div>
                    </div>
                    {/* Right side: Selected Stocks */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Selected Stocks ({selectedStocksWithAmounts.size})</h3>
                        <div className="h-80 overflow-y-auto bg-stone-100 dark:bg-black/30 rounded-lg border border-stone-300 dark:border-cyan-400/30 p-2 space-y-2">
                            {Array.from(selectedStocksWithAmounts.keys()).map((ticker: string) => (
                                <div key={ticker} className="flex items-center gap-2 p-2 rounded-md bg-white dark:bg-gray-900/50">
                                    <div className="flex-grow">
                                        <p className="font-mono font-medium text-gray-900 dark:text-white">{ticker}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{mockWhyData[ticker]?.company}</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                        <input 
                                            type="number" 
                                            placeholder="Amount" 
                                            value={selectedStocksWithAmounts.get(ticker)} 
                                            onChange={(e) => handleAmountChange(ticker, e.target.value)} 
                                            className="w-28 pl-6 pr-2 py-1 rounded-md bg-stone-100 dark:bg-gray-800 border border-stone-300 dark:border-cyan-400/30 text-sm"
                                        />
                                    </div>
                                    <button onClick={() => handleRemoveStock(ticker)} className="text-gray-400 hover:text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>
                            ))}
                            {selectedStocksWithAmounts.size === 0 && <p className="text-center text-sm text-gray-500 p-4">Search and add stocks to get started.</p>}
                        </div>
                        <div className="flex justify-between items-center p-2 font-medium">
                            <span>Total Investment:</span>
                            <span className="font-mono text-lg">₹{totalInvestment.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                     <button onClick={handleSave} className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!basketName.trim() || selectedStocksWithAmounts.size === 0}>
                        {isEditing ? 'Save Changes' : 'Create & Invest'}
                    </button>
                </div>
            </GlassPane>
        </Modal>
    );
};

export default CreateEditBasketModal;
