import React, 'react';
import GlassPane from '../components/ui/GlassPane';
import { useState, useRef, ReactNode } from 'react';


const glossaryTerms = [
    {
        term: 'Backtesting',
        definition: "Imagine a time machine for your investment strategy. Backtesting uses historical data to see how your rules-based Crate *would have* performed in the past. It’s a powerful way to test a strategy's potential before putting real money on the line."
    },
    {
        term: 'Beta',
        definition: "Beta measures a stock's volatility compared to the overall market (like the Nifty 50). A beta of 1 means it moves with the market. Above 1 means it's more volatile (bigger swings up and down). Below 1 means it's less volatile."
    },
    {
        term: 'CAGR (Compound Annual Growth Rate)',
        definition: "This is the average yearly growth of an investment over a specific period, assuming profits were reinvested. It's a smoother, more accurate way to look at long-term performance than simple returns."
    },
    {
        term: 'Dividend Yield',
        definition: "Think of it as a reward for being a shareholder. It's the company's annual dividend payment per share, divided by the stock's current price. A 2% yield means you get 2% of your investment back in dividends each year."
    },
    {
        term: 'P/E Ratio (Price-to-Earnings)',
        definition: "The Price-to-Earnings ratio helps you understand if a stock is cheap or expensive. It's the stock's current price divided by its earnings per share. A high P/E suggests investors expect higher future growth, while a low P/E might indicate a 'value' stock."
    },
    {
        term: 'Rebalancing',
        definition: "This is the automated process of 'tuning up' your Crate to keep it aligned with its original strategy. It involves selling stocks that no longer meet the Crate's rules and buying new ones that do, ensuring your portfolio stays on track."
    },
    {
        term: 'ROE (Return on Equity)',
        definition: "Return on Equity shows how well a company uses shareholder money to generate profits. It's calculated by dividing the company's net income by its shareholder equity. A higher ROE often indicates a more efficient and profitable company."
    }
];

const faqItems = [
    {
        question: "What are the risks? Is this safe?",
        answer: "That's the most important question. It's crucial to understand that **all investments carry risk**, and past performance is not a guarantee of future results. QuantCrate is a tool that uses a data-driven, rules-based *approach* to identify potential opportunities; it is not a guaranteed profit machine. Market conditions can change, and even the most well-tested strategies can experience losses. We provide transparency into the 'why' so you can make informed decisions that align with your personal risk tolerance."
    },
    {
        question: "How is this different from a Mutual Fund?",
        answer: "Great question! There are two key differences. **1. Automation vs. Human Bias:** Our Crates are built on transparent, unemotional rules. The system automatically finds stocks that fit the criteria. Many mutual funds are run by a fund manager, whose decisions can sometimes be influenced by human emotions or biases. **2. Transparency vs. 'Black Box':** With QuantCrate, you see every stock in your basket and the exact data-driven reasons it's there. Mutual funds often only disclose their holdings periodically, so you don't always know exactly what you own or why."
    },
    {
        question: "What does 'Rebalancing' mean? Do I have to do anything?",
        answer: "Think of rebalancing as an automated 'refresh' for your Crate. Over time, some stocks in a Crate might no longer fit the original strategy (e.g., their momentum fades), while new stocks emerge that do. Rebalancing automatically sells the stocks that no longer qualify and buys the new ones that do. **You don't have to do anything.** The system handles it to ensure your investment stays aligned with its intended goal."
    },
    {
        question: "How often should I check my Crates?",
        answer: "QuantCrate strategies are designed for the medium to long term, not for day-trading. The goal is to let the rules-based system work over time. While it's wise to be aware of your investments, we recommend checking in periodically—perhaps weekly, or when you receive a rebalancing notification—rather than watching them every day. Constant monitoring can lead to emotional decisions, which our system is designed to help you avoid."
    },
    {
        question: "Can I build my own Crate?",
        answer: "Absolutely! While our curated baskets are a great starting point, we believe in empowering our users. On your 'My Portfolio' page, you'll find a tool that allows you to create your own custom baskets. You can add stocks you're watching to build a personalized portfolio based on your own research and goals."
    }
];

const AccordionItem: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-b border-stone-200 dark:border-purple-400/20 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                className="overflow-hidden transition-all duration-500 ease-in-out"
            >
                <div className="pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

const SectionHeader: React.FC<{ title: string; icon: ReactNode }> = ({ title, icon }) => (
    <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-gray-900/50 border border-stone-200 dark:border-cyan-400/20 flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
);

const HowItWorksView: React.FC = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-lora italic font-bold text-gray-900 dark:text-white mb-2">De-mystifying Your Investments</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Your roadmap to understanding quantitative investing and our platform.</p>
                </div>

                <div className="space-y-8">
                    {/* Section 1: Understanding Our Signals */}
                    <GlassPane className="p-6" interactiveGlow>
                        <SectionHeader
                            title="We Don't Guess. We Measure."
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>}
                        />
                        <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                            <p>
                                "Quant" is short for <strong>Quantitative Investing</strong>. Put simply, it’s a strategy that makes investment decisions based on measurable data, numbers, and rules—not on emotions, gut feelings, or market hype.
                            </p>
                            <p>
                                Our system constantly scans the market for stocks that exhibit specific, proven characteristics or "factors." We don't try to predict the future. Instead, we identify the traits of stocks that have historically performed well and build disciplined, rules-based portfolios around them.
                            </p>
                        </div>
                    </GlassPane>

                    {/* Section 2: The 4 Key Factors */}
                    <GlassPane className="p-6" interactiveGlow>
                        <SectionHeader
                            title="The 4 Key Factors We Track"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-stone-50 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Momentum</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-200">What it is:</strong> Stocks that are already trending up.</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1"><strong className="text-gray-800 dark:text-gray-200">Simple Analogy:</strong> The "hot hand" in basketball—winners tend to keep winning.</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2"><strong className="text-gray-800 dark:text-gray-200">How we measure it:</strong> Price performance over the last 3-12 months.</p>
                            </div>
                             <div className="p-4 bg-stone-50 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Value</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-200">What it is:</strong> Stocks that are cheap relative to their earnings or assets.</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1"><strong className="text-gray-800 dark:text-gray-200">Simple Analogy:</strong> Finding a high-quality item on a "clearance rack."</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2"><strong className="text-gray-800 dark:text-gray-200">How we measure it:</strong> Metrics like P/E (Price-to-Earnings) or P/B (Price-to-Book) ratios.</p>
                            </div>
                             <div className="p-4 bg-stone-50 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Quality</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-200">What it is:</strong> Financially healthy, stable, and profitable companies.</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1"><strong className="text-gray-800 dark:text-gray-200">Simple Analogy:</strong> A business that is "built to last" (low debt, high profits).</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2"><strong className="text-gray-800 dark:text-gray-200">How we measure it:</strong> Metrics like ROE (Return on Equity) and low Debt-to-Equity.</p>
                            </div>
                             <div className="p-4 bg-stone-50 dark:bg-black/30 rounded-lg border border-stone-200 dark:border-purple-400/20">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Low Volatility (Stability)</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-200">What it is:</strong> Stocks with smoother, less erratic price movements.</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1"><strong className="text-gray-800 dark:text-gray-200">Simple Analogy:</strong> The "slow and steady tortoise" vs. the "erratic hare."</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2"><strong className="text-gray-800 dark:text-gray-200">How we measure it:</strong> A stock's "beta" or its historical price swings.</p>
                            </div>
                        </div>
                    </GlassPane>

                     {/* Section 3: How a Crate is Built */}
                    <GlassPane className="p-6" interactiveGlow>
                        <SectionHeader
                            title="Turning Signals into a Basket"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 11.42m5.877 5.877l-5.877-5.877m0 0a3.375 3.375 0 00-4.773 4.773l2.472 2.472" /></svg>}
                        />
                        <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                             <p>
                                A "Crate" is the end product of a disciplined, automated process. It’s not just a random collection of stocks; it’s a portfolio built with purpose. Here’s how it works:
                            </p>
                            <ol className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-100 border border-cyan-500/50 flex items-center justify-center font-bold font-mono mr-4">1</div>
                                    <div>
                                        <h5 className="font-semibold text-gray-800 dark:text-gray-100">Define the Universe</h5>
                                        <p>We start with a broad group of stocks, like the Nifty 500.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-100 border border-cyan-500/50 flex items-center justify-center font-bold font-mono mr-4">2</div>
                                    <div>
                                        <h5 className="font-semibold text-gray-800 dark:text-gray-100">Apply the Screen</h5>
                                        <p>We apply our rules. For example: "Show me stocks with Top 20% Momentum AND Top 30% Quality."</p>
                                    </div>
                                </li>
                               <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-100 border border-cyan-500/50 flex items-center justify-center font-bold font-mono mr-4">3</div>
                                    <div>
                                        <h5 className="font-semibold text-gray-800 dark:text-gray-100">Rank & Score</h5>
                                        <p>The stocks that "pass" the screen are then scored and ranked based on the strength of their signals.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-100 border border-cyan-500/50 flex items-center justify-center font-bold font-mono mr-4">4</div>
                                    <div>
                                        <h5 className="font-semibold text-gray-800 dark:text-gray-100">Curate the Crate</h5>
                                        <p>The top 10-20 highest-ranked stocks are grouped together to form the Crate.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-100 border border-cyan-500/50 flex items-center justify-center font-bold font-mono mr-4">5</div>
                                    <div>
                                        <h5 className="font-semibold text-gray-800 dark:text-gray-100">Rebalance</h5>
                                        <p>Periodically, we repeat the process to ensure the Crate stays true to its strategy, selling stocks that no longer fit the rules and buying new ones that do.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </GlassPane>

                    {/* Glossary Section */}
                    <GlassPane className="p-6" interactiveGlow>
                        <SectionHeader
                            title="Your Guide to Quant Lingo"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
                        />
                        <div>
                            {glossaryTerms.map(({ term, definition }) => (
                                <AccordionItem key={term} title={term}>
                                    <p>{definition}</p>
                                </AccordionItem>
                            ))}
                        </div>
                    </GlassPane>
                    
                    {/* FAQ Section */}
                    <GlassPane className="p-6" interactiveGlow>
                        <SectionHeader
                            title="Your Questions, Answered"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>}
                        />
                        <div>
                            {faqItems.map(({ question, answer }) => (
                                <AccordionItem key={question} title={question}>
                                    <p dangerouslySetInnerHTML={{ __html: answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                                </AccordionItem>
                            ))}
                        </div>
                    </GlassPane>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksView;
