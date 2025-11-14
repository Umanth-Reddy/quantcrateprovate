
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-2xl mx-4"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
