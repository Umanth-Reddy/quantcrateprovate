
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import HomeView from './views/HomeView';
import DashboardView from './views/DashboardView';
import ExploreBasketsView from './views/ExploreBasketsView';
import BasketView from './views/BasketView';
import StockTerminalView from './views/StockTerminalView';
import NewsView from './views/NewsView';
import NewsModal from './components/NewsModal';
import type { View, Basket, StockDetails, NewsItem } from './types';
import { mockBasketData, mockWhyData } from './data/mockData';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [selectedBasketName, setSelectedBasketName] = useState<string | null>(null);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [basketData, setBasketData] = useState<Basket | null>(null);
    const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
    const [navigationSource, setNavigationSource] = useState<'dashboard' | 'basket'>('dashboard');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const navigateToHome = useCallback(() => {
        setView('home');
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, []);

    const navigateToDashboard = useCallback(() => {
        setView('dashboard');
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, []);

    const navigateToExplore = useCallback(() => {
        setView('explore');
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, []);

    const navigateToNews = useCallback(() => {
        setView('news');
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, []);

    const navigateToBasket = useCallback((basketName: string) => {
        const data = mockBasketData[basketName] || { stocks: [], alert: null };
        setSelectedBasketName(basketName);
        setBasketData(data);
        setView('basket');
    }, []);

    const navigateToStock = useCallback((ticker: string, source: 'dashboard' | 'basket') => {
        const data = mockWhyData[ticker];
        setSelectedTicker(ticker);
        setStockDetails(data);
        setNavigationSource(source);
        setView('stock-terminal');
    }, []);

    const handleBackFromTerminal = useCallback(() => {
        if (navigationSource === 'basket' && selectedBasketName) {
            navigateToBasket(selectedBasketName);
        } else {
            navigateToDashboard();
        }
    }, [navigationSource, selectedBasketName, navigateToBasket, navigateToDashboard]);
    
    const openNewsModal = useCallback((newsItem: NewsItem) => {
        setSelectedNews(newsItem);
    }, []);

    const closeNewsModal = useCallback(() => {
        setSelectedNews(null);
    }, []);

    const renderView = () => {
        switch (view) {
            case 'home':
                return <HomeView onNavigateToDashboard={navigateToDashboard} />;
            case 'dashboard':
                return <DashboardView onNavigateToBasket={navigateToBasket} onNavigateToStock={(ticker) => navigateToStock(ticker, 'dashboard')} onOpenNewsModal={openNewsModal} />;
            case 'explore':
                return <ExploreBasketsView />;
            case 'news':
                return <NewsView onOpenNewsModal={openNewsModal} />;
            case 'basket':
                return basketData && selectedBasketName ? (
                    <BasketView
                        basketName={selectedBasketName}
                        basketData={basketData}
                        onNavigateToStock={(ticker) => navigateToStock(ticker, 'basket')}
                        onBack={navigateToDashboard}
                    />
                ) : null;
            case 'stock-terminal':
                return stockDetails && selectedTicker ? (
                    <StockTerminalView
                        ticker={selectedTicker}
                        details={stockDetails}
                        onBack={handleBackFromTerminal}
                        onNavigateToBasket={navigateToBasket}
                        onNavigateToStock={(ticker) => navigateToStock(ticker, 'basket')}
                    />
                ) : null;
            default:
                return <HomeView onNavigateToDashboard={navigateToDashboard} />;
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen font-sans">
            <Header currentView={view} onNavigateToHome={navigateToHome} onNavigateToDashboard={navigateToDashboard} onNavigateToExplore={navigateToExplore} onNavigateToNews={navigateToNews} />
            {view !== 'home' && <MarketTicker />}
            <main className="flex flex-1 overflow-hidden">
                {renderView()}
            </main>
            {selectedNews && (
                <NewsModal newsItem={selectedNews} onClose={closeNewsModal} />
            )}
        </div>
    );
};

export default App;