
import React, { useEffect } from 'react';
import GlassPane from '../components/ui/GlassPane';

interface SubscribeViewProps {
    onSubscribe: () => void;
}

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PlanFeature: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-center space-x-3">
        <CheckIcon className="text-cyan-500 flex-shrink-0" />
        <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </li>
);

const SubscribeView: React.FC<SubscribeViewProps> = ({ onSubscribe }) => {
    
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-beige-50 dark:bg-black/10">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 animate-on-scroll">
                    <h1 className="text-4xl md:text-5xl font-lora italic font-bold text-gray-900 dark:text-white mb-2">Find Your Edge.</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Our plans are designed to give you the tools you need, whether you're just starting or you're a seasoned trader.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Free Plan */}
                    <GlassPane className="p-8 flex flex-col animate-on-scroll delay-1">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Free</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Get a feel for the market with our essential tools.</p>
                        
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">₹0</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">/ month</span>
                        </div>

                        <button disabled className="w-full text-center py-3 rounded-lg font-semibold bg-stone-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-default">
                            Your Current Plan
                        </button>

                        <ul className="space-y-4 mt-8 text-left">
                            <PlanFeature text="Market Dashboard Access" />
                            <PlanFeature text="View Market Movers & News" />
                            <PlanFeature text="Create Personal Watchlists" />
                        </ul>
                    </GlassPane>
                    
                    {/* Pro Plan */}
                    <GlassPane className="p-8 flex flex-col border-2 border-cyan-500/50 dark:border-cyan-400/50 shadow-glow-cyan relative animate-on-scroll delay-2" interactiveGlow>
                         <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                            <div className="px-4 py-1 text-sm font-bold text-cyan-700 dark:text-cyan-200 bg-cyan-100 dark:bg-cyan-900/50 rounded-full border border-cyan-300 dark:border-cyan-600">
                                MOST POPULAR
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-cyan-500 dark:text-cyan-300">PRO</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Unlock our full suite of quant tools for a data-driven edge.</p>
                        
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">₹999</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">/ month</span>
                        </div>

                        <button onClick={onSubscribe} className="w-full text-center py-3 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-500 text-black shadow-md shadow-cyan-600/30 transition-transform hover:scale-105">
                            Subscribe Now
                        </button>

                        <ul className="space-y-4 mt-8 text-left flex-grow">
                             <PlanFeature text="Everything in Free, plus:" />
                             <PlanFeature text="Explore All Curated Baskets" />
                             <PlanFeature text="AI-Powered Stock Analysis ('Why' Score)" />
                             <PlanFeature text="AI Signal of the Day" />
                             <PlanFeature text="Create, Edit & Manage Custom Baskets" />
                             <PlanFeature text="Detailed Performance Analytics" />
                             <PlanFeature text="Track Investment & Edit History" />
                             <PlanFeature text="Advanced Backtesting Tools" />
                             <PlanFeature text="Priority Support" />
                        </ul>
                    </GlassPane>
                </div>
            </div>
        </div>
    );
};

export default SubscribeView;
