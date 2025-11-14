
import React from 'react';
import Modal from './ui/Modal';
import GlassPane from './ui/GlassPane';
import type { NewsItem } from '../types';

interface NewsModalProps {
    newsItem: NewsItem;
    onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ newsItem, onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose}>
            <GlassPane className="!border-cyan-400/50 dark:!shadow-cyan-500/30 p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-8">{newsItem.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-2 font-mono">
                    {newsItem.ticker && (
                        <span className="px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-black/50 rounded-full border border-cyan-300 dark:border-cyan-500/30">{newsItem.ticker}</span>
                    )}
                    <span>{newsItem.source}</span>
                    <span>&bull;</span>
                    <span>{newsItem.time}</span>
                </div>

                <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:underline mb-4 text-sm">
                    Read Original Source
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {newsItem.description}
                </p>
            </GlassPane>
        </Modal>
    );
};

export default NewsModal;
