import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import HomeView from './views/HomeView';
import DashboardView from './views/DashboardView';
import ExploreBasketsView from './views/ExploreBasketsView';
import BasketPortfolioView from './views/BasketPortfolioView';
import StockTerminalView from './views/StockTerminalView';
import NewsView from './views/NewsView';
import PortfolioView from './views/PortfolioView';
import HowItWorksView from './views/HowItWorksView';
import SubscribeView from './views/SubscribeView';
import SectorsView from './views/SectorsView';
import NewsModal from './components/NewsModal';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import SubscriptionCodeModal from './components/SubscriptionCodeModal';
import type { View, Basket, StockDetails, NewsItem, StockNavigationSource, User, PortfolioBasket } from './types';
import { mockBasketData, mockWhyData, mockInvestedBasketsData } from './data/mockData';
import { generateNewBasket, generateNewPortfolioBasket } from './utils/basketUtils';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [allBaskets, setAllBaskets] = useState<{ [key: string]: Basket }>(mockBasketData);
    const [selectedBasketName, setSelectedBasketName] = useState<string | null>(null);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [navigationSource, setNavigationSource] = useState<StockNavigationSource>('dashboard');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [portfolioWatchlistTab, setPortfolioWatchlistTab] = useState<'stocks' | 'baskets'>('baskets');
    const [authModal, setAuthModal] = useState<{isOpen: boolean; mode: 'login' | 'signup'}>({isOpen: false, mode: 'login'});
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // --- Subscription State ---
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [isSubscriptionCodeModalOpen, setSubscriptionCodeModalOpen] = useState(false);
    
    // --- Investment & Portfolio State ---
    const [investments, setInvestments] = useState<PortfolioBasket[]>(mockInvestedBasketsData.filter(b => b.name === 'Banking Breakouts'));
    const [archivedBaskets, setArchivedBaskets] = useState<PortfolioBasket[]>([]);

    // --- Watchlist State ---
    const [watchlistedStocks, setWatchlistedStocks] = useState<string[]>(['AAPL', 'TSLA']);
    const [watchlistedBaskets, setWatchlistedBaskets] = useState<string[]>(['Pharma Surge', 'Mean Reversion']);

    const handleToggleStockWatchlist = (ticker: string) => {
        setWatchlistedStocks(prev => 
            prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker]
        );
    };
    
    const handleToggleBasketWatchlist = (basketName: string) => {
        setWatchlistedBaskets(prev => 
            prev.includes(basketName) ? prev.filter(b => b !== basketName) : [...prev, basketName]
        );
    };

    const handleInvest = (basketName: string) => {
        if (investments.some(b => b.name === basketName)) return; // Already invested
        
        // Find in archives and move back, or find in mocks and add
        const archived = archivedBaskets.find(b => b.name === basketName);
        if (archived) {
            setInvestments(prev => [...prev, archived]);
            setArchivedBaskets(prev => prev.filter(b => b.name !== basketName));
        } else {
             const mockInvestment = mockInvestedBasketsData.find(b => b.name === basketName);
             if(mockInvestment) {
                setInvestments(prev => [...prev, mockInvestment]);
             }
        }
    };

    const handleSell = (basketName: string) => {
        const basketToArchive = investments.find(b => b.name === basketName);
        if (basketToArchive) {
            setInvestments(prev => prev.filter(b => b.name !== basketName));
            // Ensure we don't duplicate in archives
            if (!archivedBaskets.some(b => b.name === basketName)) {
                 setArchivedBaskets(prev => [...prev, basketToArchive]);
            }
        }
    };
    
    const handleSaveCustomBasket = (basketName: string, stocks: string[]) => {
        const newBasket = generateNewBasket(basketName, stocks);
        const newPortfolioBasket = generateNewPortfolioBasket(basketName);
        
        setAllBaskets(prev => ({...prev, [basketName]: newBasket}));
        setInvestments(prev => [...prev, newPortfolioBasket]);
        // Navigate to the newly created basket
        navigateToBasket(basketName);
    };

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
        setSubscriptionModalOpen(false);
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, []);

    const handleSubscribe = useCallback(() => {
        setSubscriptionCodeModalOpen(true);
    }, []);

    const handleVerifyCode = useCallback((code: string) => {
        setSubscriptionCodeModalOpen(false);
        if (code === '123456') {
            setIsSubscribed(true);
            alert("Subscription successful! You now have PRO access.");
            navigateToDashboard();
        } else {
            alert("Invalid subscription code.");
        }
    }, [navigateToDashboard]);
    
    const navigateToSectors = useCallback(() => {
        setView('sectors');
    }, []);

    const navigateToBasket = useCallback((basketName: string) => {
        setSelectedBasketName(basketName);
        setView('basket-portfolio');
    }, []);

    const navigateToStock = useCallback((ticker: string, source: StockNavigationSource) => {
        setSelectedTicker(ticker);
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
        const investedBasketNames = investments.map(b => b.name);
        switch (view) {
            case 'home':
                return <HomeView onNavigateToDashboard={navigateToDashboard} onOpenAuthModal={handleOpenAuthModal} />;
            case 'dashboard':
                return <DashboardView onNavigateToBasket={protectedNavigateToBasket} onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'dashboard')} onOpenNewsModal={openNewsModal} onNavigateToPortfolio={navigateToPortfolio} watchlistedBaskets={watchlistedBaskets} watchlistedStocks={watchlistedStocks} onNavigateToSectors={navigateToSectors} />;
            case 'explore':
                return <ExploreBasketsView onNavigateToBasket={protectedNavigateToBasket} investedBasketNames={investedBasketNames} />;
            case 'news':
                return <NewsView onOpenNewsModal={openNewsModal} />;
            case 'portfolio':
                return <PortfolioView 
                    onNavigateToBasket={protectedNavigateToBasket} 
                    onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'portfolio')} 
                    defaultTab={portfolioWatchlistTab} 
                    investments={investments} 
                    archivedBaskets={archivedBaskets}
                    watchlistedBaskets={watchlistedBaskets} 
                    watchlistedStocks={watchlistedStocks}
                    onSaveCustomBasket={handleSaveCustomBasket}
                />;
            case 'how-it-works':
                return <HowItWorksView />;
            case 'subscribe':
                return <SubscribeView onSubscribe={handleSubscribe} />;
            case 'sectors':
                return <SectorsView onBack={navigateToDashboard} />;
            case 'basket-portfolio':
                const basketData = selectedBasketName ? allBaskets[selectedBasketName] : null;
                return basketData && selectedBasketName ? (
                    <BasketPortfolioView
                        basketName={selectedBasketName}
                        basketData={basketData}
                        onBack={navigateToDashboard}
                        isInvested={investedBasketNames.includes(selectedBasketName)}
                        onInvest={handleInvest}
                        onSell={handleSell}
                        isWatchlisted={watchlistedBaskets.includes(selectedBasketName)}
                        onToggleWatchlist={handleToggleBasketWatchlist}
                    />
                ) : null;
            case 'stock-terminal':
                 const stockDetails = selectedTicker ? mockWhyData[selectedTicker] : null;
                return stockDetails && selectedTicker ? (
                    <StockTerminalView
                        ticker={selectedTicker}
                        details={stockDetails}
                        onBack={handleBackFromTerminal}
                        onNavigateToBasket={protectedNavigateToBasket}
                        onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, navigationSource)}
                        isWatchlisted={watchlistedStocks.includes(selectedTicker)}
                        onToggleWatchlist={handleToggleStockWatchlist}
                    />
                ) : null;
            default:
                return <HomeView onNavigateToDashboard={navigateToDashboard} onOpenAuthModal={handleOpenAuthModal} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-screen font-sans">
            <Header currentView={view} onNavigateToHome={navigateToHome} onNavigateToDashboard={navigateToDashboard} onNavigateToExplore={navigateToExplore} onNavigateToNews={navigateToNews} onNavigateToPortfolio={navigateToPortfolio} onNavigateToHowItWorks={navigateToHowItWorks} onNavigateToSubscribe={navigateToSubscribe} onOpenAuthModal={handleOpenAuthModal} currentUser={currentUser} onLogout={handleLogout} />
            {view !== 'home' && currentUser && <MarketTicker />}
            <main className="flex flex-1">
                <div key={view} className="flex-1 animate-main-content-fade-in w-full">
                    {renderView()}
                </div>
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
            <SubscriptionCodeModal
                isOpen={isSubscriptionCodeModalOpen}
                onClose={() => setSubscriptionCodeModalOpen(false)}
                onSubmitCode={handleVerifyCode}
            />
        </div>
    );
};

export default App;