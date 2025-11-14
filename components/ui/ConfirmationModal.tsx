
import React from 'react';
import Modal from './Modal';
import GlassPane from './GlassPane';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: 'cyan' | 'red';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmColor = 'cyan'
}) => {
    if (!isOpen) return null;
    
    const confirmButtonClasses = {
        cyan: 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-cyan-600/20',
        red: 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-8 max-w-md w-full relative">
                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-stone-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-stone-300 dark:hover:bg-gray-600">
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`font-semibold py-2 px-4 rounded-lg transition-colors shadow-md ${confirmButtonClasses[confirmColor]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </GlassPane>
        </Modal>
    );
};

export default ConfirmationModal;
