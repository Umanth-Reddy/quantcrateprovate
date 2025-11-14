
import React from 'react';

interface GlassPaneProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

const GlassPane: React.FC<GlassPaneProps> = ({ children, className = '', hover = false, onClick }) => {
    const baseClasses = "bg-white dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20 shadow-lg dark:shadow-purple-500/10 transition-all duration-300";
    const hoverClasses = hover ? "hover:shadow-xl hover:scale-[1.02] dark:hover:border-purple-400/50 dark:hover:shadow-purple-500/20" : "";

    return (
        <div className={`${baseClasses} ${hoverClasses} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default GlassPane;