
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import HomeView from './views/HomeView';
import DashboardView from './views/DashboardView';
import ExploreBasketsView from './views/ExploreBasketsView';
import BasketView from './views/BasketView';
import StockTerminalView from './views/StockTerminalView';
import NewsView from './views/NewsView';
import PortfolioView from './views/PortfolioView';
import HowItWorksView from './views/HowItWorksView';
import NewsModal from './components/NewsModal';
import AuthModal from './components/AuthModal';
import type { View, Basket, StockDetails, NewsItem, StockNavigationSource } from './types';
import { mockBasketData, mockWhyData } from './data/mockData';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [selectedBasketName, setSelectedBasketName] = useState<string | null>(null);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [basketData, setBasketData] = useState<Basket | null>(null);
    const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
    const [navigationSource, setNavigationSource] = useState<StockNavigationSource>('dashboard');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [portfolioWatchlistTab, setPortfolioWatchlistTab] = useState<'stocks' | 'baskets'>('baskets');
    const [authModal, setAuthModal] = useState<{isOpen: boolean; mode: 'login' | 'signup'}>({isOpen: false, mode: 'login'});

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleOpenAuthModal = useCallback((mode: 'login' | 'signup') => {
        setAuthModal({isOpen: true, mode});
    }, []);

    const handleCloseAuthModal = useCallback(() => {
        setAuthModal({isOpen: false, mode: 'login'});
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
    
    const navigateToPortfolio = useCallback((defaultTab: 'stocks' | 'baskets' = 'baskets') => {
        setView('portfolio');
        setPortfolioWatchlistTab(defaultTab);
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

    const navigateToHowItWorks = useCallback(() => {
        setView('how-it-works');
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, []);

    const navigateToBasket = useCallback((basketName: string) => {
        const data = mockBasketData[basketName] || { stocks: [], alert: null };
        setSelectedBasketName(basketName);
        setBasketData(data);
        setView('basket');
    }, []);

    const navigateToStock = useCallback((ticker: string, source: StockNavigationSource) => {
        const data = mockWhyData[ticker];
        setSelectedTicker(ticker);
        setStockDetails(data);
        setNavigationSource(source);
        setView('stock-terminal');
    }, []);

    const handleBackFromTerminal = useCallback(() => {
        if (navigationSource === 'basket' && selectedBasketName) {
            navigateToBasket(selectedBasketName);
        } else if (navigationSource === 'portfolio') {
            navigateToPortfolio();
        }
        else {
            navigateToDashboard();
        }
    }, [navigationSource, selectedBasketName, navigateToBasket, navigateToDashboard, navigateToPortfolio]);
    
    const openNewsModal = useCallback((newsItem: NewsItem) => {
        setSelectedNews(newsItem);
    }, []);

    const closeNewsModal = useCallback(() => {
        setSelectedNews(null);
    }, []);

    const renderView = () => {
        switch (view) {
            case 'home':
                return <HomeView onNavigateToDashboard={navigateToDashboard} onOpenAuthModal={handleOpenAuthModal} />;
            case 'dashboard':
                return <DashboardView onNavigateToBasket={navigateToBasket} onNavigateToStock={(ticker) => navigateToStock(ticker, 'dashboard')} onOpenNewsModal={openNewsModal} onNavigateToPortfolio={navigateToPortfolio} />;
            case 'explore':
                return <ExploreBasketsView />;
            case 'news':
                return <NewsView onOpenNewsModal={openNewsModal} />;
            case 'portfolio':
                return <PortfolioView onNavigateToBasket={navigateToBasket} onNavigateToStock={(ticker) => navigateToStock(ticker, 'portfolio')} defaultTab={portfolioWatchlistTab} />;
            case 'how-it-works':
                return <HowItWorksView />;
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
                        onNavigateToStock={(ticker) => navigateToStock(ticker, navigationSource)}
                    />
                ) : null;
            default:
                return <HomeView onNavigateToDashboard={navigateToDashboard} onOpenAuthModal={handleOpenAuthModal} />;
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen font-sans">
            <Header currentView={view} onNavigateToHome={navigateToHome} onNavigateToDashboard={navigateToDashboard} onNavigateToExplore={navigateToExplore} onNavigateToNews={navigateToNews} onNavigateToPortfolio={navigateToPortfolio} onNavigateToHowItWorks={navigateToHowItWorks} onOpenAuthModal={handleOpenAuthModal} />
            {view !== 'home' && <MarketTicker />}
            <main className="flex flex-1 overflow-hidden">
                {renderView()}
            </main>
            {selectedNews && (
                <NewsModal newsItem={selectedNews} onClose={closeNewsModal} />
            )}
             <AuthModal 
                isOpen={authModal.isOpen} 
                onClose={handleCloseAuthModal} 
                initialMode={authModal.mode} 
            />
        </div>
    );
};

export default App;
