import React from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigateToSubscribe: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onNavigateToSubscribe }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-8 max-w-lg w-full relative text-center">
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-100 dark:bg-cyan-900/50 border border-cyan-300 dark:border-cyan-600 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600 dark:text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Upgrade to Pro to Access
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Unlock deep-dive analysis, AI scores, and curated baskets by upgrading your account.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={onClose} className="w-full sm:w-auto bg-stone-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-stone-300 dark:hover:bg-gray-600">
                        Maybe Later
                    </button>
                     <button onClick={onNavigateToSubscribe} className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg transition-colors shadow-md shadow-cyan-600/20">
                        View Plans
                    </button>
                </div>
            </GlassPane>
        </Modal>
    );
};

export default SubscriptionModal;
