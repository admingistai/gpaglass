'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AutocompleteSearch } from './AutocompleteSearch';

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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [titleTimeout, setTitleTimeout] = useState<NodeJS.Timeout | null>(null);
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

  // Handle title visibility based on search query
  useEffect(() => {
    if (searchQuery) {
      // Hide title immediately when typing
      setShowTitle(false);
      // Clear any existing timeout
      if (titleTimeout) {
        clearTimeout(titleTimeout);
        setTitleTimeout(null);
      }
    } else {
      // Show title after 1 second when search is empty
      const timeout = setTimeout(() => {
        setShowTitle(true);
      }, 1000);
      setTitleTimeout(timeout);
    }

    return () => {
      if (titleTimeout) {
        clearTimeout(titleTimeout);
      }
    };
  }, [searchQuery]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    onClick?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  const loadMoreSuggestions = () => {
    setIsLoadingMore(true);
    // Fade out current suggestions
    setTimeout(() => {
      setSuggestions([
        { icon: 'sparkle', text: 'Today\'s Headlines' },
        { icon: 'sparkle', text: 'World News' },
        { icon: 'sparkle', text: 'Business Updates' }
      ]);
      // Allow time for new suggestions to fade in
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 500);
    }, 300);
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
        className="relative bg-gradient-to-br from-[#B8FFE3] to-[#C081FF] p-[1px]"
        initial={{ borderRadius: 41 }}
        animate={{ 
          borderRadius: isExpanded ? 30 : 41,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <motion.div 
          className="relative overflow-hidden bg-[#3a3a3a] backdrop-blur-sm border border-white/5"
          initial={{ width: 101.18, height: 49 }}
          animate={{ 
            width: isExpanded ? 346 : 101.18, 
            height: isExpanded ? 370 : 49,
            borderRadius: isExpanded ? 29 : 40,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          style={{
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.3)',
          }}
        >

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
                  <span className="text-white font-medium text-sm absolute" style={{ left: '28px' }}>Ask</span>
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
                className="p-6 pt-10 flex flex-col h-full"
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
                {/* Title - keep space reserved */}
                <motion.h2 
                  className="text-white font-normal text-xl mb-4" 
                  style={{ fontFamily: 'var(--font-work-sans), "Work Sans", sans-serif', height: '56px' }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showTitle ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Ask New York Times<br />Anything!
                </motion.h2>
                
                {/* Search input with Algolia Autocomplete */}
                <div className="relative mb-4">
                  <div className="relative bg-gradient-to-r from-[#B8FFE3]/60 to-[#C081FF]/60 p-[1px] rounded-full">
                    <div className="relative bg-[#3a3a3a] rounded-full">
                      <AutocompleteSearch
                        placeholder="Ask anything"
                        onSubmit={handleSearch}
                        searchQuery={searchQuery}
                        onSearchQueryChange={setSearchQuery}
                      />
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="flex-1 space-y-0">
                  <AnimatePresence mode="wait">
                    {!isLoadingMore && suggestions.map((suggestion, i) => (
                      <motion.div
                        key={suggestion.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ 
                          delay: 0.1 + i * 0.1, 
                          duration: 0.4, 
                          ease: "easeOut" 
                        }}
                      >
                      <button
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="w-full text-left -ml-2.5 pl-1.5 pr-4 py-1.5 text-white
                                 hover:bg-white/5 transition-colors font-sans text-sm flex items-center gap-2"
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
                        <div className="border-b border-dashed border-white/40 mx-4" />
                      )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* More button */}
                <div className="mt-4 bg-gradient-to-r from-[#B8FFE3]/60 to-[#C081FF]/60 p-[1px] rounded-full">
                  <button
                    onClick={loadMoreSuggestions}
                    className="w-full h-[30px] bg-[#3a3a3a] border border-white/10 rounded-full 
                             text-white/70 hover:text-white hover:bg-[#4a4a4a]
                             transition-all flex items-center justify-center gap-2 font-sans"
                  >
                    <Image 
                      src="/wand.png" 
                      alt="Wand" 
                      width={16} 
                      height={16}
                      className="w-4 h-4"
                    />
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