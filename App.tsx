
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
import ProFeaturesView from './views/ProFeaturesView';
import SectorsView from './views/SectorsView';
import NewsModal from './components/NewsModal';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import SubscriptionCodeModal from './components/SubscriptionCodeModal';
import CreateEditBasketModal from './components/CreateEditBasketModal';
import PerformanceDetailModal from './components/PerformanceDetailModal';
import Footer from './components/Footer';
import OnboardingTour from './components/OnboardingTour';
import type { View, Basket, StockDetails, NewsItem, StockNavigationSource, User, PortfolioBasket } from './types';
import { mockBasketData, mockWhyData, mockInvestedBasketsData } from './data/mockData';
import { generateNewBasket, generateNewPortfolioBasket } from './utils/basketUtils';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [allBaskets, setAllBaskets] = useState<{ [key: string]: Basket }>(mockBasketData);
    const [selectedBasketName, setSelectedBasketName] = useState<string | null>(null);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [navigationSource, setNavigationSource] = useState<StockNavigationSource>('dashboard');
    const [basketNavigationSource, setBasketNavigationSource] = useState<View>('dashboard');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [portfolioWatchlistTab, setPortfolioWatchlistTab] = useState<'stocks' | 'baskets'>('baskets');
    const [authModal, setAuthModal] = useState<{isOpen: boolean; mode: 'login' | 'signup'}>({isOpen: false, mode: 'login'});
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isFooterExpanded, setIsFooterExpanded] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);


    // --- Modals State ---
    const [editModalState, setEditModalState] = useState<{isOpen: boolean; basketName?: string}>({ isOpen: false });
    const [isPerfDetailModalOpen, setPerfDetailModalOpen] = useState<boolean>(false);

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

    const isProAccess = isSubscribed || currentUser?.role === 'admin';

    const handleFooterToggle = useCallback(() => {
        setIsFooterExpanded(prev => !prev);
    }, []);

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
        if (investments.some(b => b.name === basketName)) return;

        const archived = archivedBaskets.find(b => b.name === basketName);
        if (archived) {
            setInvestments(prev => [...prev, archived]);
            setArchivedBaskets(prev => prev.filter(b => b.name !== basketName));
        } else {
            const newPortfolioBasket = generateNewPortfolioBasket(basketName);
            setInvestments(prev => [...prev, newPortfolioBasket]);
        }
    };

    const handleSell = (basketName: string) => {
        const basketToArchive = investments.find(b => b.name === basketName);
        if (basketToArchive) {
            setInvestments(prev => prev.filter(b => b.name !== basketName));
            if (!archivedBaskets.some(b => b.name === basketName)) {
                 setArchivedBaskets(prev => [...prev, basketToArchive]);
            }
        }
    };
    
    const handleSaveBasket = (basketName: string, stocks: { ticker: string; value: number }[], isEditing: boolean) => {
        const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
        
        const newStocksWithDetails = stocks.map(stock => {
            const stockDetail = mockWhyData[stock.ticker];
            return {
                ticker: stock.ticker,
                summary: stockDetail?.checklist[0]?.rule || 'Custom stock',
                weight: totalValue > 0 ? parseFloat(((stock.value / totalValue) * 100).toFixed(2)) : 0,
                value: `₹${stock.value.toLocaleString('en-IN')}`
            };
        });

        if (isEditing) {
            setAllBaskets(prev => {
                const originalBasket = prev[basketName];
                return {
                    ...prev,
                    [basketName]: {
                        ...originalBasket,
                        originalStocks: originalBasket.originalStocks || originalBasket.stocks,
                        stocks: newStocksWithDetails,
                        isEdited: true,
                    }
                };
            });
        } else {
            const newBasket = generateNewBasket(basketName, newStocksWithDetails);
            const newPortfolioBasket = generateNewPortfolioBasket(basketName, totalValue);
            
            setAllBaskets(prev => ({...prev, [basketName]: newBasket}));
            setInvestments(prev => [...prev, newPortfolioBasket]);
            navigateToBasket(basketName, 'portfolio');
        }
        setEditModalState({ isOpen: false });
    };

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
        
        const hasOnboarded = localStorage.getItem('hasOnboarded');
        if (!hasOnboarded) {
            setShowOnboarding(true);
            localStorage.setItem('hasOnboarded', 'true');
        }

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

    const handleExploreDashboardClick = useCallback(() => {
        if (currentUser) {
            navigateToDashboard();
        } else {
            handleOpenAuthModal('login');
        }
    }, [currentUser, navigateToDashboard, handleOpenAuthModal]);

    const navigateToPortfolio = useCallback(() => {
        setView('portfolio');
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

    const navigateToSubscribeOrPro = useCallback(() => {
        if (!currentUser) {
            handleOpenAuthModal('login');
            return;
        }
        
        setView(isProAccess ? 'pro-features' : 'subscribe');

        setSubscriptionModalOpen(false);
        setSelectedBasketName(null);
        setSelectedTicker(null);
    }, [currentUser, isProAccess, handleOpenAuthModal]);


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
    
    const navigateToBasket = useCallback((basketName: string, source: View) => {
        setBasketNavigationSource(source);
        setSelectedBasketName(basketName);
        setView('basket-portfolio');
    }, []);

    const navigateToStock = useCallback((ticker: string, source: StockNavigationSource) => {
        setSelectedTicker(ticker);
        setNavigationSource(source);
        setView('stock-terminal');
    }, []);

    const protectedNavigateToBasket = (basketName: string, source: View) => handleProtectedAction(() => navigateToBasket(basketName, source));
    const protectedNavigateToStock = (ticker: string, source: StockNavigationSource) => handleProtectedAction(() => navigateToStock(ticker, 'dashboard'));

    const handleBackFromTerminal = useCallback(() => {
        if (navigationSource === 'basket' && selectedBasketName) {
            setView('basket-portfolio');
            setSelectedTicker(null);
        } else if (navigationSource === 'portfolio') {
            navigateToPortfolio();
        }
        else {
            navigateToDashboard();
        }
    }, [navigationSource, selectedBasketName, navigateToDashboard, navigateToPortfolio]);

    const handleBackFromBasket = useCallback(() => {
        // If we came from a stock terminal, go back to it, keeping the ticker selected.
        if (basketNavigationSource === 'stock-terminal') {
            setView('stock-terminal');
            setSelectedBasketName(null);
            return;
        }

        setSelectedTicker(null);
        setSelectedBasketName(null);
        switch (basketNavigationSource) {
            case 'explore': navigateToExplore(); break;
            case 'portfolio': navigateToPortfolio(); break;
            case 'dashboard':
            default:
                navigateToDashboard();
                break;
        }
    }, [basketNavigationSource, navigateToExplore, navigateToPortfolio, navigateToDashboard]);
    
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
                return <HomeView onNavigateToDashboard={handleExploreDashboardClick} onOpenAuthModal={handleOpenAuthModal} />;
            case 'dashboard':
                return <DashboardView onNavigateToBasket={(name) => protectedNavigateToBasket(name, 'dashboard')} onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'dashboard')} onOpenNewsModal={openNewsModal} onNavigateToPortfolio={() => navigateToPortfolio()} watchlistedBaskets={watchlistedBaskets} watchlistedStocks={watchlistedStocks} onNavigateToSectors={navigateToSectors} />;
            case 'explore':
                return <ExploreBasketsView onNavigateToBasket={(name) => protectedNavigateToBasket(name, 'explore')} investedBasketNames={investedBasketNames} />;
            case 'news':
                return <NewsView onOpenNewsModal={openNewsModal} />;
            case 'portfolio':
                return <PortfolioView 
                    onNavigateToBasket={(name) => protectedNavigateToBasket(name, 'portfolio')} 
                    onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'portfolio')} 
                    defaultTab={portfolioWatchlistTab} 
                    investments={investments} 
                    archivedBaskets={archivedBaskets}
                    watchlistedBaskets={watchlistedBaskets} 
                    watchlistedStocks={watchlistedStocks}
                    onOpenCreateModal={() => setEditModalState({ isOpen: true })}
                />;
            case 'how-it-works':
                return <HowItWorksView />;
            case 'subscribe':
                return <SubscribeView onSubscribe={handleSubscribe} />;
            case 'pro-features':
                return <ProFeaturesView />;
            case 'sectors':
                return <SectorsView onBack={navigateToDashboard} />;
            case 'basket-portfolio':
                const basketData = selectedBasketName ? allBaskets[selectedBasketName] : null;
                const portfolioInfo = investments.find(b => b.name === selectedBasketName);
                return basketData && selectedBasketName ? (
                    <BasketPortfolioView
                        basketName={selectedBasketName}
                        basketData={basketData}
                        onBack={handleBackFromBasket}
                        isInvested={investedBasketNames.includes(selectedBasketName)}
                        investmentDate={portfolioInfo?.investmentDate}
                        onInvest={handleInvest}
                        onSell={handleSell}
                        isWatchlisted={watchlistedBaskets.includes(selectedBasketName)}
                        onToggleWatchlist={handleToggleBasketWatchlist}
                        onOpenEditModal={() => setEditModalState({ isOpen: true, basketName: selectedBasketName })}
                        onOpenPerfDetailModal={() => setPerfDetailModalOpen(true)}
                    />
                ) : null;
            case 'stock-terminal':
                 const stockDetails = selectedTicker ? mockWhyData[selectedTicker] : null;
                return stockDetails && selectedTicker ? (
                    <StockTerminalView
                        ticker={selectedTicker}
                        details={stockDetails}
                        onBack={handleBackFromTerminal}
                        onNavigateToBasket={(name) => protectedNavigateToBasket(name, 'stock-terminal')}
                        onNavigateToStock={(ticker) => protectedNavigateToStock(ticker, 'basket')}
                        isWatchlisted={watchlistedStocks.includes(selectedTicker)}
                        onToggleWatchlist={handleToggleStockWatchlist}
                    />
                ) : null;
            default:
                return <HomeView onNavigateToDashboard={handleExploreDashboardClick} onOpenAuthModal={handleOpenAuthModal} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-screen font-sans">
            <Header currentView={view} onNavigateToHome={navigateToHome} onNavigateToDashboard={navigateToDashboard} onNavigateToExplore={navigateToExplore} onNavigateToNews={navigateToNews} onNavigateToPortfolio={navigateToPortfolio} onNavigateToHowItWorks={navigateToHowItWorks} onNavigateToSubscribeOrPro={navigateToSubscribeOrPro} onOpenAuthModal={handleOpenAuthModal} currentUser={currentUser} onLogout={handleLogout} isProAccess={isProAccess} />
            {view !== 'home' && currentUser && <MarketTicker />}
            <main className={`flex flex-1 transition-all duration-500 ${isFooterExpanded ? 'pb-48' : 'pb-12'}`}>
                <div key={view} className="flex-1 animate-main-content-fade-in w-full">
                    {renderView()}
                </div>
            </main>
            <Footer 
                isExpanded={isFooterExpanded}
                onToggle={handleFooterToggle}
                onNavigateToHowItWorks={navigateToHowItWorks}
                onNavigateToSubscribeOrPro={navigateToSubscribeOrPro}
            />
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
                onNavigateToSubscribe={navigateToSubscribeOrPro}
            />
            <SubscriptionCodeModal
                isOpen={isSubscriptionCodeModalOpen}
                onClose={() => setSubscriptionCodeModalOpen(false)}
                onSubmitCode={handleVerifyCode}
            />
             <CreateEditBasketModal
                isOpen={editModalState.isOpen}
                onClose={() => setEditModalState({ isOpen: false })}
                onSave={handleSaveBasket}
                initialBasketName={editModalState.basketName}
                allBaskets={allBaskets}
            />
            {selectedBasketName && allBaskets[selectedBasketName] && (
                <PerformanceDetailModal
                    isOpen={isPerfDetailModalOpen}
                    onClose={() => setPerfDetailModalOpen(false)}
                    basketName={selectedBasketName}
                    stocks={allBaskets[selectedBasketName].stocks}
                />
            )}
            {view === 'dashboard' && showOnboarding && <OnboardingTour onClose={() => setShowOnboarding(false)} />}
        </div>
    );
};

export default App;
