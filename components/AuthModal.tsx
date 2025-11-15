
import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: 'login' | 'signup';
    onLogin: (credentials: { email: string; password?: string; isGoogle?: boolean }) => Promise<void>;
}

const AuthInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input {...props} className="block w-full px-3 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
    </div>
);

const PasswordStrengthIndicator: React.FC<{ strength: number }> = ({ strength }) => {
    const strengthLevels = [
        { label: 'Weak', color: 'bg-red-500' },
        { label: 'Medium', color: 'bg-yellow-500' },
        { label: 'Strong', color: 'bg-green-500' }
    ];

    return (
        <div className="flex items-center space-x-2 mt-2">
            <div className="flex-grow grid grid-cols-3 gap-x-1 h-1.5">
                <div className={`rounded-full transition-colors ${strength > 0 ? strengthLevels[Math.min(strength - 1, 2)].color : 'bg-stone-200 dark:bg-gray-700'}`}></div>
                <div className={`rounded-full transition-colors ${strength > 1 ? strengthLevels[Math.min(strength - 1, 2)].color : 'bg-stone-200 dark:bg-gray-700'}`}></div>
                <div className={`rounded-full transition-colors ${strength > 2 ? strengthLevels[Math.min(strength - 1, 2)].color : 'bg-stone-200 dark:bg-gray-700'}`}></div>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-14 text-right">
                {strength > 0 && strengthLevels[Math.min(strength - 1, 2)].label}
            </span>
        </div>
    );
};

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onLogin }) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    
    const [emailError, setEmailError] = useState<string | null>(null);
    const [dobError, setDobError] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);


    const resetState = () => {
        setMode(initialMode);
        setIsLoading(false);
        setEmail('');
        setPassword('');
        setFullName('');
        setDob('');
        setEmailError(null);
        setDobError(null);
        setPasswordStrength(0);
        setShowPassword(false);
    };

    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
        } else {
            setTimeout(resetState, 300);
        }
    }, [isOpen, initialMode]);

    const validateEmail = (value: string) => {
        if (mode === 'login' && value.toLowerCase() === 'admin') {
            setEmailError(null);
            return true;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError('Please enter a valid email address.');
            return false;
        }
        setEmailError(null);
        return true;
    };

    const checkPasswordStrength = (pass: string) => {
        let score = 0;
        if (!pass) { setPasswordStrength(0); return; }
        if (pass.length > 7) score++;
        if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) score++;
        if (pass.match(/([0-9])/)) score++;
        setPasswordStrength(score);
    };

    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDob(val);
        const selectedDate = new Date(val);
        if (!val || isNaN(selectedDate.getTime())) { setDobError(null); return; }
        
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (selectedDate > cutoffDate) {
            setDobError('You must be at least 18 years old to sign up.');
        } else {
            setDobError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEmailValid = validateEmail(email);
        if (!isEmailValid || (mode === 'signup' && (dobError || passwordStrength < 2))) return;
        
        setIsLoading(true);
        try {
            await onLogin({ email, password });
            onClose();
        } catch (error) {
            console.error("Auth failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        console.log("Initiating Google OAuth flow...");
        try {
            await onLogin({ email: 'google.user@gmail.com', isGoogle: true });
            onClose();
        } catch (error) {
            console.error("Google login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isSignupDisabled = isLoading || !!dobError || passwordStrength < 2;

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

                <button onClick={handleGoogleAuth} disabled={isLoading} className="w-full flex items-center justify-center py-2 px-4 border border-stone-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black/50 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-stone-50 dark:hover:bg-gray-900/50 transition-colors">
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
                            <AuthInput id="full-name" label="Full Name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)} />
                             <div>
                                <AuthInput id="dob" label="Date of Birth" type="date" required onChange={handleDobChange} value={dob} max={new Date().toISOString().split("T")[0]}/>
                                {dobError && <p className="text-red-500 text-xs mt-1">{dobError}</p>}
                            </div>
                        </>
                    )}
                    <div>
                        <AuthInput id="email" label="Email Address" type="text" required value={email} onChange={e => setEmail(e.target.value)} onBlur={e => validateEmail(e.target.value)} />
                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                    </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={e => { setPassword(e.target.value); if(mode==='signup') checkPasswordStrength(e.target.value); }} className="block w-full pl-3 pr-10 py-2 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-300 dark:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400">
                                {showPassword ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                }
                            </button>
                        </div>
                        {mode === 'signup' && <PasswordStrengthIndicator strength={passwordStrength} />}
                    </div>

                     {mode === 'login' && (
                        <div className="text-right">
                            <button type="button" onClick={() => alert('Forgot Password flow initiated.')} className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
                                Forgot Password?
                            </button>
                        </div>
                    )}
                    
                    <button type="submit" disabled={mode === 'signup' ? isSignupDisabled : isLoading} className="w-full flex justify-center bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors shadow-md shadow-cyan-600/20 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
                        {isLoading ? <Spinner /> : (mode === 'login' ? 'Login' : 'Create Account')}
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
