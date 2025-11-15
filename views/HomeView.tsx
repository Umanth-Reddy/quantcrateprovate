
import React, { useEffect } from 'react';
import GlassPane from '../components/ui/GlassPane';

interface HomeViewProps {
    onNavigateToDashboard: () => void;
    onOpenAuthModal: (mode: 'signup') => void;
}

const FeatureIcon: React.FC<{ variant: 'brain' | 'chart' | 'search' }> = ({ variant }) => {
    const iconClasses = "h-8 w-8 text-cyan-600 dark:text-cyan-400";
    const icons = {
        brain: (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.648l.259 1.035.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 18l1.035.259a3.375 3.375 0 002.456 2.456z" />
            </svg>
        ),
        chart: (
             <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25l1.5 1.5L15 9.75" />
            </svg>
        ),
        search: (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
            </svg>
        )
    };
    return <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-gray-900/50 border border-stone-200 dark:border-cyan-400/20 flex items-center justify-center mb-4">{icons[variant]}</div>;
};

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToDashboard, onOpenAuthModal }) => {
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => {
                if(el) observer.unobserve(el)
            });
        }
    }, []);

    return (
        <div className="flex-1 w-full">
            {/* Hero Section */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative text-white text-center px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black animate-aurora z-0"></div>
                <div className="absolute inset-0 bg-black/30 z-0"></div>
                
                <div className="z-10 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-lora italic font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-cyan-300">
                        Smarter Investing. Quantified.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-12" style={{ animationDelay: '0.2s' }}>
                        Discover high-potential stock baskets, curated by AI and backed by transparent, data-driven signals.
                    </p>
                    <button onClick={onNavigateToDashboard} className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-cyan-600/30" style={{ animationDelay: '0.4s' }}>
                        Explore Dashboard
                    </button>
                </div>
                <div className="absolute bottom-10 z-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </a>
                </div>
            </section>
            
            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="animate-on-scroll">
                        <h2 className="text-4xl font-lora italic font-bold text-gray-900 dark:text-white mb-4">Why QuantCrate?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            We replace noise and speculation with clarity and evidence, so you can trade with confidence.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <GlassPane className="p-8 text-center animate-on-scroll delay-1">
                            <FeatureIcon variant="brain" />
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Curation</h3>
                            <p className="text-gray-600 dark:text-gray-400">Our engine scans thousands of stocks to find those matching rule-based strategies, from momentum to value.</p>
                        </GlassPane>
                        <GlassPane className="p-8 text-center animate-on-scroll delay-2">
                            <FeatureIcon variant="chart" />
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Data-Driven Signals</h3>
                            <p className="text-gray-600 dark:text-gray-400">Every stock is included for a reason. We provide a clear checklist of technical and fundamental signals that are met.</p>
                        </GlassPane>
                        <GlassPane className="p-8 text-center animate-on-scroll delay-3">
                            <FeatureIcon variant="search" />
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Total Transparency</h3>
                            <p className="text-gray-600 dark:text-gray-400">Dive deep into the "Why" behind each stock with our AI-powered score, fundamental data, and signal checklists.</p>
                        </GlassPane>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black/20">
                <div className="max-w-6xl mx-auto">
                     <h2 className="text-4xl font-lora italic font-bold text-gray-900 dark:text-white mb-12 text-center animate-on-scroll">A Simple, Powerful Workflow</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 animate-on-scroll delay-1">
                            <div className="text-5xl font-bold font-mono text-cyan-500 mb-4">1</div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Explore Curated Baskets</h3>
                            <p className="text-gray-600 dark:text-gray-400">Start with our regularly updated baskets, built on proven quantitative strategies like momentum, breakouts, and mean reversion.</p>
                        </div>
                         <div className="p-6 animate-on-scroll delay-2">
                            <div className="text-5xl font-bold font-mono text-cyan-500 mb-4">2</div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Analyze the "Why"</h3>
                            <p className="text-gray-600 dark:text-gray-400">Don't just see the stocks, understand them. Dive into our AI score, signal checklists, and fundamental data for each company.</p>
                        </div>
                         <div className="p-6 animate-on-scroll delay-3">
                            <div className="text-5xl font-bold font-mono text-cyan-500 mb-4">3</div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Act with Confidence</h3>
                            <p className="text-gray-600 dark:text-gray-400">Armed with evidence-backed insights, make informed decisions and integrate our findings into your trading strategy.</p>
                        </div>
                     </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-4xl mx-auto text-center animate-on-scroll">
                    <h2 className="text-4xl font-lora italic font-bold text-gray-900 dark:text-white mb-4">Ready to Take Control?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Stop guessing. Start making data-driven decisions. Sign up for free and unlock the power of quantitative analysis.
                    </p>
                    <button onClick={() => onOpenAuthModal('signup')} className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-cyan-600/30">
                        Sign Up for Free
                    </button>
                 </div>
            </section>

        </div>
    );
};

export default HomeView;