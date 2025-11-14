import React, { useState } from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';

interface SubscriptionCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitCode: (code: string) => void;
}

const SubscriptionCodeModal: React.FC<SubscriptionCodeModalProps> = ({ isOpen, onClose, onSubmitCode }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            onSubmitCode(code);
            setIsLoading(false);
            setCode('');
        }, 500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-8 max-w-md w-full relative">
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enter Subscription Code</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Enter the code provided to activate your PRO subscription.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g., 123456"
                        className="block w-full text-center tracking-[.5em] font-mono text-lg px-3 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100"
                    />
                    <button
                        type="submit"
                        disabled={!code.trim() || isLoading}
                        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Subscribe'}
                    </button>
                </form>
            </GlassPane>
        </Modal>
    );
};

export default SubscriptionCodeModal;
