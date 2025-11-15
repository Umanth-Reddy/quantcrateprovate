
import React, { useState } from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';

interface OnboardingTourProps {
    onClose: () => void;
}

const tourSteps = [
    {
        title: "Welcome to QuantCrate!",
        content: "Let's take a quick tour to show you how to get the most out of your dashboard.",
    },
    {
        title: "Curated & Trending Baskets",
        content: "Here you'll find baskets created by our AI based on quantitative strategies. These are great starting points for discovering new opportunities.",
    },
    {
        title: "Market Movers & News",
        content: "Stay on top of the market with real-time gainers, losers, and the latest financial news that could impact your portfolio.",
    },
    {
        title: "AI Signal of the Day",
        content: "Our AI scans the market for the strongest signal of the day. It's a great way to discover stocks with high potential.",
    },
    {
        title: "Your Watchlist",
        content: "Keep track of interesting stocks and baskets here. You can easily add or remove items as you explore the platform.",
    },
    {
        title: "You're All Set!",
        content: "That's the basics! You're ready to start exploring. Remember to check out the 'How It Works' section for a deeper dive.",
    },
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onClose }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const isLastStep = stepIndex === tourSteps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            onClose();
        } else {
            setStepIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        setStepIndex(prev => Math.max(0, prev - 1));
    };

    const currentStep = tourSteps[stepIndex];

    return (
        <Modal isOpen={true} onClose={onClose}>
             <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-8 max-w-md w-full relative">
                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{currentStep.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[60px]">{currentStep.content}</p>
                </div>

                <div className="flex items-center justify-center space-x-2 my-4">
                    {tourSteps.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${index === stepIndex ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button 
                        onClick={handlePrev} 
                        disabled={stepIndex === 0}
                        className="bg-stone-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-stone-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNext}
                        className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20"
                    >
                        {isLastStep ? 'Finish Tour' : 'Next'}
                    </button>
                </div>

            </GlassPane>
        </Modal>
    );
};

export default OnboardingTour;
