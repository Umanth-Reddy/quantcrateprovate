
import React from 'react';

interface FooterProps {
    onNavigateToHowItWorks: () => void;
    onNavigateToSubscribeOrPro: () => void;
    isExpanded: boolean;
    onToggle: () => void;
}

const FooterLink: React.FC<{ onClick?: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}
        className="text-gray-400 hover:text-cyan-300 transition-colors text-xs font-medium"
    >
        {children}
    </button>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ onNavigateToHowItWorks, onNavigateToSubscribeOrPro, isExpanded, onToggle }) => {
    return (
        <footer 
            onClick={onToggle}
            className={`fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white border-t border-cyan-400/20 z-30 transition-all duration-500 ease-in-out ${isExpanded ? 'h-48' : 'h-12'} cursor-pointer`}
        >
            {/* COMPACT VIEW */}
            <div className={`h-full transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-6">
                        <p className="text-xs text-gray-500">© 2025 QuantCrate</p>
                        <div className="hidden sm:flex items-center space-x-6">
                            <FooterLink onClick={() => alert('About page coming soon!')}>About</FooterLink>
                            <FooterLink onClick={onNavigateToSubscribeOrPro}>Pricing</FooterLink>
                            <FooterLink onClick={onNavigateToHowItWorks}>Our Methodology</FooterLink>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                         <FooterLink onClick={() => alert('Disclaimer page coming soon!')}>Disclaimer</FooterLink>
                         <FooterLink onClick={() => alert('Terms page coming soon!')}>Terms</FooterLink>
                         <FooterLink onClick={() => alert('Privacy page coming soon!')}>Privacy</FooterLink>
                         <FooterLink onClick={() => alert('Bug Bounty program coming soon!')}>Bug Bounty</FooterLink>
                    </div>
                </div>
            </div>

            {/* EXPANDED VIEW */}
            <div className={`absolute inset-0 px-8 py-6 flex flex-col justify-between transition-opacity duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Top Part */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-white font-mono tracking-tighter">QUANTCRATE</h2>
                        <p className="text-xs text-gray-400 mt-1 max-w-xs">Smarter Investing. Quantified.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SocialIcon href="https://github.com">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </SocialIcon>
                        <SocialIcon href="https://x.com">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </SocialIcon>
                        <SocialIcon href="https://instagram.com">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </SocialIcon>
                        <SocialIcon href="https://linkedin.com">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </SocialIcon>
                    </div>
                </div>
                {/* Bottom Part */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <p>© 2025 QuantCrate, Inc. All Rights Reserved.</p>
                    <div className="flex items-center space-x-6">
                        <FooterLink onClick={() => alert('Disclaimer page coming soon!')}>Disclaimer</FooterLink>
                        <FooterLink onClick={() => alert('Terms page coming soon!')}>Terms</FooterLink>
                        <FooterLink onClick={() => alert('Privacy page coming soon!')}>Privacy</FooterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
