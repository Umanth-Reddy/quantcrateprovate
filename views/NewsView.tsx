
import React from 'react';
import GlassPane from '../components/ui/GlassPane';
import { mockNewsData } from '../data/mockData';
import type { NewsItem } from '../types';

interface NewsViewProps {
    onOpenNewsModal: (newsItem: NewsItem) => void;
}

const NewsView: React.FC<NewsViewProps> = ({ onOpenNewsModal }) => {
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Nifty 500 News & Events</h1>
            <div className="space-y-6">
                {mockNewsData.map((item, index) => (
                    <GlassPane key={index} className="p-6 cursor-pointer" hover={true} onClick={() => onOpenNewsModal(item)}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-2 font-mono">
                            {item.ticker && (
                                <span className="px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-black/50 rounded-full border border-cyan-300 dark:border-cyan-500/30">{item.ticker}</span>
                            )}
                            <span>{item.source}</span>
                            <span>&bull;</span>
                            <span>{item.time}</span>
                        </div>
                    </GlassPane>
                ))}
            </div>
        </div>
    );
};

export default NewsView;
