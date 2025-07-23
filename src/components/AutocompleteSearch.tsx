'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MirroredSuggestion {
  id: number;
  text: string;
}

interface AutocompleteProps {
  placeholder?: string;
  onSubmit?: (query: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function AutocompleteSearch({ 
  placeholder = "Ask anything", 
  onSubmit,
  searchQuery,
  onSearchQueryChange 
}: AutocompleteProps) {

  // Simple mirroring - just return the user's input 3 times
  const getMirroredSuggestions = (userInput: string): MirroredSuggestion[] => {
    if (!userInput.trim()) return [];

    // Just mirror the user's input 3 times
    return [
      { id: 1, text: userInput },
      { id: 2, text: userInput },
      { id: 3, text: userInput }
    ];
  };

  const suggestions = getMirroredSuggestions(searchQuery);
  const shouldShowSuggestions = searchQuery.length > 0 && suggestions.length > 0;

  return (
    <div className="relative">
      {/* Mirrored suggestions above input */}
      <AnimatePresence>
        {shouldShowSuggestions && (
          <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut",
                  delay: index * 0.05 
                }}
                onClick={() => {
                  onSearchQueryChange(suggestion.text);
                  if (onSubmit) {
                    onSubmit(suggestion.text);
                  }
                }}
                className="w-full text-left px-4 py-1 mb-1
                         bg-transparent rounded-lg
                         border-none
                         hover:bg-white/5
                         transition-all duration-150
                         flex items-center gap-2.5"
              >
                <Image src="/search.png" alt="Search" width={16} height={16} className="w-4 h-4 flex-shrink-0" />
                <span className="bg-gradient-to-r from-[#B8FFE3] to-[#C081FF] bg-clip-text text-transparent text-sm font-normal leading-5"
                      style={{ fontFamily: 'var(--font-work-sans), "Work Sans", sans-serif' }}>
                  {suggestion.text}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* Visible input field with gradient styling */}
      <div className="relative">
        {/* Gradient text overlay */}
        <div className="absolute inset-0 px-4 py-4 pointer-events-none flex items-center">
          <span className="bg-gradient-to-r from-[#B8FFE3] to-[#C081FF] bg-clip-text text-transparent font-normal text-sm"
                style={{ fontFamily: 'var(--font-work-sans), "Work Sans", sans-serif' }}>
            {searchQuery || placeholder}
          </span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="w-full px-4 py-4 pr-12 bg-transparent rounded-full 
                   text-transparent caret-[#B8FFE3] text-sm font-normal
                   focus:outline-none"
          style={{
            fontFamily: 'var(--font-work-sans), "Work Sans", sans-serif',
            caretColor: '#B8FFE3'
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && onSubmit) {
              onSubmit(searchQuery);
            }
          }}
          autoFocus
        />
        {/* Microphone button */}
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => {
            // Handle voice input - placeholder for future implementation
            console.log('Voice input clicked');
          }}
        >
          <Image src="/Tab Bar.png" alt="Tab Bar" width={30} height={30} className="w-[30px] h-[30px]" />
        </button>
      </div>
    </div>
  );
}