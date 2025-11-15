import React, { useEffect } from 'react';
import GlassPane from '../components/ui/GlassPane';

// A helper for feature sections
const FeatureSection: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
    imageSide?: 'left' | 'right';
}> = ({ icon, title, description, children, className = '', imageSide = 'right' }) => (
    <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 ${className}`}>
        <div className={`space-y-4 ${imageSide === 'left' ? 'md:order-2' : ''}`}>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-200 dark:border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
        <div className={imageSide === 'left' ? 'md:order-1' : ''}>
            {children}
        </div>
    </div>
);

const ProFeaturesView: React.FC = () => {
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
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => { if(el) observer.unobserve(el) });
    }, []);

    return (
        <div className="flex-1 w-full bg-beige-50 dark:bg-black/10">
             {/* Hero Section */}
             <section className="min-h-[60vh] w-full flex flex-col items-center justify-center relative text-white text-center px-4 py-16">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/80 to-purple-900/80 animate-aurora z-0"></div>
                <div className="absolute inset-0 bg-black/30 z-0"></div>
                
                <div className="z-10 animate-fade-in-up">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-bold text-cyan-200 bg-cyan-900/50 rounded-full border border-cyan-600">
                        PRO
                    </div>
                    <h1 className="text-5xl md:text-6xl font-lora italic font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-cyan-300">
                        Power-Up Your Portfolio
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                        You've unlocked the full suite of QuantCrate tools. Here’s a look at what you can do.
                    </p>
                </div>
            </section>
            
            {/* Features Showcase */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                 <FeatureSection
                    className="animate-on-scroll"
                    title="Full Basket Control"
                    description="Your strategy, your rules. Go beyond our curated baskets by editing them to fit your exact vision. Add promising new stocks or remove underperformers with a few clicks. Your portfolio is now truly yours to command."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    imageSide="right"
                >
                    <GlassPane className="p-4 h-56 flex items-center justify-center" interactiveGlow>
                        <p className="text-center font-mono text-lg text-gray-500 dark:text-gray-400">
                           [ My Basket ] &rarr; Edit &rarr; <span className="text-green-500">[ +ADD ]</span> / <span className="text-red-500">[ -REMOVE ]</span>
                        </p>
                    </GlassPane>
                </FeatureSection>
                
                 <FeatureSection
                    className="animate-on-scroll delay-1"
                    title="Deep-Dive Analytics"
                    description="Curiosity is an investor's greatest asset. Click on any performance chart to open a detailed modal. Compare your basket against its individual components, analyze volatility, and understand risk-adjusted returns like a pro."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
                    imageSide="left"
                >
                    <GlassPane className="p-4 h-56 flex items-center justify-center" interactiveGlow>
                         <p className="text-center font-mono text-lg text-gray-500 dark:text-gray-400">
                           [ Performance Chart ] &rarr; Click &rarr; [ Detailed Modal ]
                        </p>
                    </GlassPane>
                </FeatureSection>

                 <FeatureSection
                    className="animate-on-scroll delay-2"
                    title="Complete Transparency"
                    description="Track every move. Edited baskets are clearly marked, with a history dropdown showing exactly what was added or removed. Plus, every investment is timestamped, so you always know your entry point."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    imageSide="right"
                >
                     <GlassPane className="p-4 h-56 flex items-center justify-center" interactiveGlow>
                         <p className="text-center font-mono text-lg text-gray-500 dark:text-gray-400">
                           [ Basket Name ] &rarr; <span className="text-yellow-500">[ Edited &#9662; ]</span>
                        </p>
                    </GlassPane>
                </FeatureSection>
                
                <FeatureSection
                    className="animate-on-scroll delay-1"
                    title="Advanced Backtesting Engine"
                    description="Don't just invest, stress-test. Our powerful backtesting engine lets you see how your custom baskets or edited strategies would have performed through different market conditions, giving you data-backed confidence."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 10H2m2-4H2m4-2V2m4 2V2" /></svg>}
                    imageSide="left"
                >
                    <GlassPane className="p-4 h-56 flex items-center justify-center" interactiveGlow>
                        <p className="text-center font-mono text-lg text-gray-500 dark:text-gray-400">
                           [ Strategy ] &rarr; Run Backtest &rarr; [ Performance Report ]
                        </p>
                    </GlassPane>
                </FeatureSection>

                <FeatureSection
                    className="animate-on-scroll delay-2"
                    title="AI-Powered Stock Screener"
                    description="Move beyond pre-made baskets and become the architect of your own strategy. Use our intuitive screener to filter the entire market based on the quantitative factors that matter to you—from momentum to value to quality."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>}
                    imageSide="right"
                >
                    <GlassPane className="p-4 h-56 flex items-center justify-center" interactiveGlow>
                        <p className="text-center font-mono text-lg text-gray-500 dark:text-gray-400">
                           FILTER: Momentum &gt; 70 AND ROE &gt; 15%
                        </p>
                    </GlassPane>
                </FeatureSection>

                <FeatureSection
                    className="animate-on-scroll delay-3"
                    title="Exclusive Research & Insights"
                    description="Get an edge with our members-only content. Pro users receive access to our weekly quant reports, deep-dive articles on market trends, and exclusive commentary on basket performance and rebalancing decisions."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    imageSide="left"
                >
                     <GlassPane className="p-4 h-56 flex items-center justify-center" interactiveGlow>
                         <p className="text-center font-mono text-lg text-gray-500 dark:text-gray-400">
                           [ Weekly Quant Report ]
                        </p>
                    </GlassPane>
                </FeatureSection>
            </main>
        </div>
    );
};

export default ProFeaturesView;