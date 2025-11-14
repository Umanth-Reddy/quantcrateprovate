
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
import SubscribeView from './views/SubscribeView';
import NewsModal from './components/NewsModal';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import type { View, Basket, StockDetails, NewsItem, StockNavigationSource, User } from './types';
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
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // --- Subscription State ---
    const [isSubscribed, setIsSubscribed] = useState(false); // Default to free user
    const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    const isProAccess = isSubscribed || currentUser?.role === 'admin';

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

    const handleOpenAuthModal = useCallback((mode: 'login' | 'signup') => {
        setAuthModal({isOpen: true, mode});
    }, []);

    const handleCloseAuthModal = useCallback(() => {
        setAuthModal({isOpen: false, mode: 'login'});
    }, []);
    
    const handleLogin = useCallback(async (credentials: { email: string; password?: string; isGoogle?: boolean }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
    
        if (credentials.email.toLowerCase() === 'admin' && credentials.password === 'admin') {
             setCurrentUser({ username: 'Admin', role: 'admin' });
        } else {
             setCurrentUser({ username: credentials.email.split('@')[0], role: 'user' });
        }
        navigateToDashboard();
    }, [navigateToDashboard]);
    
    const handleLogout = useCallback(() => {
        setCurrentUser(null);
        // In a real app, you might want to clear other user-specific state here.
        setIsSubscribed(false); 
        navigateToHome();
    }, [navigateToHome]);

    const handleProtectedAction = useCallback((action: () => void) => {
        if (isProAccess) {
            action();
        } else {
            setSubscriptionModalOpen(true);
        }
    }, [isProAccess]);

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

    const navigateToSubscribe = useCallback(() => {
        setView('subscribe');
        setSubscriptionModalOpen(false); // Close modal if open
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

    const protectedNavigateToBasket = (basketName: string) => handleProtectedAction(() => navigateToBasket(basketName));
    const protectedNavigateToStock = (ticker: string, source: StockNavigationSource) => handleProtectedAction(() => navigateToStock(ticker, source));

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
                return <DashboardView onNavigateToBasket={protectedNavigateToBasket} onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'dashboard')} onOpenNewsModal={openNewsModal} onNavigateToPortfolio={navigateToPortfolio} />;
            case 'explore':
                return <ExploreBasketsView />;
            case 'news':
                return <NewsView onOpenNewsModal={openNewsModal} />;
            case 'portfolio':
                return <PortfolioView onNavigateToBasket={protectedNavigateToBasket} onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'portfolio')} defaultTab={portfolioWatchlistTab} />;
            case 'how-it-works':
                return <HowItWorksView />;
            case 'subscribe':
                return <SubscribeView />;
            case 'basket':
                return basketData && selectedBasketName ? (
                    <BasketView
                        basketName={selectedBasketName}
                        basketData={basketData}
                        onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'basket')}
                        onBack={navigateToDashboard}
                    />
                ) : null;
            case 'stock-terminal':
                return stockDetails && selectedTicker ? (
                    <StockTerminalView
                        ticker={selectedTicker}
                        details={stockDetails}
                        onBack={handleBackFromTerminal}
                        onNavigateToBasket={protectedNavigateToBasket}
                        onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, navigationSource)}
                    />
                ) : null;
            default:
                return <HomeView onNavigateToDashboard={navigateToDashboard} onOpenAuthModal={handleOpenAuthModal} />;
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen font-sans">
            <Header currentView={view} onNavigateToHome={navigateToHome} onNavigateToDashboard={navigateToDashboard} onNavigateToExplore={navigateToExplore} onNavigateToNews={navigateToNews} onNavigateToPortfolio={navigateToPortfolio} onNavigateToHowItWorks={navigateToHowItWorks} onNavigateToSubscribe={navigateToSubscribe} onOpenAuthModal={handleOpenAuthModal} currentUser={currentUser} onLogout={handleLogout} />
            {view !== 'home' && currentUser && <MarketTicker />}
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
                onLogin={handleLogin}
            />
            <SubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setSubscriptionModalOpen(false)}
                onNavigateToSubscribe={navigateToSubscribe}
            />
        </div>
    );
};

export default App;