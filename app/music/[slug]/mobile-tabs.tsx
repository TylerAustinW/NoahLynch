'use client';

import { Heart, MessageCircle, Star } from 'lucide-react';
import { useState } from 'react';

interface MobileTabsProps {
  specialThanksContent: React.ReactNode;
  spotlightReviewContent: React.ReactNode;
}

export default function MobileTabs({ 
  specialThanksContent, 
  spotlightReviewContent 
}: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState('thanks'); // 'thanks' or 'review'
  
  return (
    <div className="lg:hidden mb-10">
      <div className="flex border-b border-zinc-700/60">
        <button
          className={`w-1/2 py-2 px-4 text-center focus:outline-none relative group ${
            activeTab === 'thanks' ? 'text-amber-300 border-b-2 border-amber-500' : 'text-zinc-400 border-b-2 border-transparent'
          }`}
          onClick={() => setActiveTab('thanks')}
        >
          <div className="flex items-center justify-center">
            <Heart className="h-4 w-4 mr-1.5" />
            <span className="text-sm font-medium">Special Thanks</span>
          </div>
        </button>
        <button
          className={`w-1/2 py-2 px-4 text-center focus:outline-none relative group ${
            activeTab === 'review' ? 'text-amber-300 border-b-2 border-amber-500' : 'text-zinc-400 border-b-2 border-transparent'
          }`}
          onClick={() => setActiveTab('review')}
        >
          <div className="flex items-center justify-center">
            <MessageCircle className="h-4 w-4 mr-1.5" />
            <span className="text-sm font-medium">Spotlight Review</span>
          </div>
        </button>
      </div>
      
      <div className="mt-6">
        <div 
          className={`p-5 border border-zinc-700/60 rounded-lg bg-black/30 shadow-lg backdrop-blur-sm ${activeTab !== 'thanks' ? 'hidden' : ''}`}
        >
          <h3 className="mb-4 text-xl font-semibold text-zinc-100 text-center">
            Special Thanks
          </h3>
          {specialThanksContent}
        </div>
        
        <div 
          className={`p-5 border border-zinc-700/60 rounded-lg bg-black/30 shadow-lg backdrop-blur-sm ${activeTab !== 'review' ? 'hidden' : ''}`}
        >
          <h3 className="mb-4 text-xl font-semibold text-zinc-100 text-center flex items-center justify-center">
            <Star className="h-4 w-4 mr-2 text-amber-300" fill="currentColor" />
            <span>Spotlight Review</span>
            <Star className="h-4 w-4 ml-2 text-amber-300" fill="currentColor" />
          </h3>
          {spotlightReviewContent}
        </div>
      </div>
    </div>
  );
} 
