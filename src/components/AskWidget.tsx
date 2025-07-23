'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZapIcon } from './icons/ZapIcon';

interface AskWidgetProps {
  onClick?: () => void;
}

interface Suggestion {
  icon: string;
  text: string;
}

export const AskWidget: React.FC<AskWidgetProps> = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCollapsed, setShowCollapsed] = useState(true);
  const [showExpanded, setShowExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { icon: 'sparkle', text: 'Top Stories' },
    { icon: 'sparkle', text: 'Breaking News' },
    { icon: 'sparkle', text: 'Generate a new Wordle' }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isExpanded && !isAnimating && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCollapse();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, isAnimating]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    onClick?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  const loadMoreSuggestions = () => {
    setSuggestions([
      { icon: '📰', text: 'Today\'s Headlines' },
      { icon: '🌍', text: 'World News' },
      { icon: '💼', text: 'Business Updates' },
      { icon: '🎭', text: 'Arts & Culture' }
    ]);
  };

  const handleExpand = () => {
    setIsAnimating(true);
    setShowCollapsed(false);
    // Wait for fade out to complete before expanding
    setTimeout(() => {
      setIsExpanded(true);
      setShowExpanded(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }, 100);
  };

  const handleCollapse = () => {
    setIsAnimating(true);
    setShowExpanded(false);
    // Wait for fade out to complete before collapsing
    setTimeout(() => {
      setIsExpanded(false);
      // Wait for collapse animation to complete
      setTimeout(() => {
        setShowCollapsed(true);
        setIsAnimating(false);
      }, 400);
    }, 100);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <motion.div 
        className="relative bg-gradient-to-r from-[#C081FF] to-[#B8FFE3] p-[1px]"
        initial={{ borderRadius: 41 }}
        animate={{ 
          borderRadius: isExpanded ? 30 : 41,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <motion.div 
          className="relative backdrop-blur-md overflow-hidden bg-[#4E4E4E]"
          initial={{ width: 101.18, height: 49 }}
          animate={{ 
            width: isExpanded ? 346 : 101.18, 
            height: isExpanded ? 370 : 49,
            borderRadius: isExpanded ? 29 : 40,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0px 1.3px 15.3px rgba(0,0,0,0.1)',
          }}
        >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none rounded-[30px]" />

        {/* Collapsed state */}
        <AnimatePresence>
            {showCollapsed && (
              <motion.button
                className="absolute inset-0 flex items-center justify-center font-sans"
                onClick={handleExpand}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <div className="relative flex items-center z-10" style={{ width: '100%' }}>
                  <Image 
                    src="/sparkle.png" 
                    alt="Sparkle" 
                    width={16} 
                    height={16}
                    className="w-4 h-4 absolute"
                    style={{ left: '8px' }}
                  />
                  <span className="bg-gradient-to-r from-[#B8FFE3] to-[#C081FF] bg-clip-text text-transparent font-medium text-sm absolute" style={{ left: '28px' }}>Ask</span>
                  <Image 
                    src="/times.png" 
                    alt="NY Times" 
                    width={20} 
                    height={20}
                    className="w-5 h-5 absolute"
                    style={{ left: '58px' }}
                  />
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Expanded state */}
          <AnimatePresence>
            {showExpanded && (
              <motion.div
                className="p-6 flex flex-col h-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.2, ease: "easeIn" }
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.1, ease: "easeOut" }
                }}
              >
                <h2 className="text-white text-xl mb-6 font-sans">
                  Ask New York Times Anything!
                </h2>
                
                {/* Search input */}
                <div className="relative mb-6">
                  <div className="relative bg-gradient-to-r from-[#C081FF] to-[#B8FFE3] p-[1px] rounded-full">
                    <div className="relative bg-[#5B5B5B] rounded-full overflow-hidden">
                      <div className="absolute inset-0 px-4 py-4 pointer-events-none">
                        <span className="bg-gradient-to-r from-[#B8FFE3] to-[#C081FF] bg-clip-text text-transparent font-sans font-medium text-sm">
                          {searchQuery || 'Ask anything'}
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder=""
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-4 pr-12 bg-transparent rounded-full 
                                 font-sans font-medium text-sm
                                 focus:outline-none"
                        style={{
                          color: 'transparent',
                          caretColor: '#B8FFE3'
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSearch();
                        }}
                        autoFocus
                      />
                    </div>
                  </div>
                  <button className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Image 
                      src="/Tab Bar.png" 
                      alt="Tab Bar" 
                      width={30} 
                      height={30}
                      className="w-[30px] h-[30px]"
                    />
                  </button>
                </div>

                {/* Suggestions */}
                <div className="flex-1 space-y-0">
                  {suggestions.map((suggestion, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                    >
                      <button
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="w-full text-left px-4 py-3 text-white/90
                                 hover:bg-white/5 transition-colors font-sans flex items-center gap-2"
                      >
                        {suggestion.icon === 'sparkle' ? (
                          <Image 
                            src="/sparkle1.png" 
                            alt="Sparkle" 
                            width={16} 
                            height={16}
                            className="w-4 h-4"
                          />
                        ) : (
                          <span>{suggestion.icon}</span>
                        )}
                        {suggestion.text}
                      </button>
                      {i < suggestions.length - 1 && (
                        <div className="border-b border-dotted border-[#343434]/30 mx-4" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* More button */}
                <div className="mt-4 bg-gradient-to-r from-[#C081FF] to-[#B8FFE3] p-[1px] rounded-full">
                  <button
                    onClick={loadMoreSuggestions}
                    className="w-full py-3 bg-[#1E1E1E] rounded-full text-white/70 hover:text-white
                             transition-colors flex items-center justify-center gap-2 font-sans"
                  >
                    <ZapIcon className="w-4 h-4" />
                    More
                  </button>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
      </motion.div>
    </div>
  );
};