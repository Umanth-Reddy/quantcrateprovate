
import React, { useState, useEffect } from 'react';
import type { View } from '../types';

interface HeaderProps {
    currentView: View;
    onNavigateToHome: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToExplore: () => void;
    onNavigateToNews: () => void;
}

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button onClick={toggleTheme} className="text-gray-300 hover:text-cyan-300 p-2 rounded-full hover:bg-gray-900/50 transition-colors">
            {isDark ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12H.75m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25 2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25A2.25 2.25 0 0012 12z" />
                </svg>
            ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.25-4.502z" />
                </svg>
            )}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ currentView, onNavigateToHome, onNavigateToDashboard, onNavigateToExplore, onNavigateToNews }) => {
    const navLinkClasses = "text-gray-300 hover:bg-gray-900/50 hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium";
    const activeNavLinkClasses = "bg-cyan-600/30 text-cyan-100 border border-cyan-500/50 px-3 py-2 rounded-md text-sm font-medium";
    
    return (
        <header className="bg-black/50 backdrop-blur-md text-white sticky top-0 z-40 border-b border-cyan-400/20 flex-shrink-0">
            <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-8">
                    <button onClick={onNavigateToHome}>
                        <h1 className="text-2xl font-bold text-white font-mono tracking-tighter">QUANTCRATE</h1>
                    </button>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4">
                             <button onClick={onNavigateToHome} className={currentView === 'home' ? activeNavLinkClasses : navLinkClasses}>
                                Home
                            </button>
                            <button onClick={onNavigateToDashboard} className={currentView === 'dashboard' ? activeNavLinkClasses : navLinkClasses}>
                                Dashboard
                            </button>
                            <button onClick={onNavigateToExplore} className={currentView === 'explore' ? activeNavLinkClasses : navLinkClasses}>
                                Explore Baskets
                            </button>
                             <button onClick={onNavigateToNews} className={currentView === 'news' ? activeNavLinkClasses : navLinkClasses}>
                                News
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {currentView !== 'home' && (
                        <button onClick={() => window.location.reload()} className="flex items-center text-gray-300 hover:text-cyan-300 hover:bg-gray-900/50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7V9a1 1 0 01-2 0V3a1 1 0 011-1zm10 10a1 1 0 011-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13v-2a1 1 0 012 0v6a1 1 0 01-1 1h-6a1 1 0 110-2h3.899z" clipRule="evenodd" />
                            </svg>
                            Refresh Baskets
                        </button>
                    )}
                    <button className="text-sm font-medium bg-gray-700/50 hover:bg-gray-600/50 border border-gray-500/50 px-4 py-2 rounded-md text-white transition-colors">
                        Login
                    </button>
                    <button className="text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-black px-4 py-2 rounded-md transition-colors shadow-md shadow-cyan-600/20">
                        Sign Up
                    </button>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Header;