import React, { useState, useEffect, useRef } from 'react';
import type { AIScore, SubScore } from '../types';

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
                    <path className="text-stone-200 dark:text-gray-700/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
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
            <div className="w-full bg-stone-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
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
                <div className="mt-2 p-3 bg-stone-100 dark:bg-black/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-stone-200 dark:border-purple-400/20">
                    {explanation}
                </div>
            </div>
        </div>
    );
};

interface AIScoreDetailsProps {
    aiScore: AIScore;
}

const AIScoreDetails: React.FC<AIScoreDetailsProps> = ({ aiScore }) => {
    return (
        <>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Score</h3>
            <AIScoreGauge score={aiScore.score} label={aiScore.label} color={aiScore.color} />
             <div className="space-y-4 mt-4">
                {aiScore.subScores.map(subScore => (
                    <SubScoreItem key={subScore.name} {...subScore} color={aiScore.bgColor} />
                ))}
            </div>
        </>
    );
};

export default AIScoreDetails;
