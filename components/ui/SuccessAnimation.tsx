
import React from 'react';

interface SuccessAnimationProps {
    isOpen: boolean;
    message: string;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ isOpen, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
            <div className="bg-white/80 dark:bg-black/80 p-8 rounded-2xl border border-stone-200 dark:border-cyan-400/20 shadow-2xl flex flex-col items-center gap-4 animate-fade-in-up">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" className="stroke-current text-green-500/20" strokeWidth="2" />
                    <path
                        className="success-check stroke-current text-green-500 animate-draw-check"
                        d="M7 13l3 3 7-7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{message}</p>
            </div>
        </div>
    );
};

export default SuccessAnimation;
