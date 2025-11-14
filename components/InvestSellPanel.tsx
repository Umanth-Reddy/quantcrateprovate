
import React, { useState } from 'react';
import GlassPane from './ui/GlassPane';
import ConfirmationModal from './ui/ConfirmationModal';
import SuccessAnimation from './ui/SuccessAnimation';

interface InvestSellPanelProps {
    basketName: string;
    isInvested: boolean;
    onInvest: (basketName: string) => void;
    onSell: (basketName: string) => void;
}

const InvestSellPanel: React.FC<InvestSellPanelProps> = ({ basketName, isInvested, onInvest, onSell }) => {
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInvestClick = () => {
        setConfirmOpen(true);
    };

    const handleSellClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        setConfirmOpen(false);
        if (isInvested) {
            onSell(basketName);
            setSuccessMessage(`Successfully sold ${basketName}`);
        } else {
            onInvest(basketName);
            setSuccessMessage(`Successfully invested in ${basketName}`);
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <>
            <GlassPane className="p-6 sticky top-6" interactiveGlow>
                {isInvested ? (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Investment</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            You are currently invested in this basket. You can sell your position here.
                        </p>
                        <button 
                            onClick={handleSellClick}
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-red-600/20"
                        >
                            Sell Basket
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Invest?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Click below to add this basket to your portfolio and start tracking its performance.
                        </p>
                        <button 
                            onClick={handleInvestClick}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20"
                        >
                            Invest in Basket
                        </button>
                    </div>
                )}
            </GlassPane>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                title={isInvested ? `Confirm Sale` : `Confirm Investment`}
                message={`Are you sure you want to ${isInvested ? 'sell' : 'invest in'} the "${basketName}" basket?`}
                confirmText={isInvested ? 'Confirm Sale' : 'Confirm Investment'}
                confirmColor={isInvested ? 'red' : 'cyan'}
            />
            
            <SuccessAnimation
                isOpen={showSuccess}
                message={successMessage}
            />
        </>
    );
};

export default InvestSellPanel;
