import React from 'react';
import GlassPane from '../components/ui/GlassPane';

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PlanFeature: React.FC<{ text: string; free: boolean; pro: boolean }> = ({ text, free, pro }) => (
    <div className="flex items-center py-3 border-b border-stone-200 dark:border-purple-400/20 last:border-b-0">
        <span className="flex-grow text-gray-700 dark:text-gray-300">{text}</span>
        <div className="w-24 text-center">
            {free ? <CheckIcon className="text-gray-400 dark:text-gray-500 mx-auto" /> : <span className="text-gray-400 dark:text-gray-500 font-bold">-</span>}
        </div>
        <div className="w-24 text-center">
            {pro && <CheckIcon className="text-cyan-500 mx-auto" />}
        </div>
    </div>
);

const SubscribeView: React.FC = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-lora italic font-bold text-gray-900 dark:text-white mb-2">Unlock Your Full Potential</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Choose the plan that's right for your investment journey.</p>
                </div>

                <GlassPane className="p-4 sm:p-8" interactiveGlow>
                    <div className="flex justify-end mb-4">
                        <div className="w-24 text-center">
                            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Free</h3>
                        </div>
                        <div className="w-24 text-center">
                            <div className="inline-block px-3 py-1 text-sm font-bold text-cyan-700 dark:text-cyan-200 bg-cyan-100 dark:bg-cyan-900/50 rounded-full border border-cyan-300 dark:border-cyan-600">
                                PRO
                            </div>
                        </div>
                    </div>

                    <PlanFeature text="Market Dashboard Access" free={true} pro={true} />
                    <PlanFeature text="View Market Movers & News" free={true} pro={true} />
                    <PlanFeature text="Create Personal Watchlists" free={true} pro={true} />
                    <PlanFeature text="Explore Curated Baskets" free={false} pro={true} />
                    <PlanFeature text="AI-Powered Stock Analysis ('Why' Score)" free={false} pro={true} />
                    <PlanFeature text="AI Signal of the Day" free={false} pro={true} />
                    <PlanFeature text="Create & Manage Custom Baskets" free={false} pro={true} />
                    <PlanFeature text="Advanced Backtesting Tools" free={false} pro={true} />
                    <PlanFeature text="Priority Support" free={false} pro={true} />

                    <div className="flex justify-end mt-8">
                        <div className="w-24 text-center">
                            <div className="font-bold text-2xl text-gray-900 dark:text-white">₹0</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">/ month</div>
                        </div>
                        <div className="w-24 text-center">
                            <div className="font-bold text-2xl text-gray-900 dark:text-white">₹999</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">/ month</div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                         <div className="w-24 text-center">
                            <button disabled className="w-full bg-stone-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-semibold py-2 px-4 rounded-lg cursor-default">
                                Current Plan
                            </button>
                        </div>
                        <div className="w-24 text-center">
                             <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </GlassPane>
            </div>
        </div>
    );
};

export default SubscribeView;
