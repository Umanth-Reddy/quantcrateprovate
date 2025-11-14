import React, { useState, useEffect, useRef } from 'react';
import GlassPane from '../components/ui/GlassPane';
import type { StockDetails, SubScore } from '../types';

interface StockTerminalViewProps {
    ticker: string;
    details: StockDetails;
    onBack: () => void;
    onNavigateToBasket: (basketName: string) => void;
    onNavigateToStock: (ticker: string) => void;
}

const AIScoreGauge: React.FC<{ score: number, label: string, color: string }> = ({ score, label, color }) => {
    const [displayScore, setDisplayScore] = useState(0);
    const [strokeDash, setStrokeDash] = useState('0, 100');

    useEffect(() => {
        setDisplayScore(0);
        setStrokeDash('0, 100');
        
        const strokeTimeout = setTimeout(() => setStrokeDash(`${score}, 100`), 100);

        let animationFrameId: number;
        let current = 0;

        const scoreAnimation = () => {
            const diff = score - current;
            if (Math.abs(diff) < 0.5) {
                setDisplayScore(score);
                return; // End animation
            }
            // Smooth easing
            current += diff * 0.1;
            setDisplayScore(Math.round(current));
            animationFrameId = requestAnimationFrame(scoreAnimation);
        };
        
        const animTimeout = setTimeout(() => {
            animationFrameId = requestAnimationFrame(scoreAnimation);
        }, 200);
        
        return () => {
            clearTimeout(strokeTimeout);
            clearTimeout(animTimeout);
            if(animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [score]);
    
    return (
        <div className="flex justify-center items-center my-4">
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-gray-200 dark:text-gray-700/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                    <path className={`${color} transition-all duration-1000`} strokeWidth="3" strokeDasharray={strokeDash} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{displayScore}</span>
                    <span className={`text-lg font-medium ${color}`}>{label}</span>
                </div>
            </div>
        </div>
    );
};

const SubScoreItem: React.FC<SubScore & { color: string }> = ({ name, value, explanation, color }) => {
    const [expanded, setExpanded] = useState(false);
    const [width, setWidth] = useState(0);
    const explanationRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const timeout = setTimeout(() => setWidth(value), 100);
        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div>
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <span>{name}</span>
                <span className="font-mono">{value} / 100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                <div className={`${color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${width}%` }}></div>
            </div>
            <button onClick={() => setExpanded(!expanded)} className="text-cyan-600 dark:text-cyan-400 text-xs font-medium mt-2 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center">
                Details <span className={`inline-block transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            <div 
                ref={explanationRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: expanded ? `${explanationRef.current?.scrollHeight}px` : '0px' }}
            >
                <div className="mt-2 p-3 bg-gray-100 dark:bg-black/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-purple-400/20">
                    {explanation}
                </div>
            </div>
        </div>
    );
};

const StockTerminalView: React.FC<StockTerminalViewProps> = ({ ticker, details, onBack, onNavigateToBasket, onNavigateToStock }) => {
    
    return (
        <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
            <button onClick={onBack} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium mb-4">&larr; Back</button>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-mono">{ticker}</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">{details.company}</p>
                </div>
                <div className="text-right font-mono">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{details.price}</p>
                    <p className={`text-lg font-medium ${details.changeColor}`}>{details.change}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <GlassPane className="p-4 h-96 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500 text-lg">[Interactive TradingView Chart Placeholder]</span>
                    </GlassPane>
                    <GlassPane className="p-6">
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">In Baskets</h3>
                        <div className="flex flex-wrap gap-3">
                            {details.inBaskets.map(basketName => (
                                <button key={basketName} onClick={() => onNavigateToBasket(basketName)} className="bg-gray-200 dark:bg-gray-700/50 text-cyan-700 dark:text-cyan-300 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-purple-400/20">
                                    {basketName}
                                </button>
                            ))}
                        </div>
                    </GlassPane>
                </div>
                <div className="space-y-6">
                    <GlassPane className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Score</h3>
                        <AIScoreGauge score={details.aiScore.score} label={details.aiScore.label} color={details.aiScore.color} />
                         <div className="space-y-4 mt-4">
                            {details.aiScore.subScores.map(subScore => (
                                <SubScoreItem key={subScore.name} {...subScore} color={details.aiScore.bgColor} />
                            ))}
                        </div>
                    </GlassPane>
                     <GlassPane className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Signal Checklist</h3>
                        <ul className="space-y-0">
                            {details.checklist.map((item, idx) => {
                                const passClass = item.pass ? 'text-green-500' : 'text-red-500';
                                const icon = item.pass
                                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
                                return (
                                    <li key={idx} className={`flex items-center text-sm ${passClass} border-b border-gray-200 dark:border-purple-400/20 last:border-b-0 pb-2 mb-2`}>
                                        {icon}
                                        <span className="flex-grow"><span className="font-medium">{item.rule}:</span> <span className="font-mono">{item.details}</span></span>
                                    </li>
                                );
                            })}
                        </ul>
                    </GlassPane>
                </div>
            </div>
        </div>
    );
};

export default StockTerminalView;