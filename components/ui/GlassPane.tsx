
import React, { useRef } from 'react';

interface GlassPaneProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
    interactiveGlow?: boolean;
}

const GlassPane: React.FC<GlassPaneProps> = ({ children, className = '', hover = false, onClick, interactiveGlow = false }) => {
    const paneRef = useRef<HTMLDivElement>(null);

    const baseClasses = "bg-white dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20 shadow-lg transition-all duration-300 shadow-glow-beige-light dark:shadow-purple-500/10";
    const hoverClasses = hover ? "hover:scale-[1.01] dark:hover:border-purple-400/50 dark:hover:shadow-purple-500/20 hover:shadow-glow-beige-strong" : "";
    const interactiveClasses = interactiveGlow ? 'interactive-glow-pane' : '';

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!interactiveGlow || !paneRef.current) return;
        const rect = paneRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        paneRef.current.style.setProperty('--mouse-x', `${x}px`);
        paneRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div 
            ref={paneRef}
            className={`${baseClasses} ${hoverClasses} ${interactiveClasses} ${className}`} 
            onClick={onClick}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>
    );
};

export default GlassPane;