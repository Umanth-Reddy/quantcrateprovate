
import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: 'login' | 'signup';
}

const AuthInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input {...props} className="block w-full px-3 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
    </div>
);

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [dobError, setDobError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setDobError(null);
        }
    }, [isOpen, initialMode]);
    
    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(e.target.value);
        if (!e.target.value || isNaN(selectedDate.getTime())) {
            setDobError(null);
            return;
        }
        
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (selectedDate > cutoffDate) {
            setDobError('You must be at least 18 years old to sign up.');
        } else {
            setDobError(null);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'signup' && dobError) {
            return; // Don't submit if there's an age error
        }
        // Handle form submission logic here...
        console.log('Form submitted');
        onClose(); // Close modal on successful submission for now
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-8 max-w-md w-full relative">
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    {mode === 'login' ? 'Sign in to continue to QuantCrate.' : 'Start your data-driven journey.'}
                </p>

                <button className="w-full flex items-center justify-center py-2 px-4 border border-stone-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black/50 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-stone-50 dark:hover:bg-gray-900/50 transition-colors">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.494,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    Continue with Google
                </button>
                
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-stone-300 dark:border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-stone-500 dark:text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-stone-300 dark:border-gray-700"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <AuthInput id="full-name" label="Full Name" type="text" required />
                             <div>
                                <AuthInput id="dob" label="Date of Birth" type="date" required onChange={handleDobChange} max={new Date().toISOString().split("T")[0]}/>
                                {dobError && <p className="text-red-500 text-xs mt-1">{dobError}</p>}
                            </div>
                        </>
                    )}
                    <AuthInput id="email" label="Email Address" type="email" required />
                    <AuthInput id="password" label="Password" type="password" required />
                    
                    <button type="submit" disabled={!!dobError} className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
                        {mode === 'login' ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="font-medium text-cyan-600 hover:text-cyan-500">
                        {mode === 'login' ? 'Sign up' : 'Login'}
                    </button>
                </p>
            </GlassPane>
        </Modal>
    );
};

export default AuthModal;
