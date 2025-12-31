'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the TerminalSection with no SSR
const DynamicTerminalSection = dynamic(
  () => import('./TerminalSection'),
  { 
    loading: () => (
      <div className="w-full rounded-xl flex max-w-2xl min-h-64 border border-gray-700 flex-col shadow-lg shadow-primary overflow-hidden relative font-mono text-sm bg-background">
        <div className="bg-background left-0 w-full h-8 flex items-center px-3 gap-2 border-b border-gray-700 z-20">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-3 text-gray-400 text-xs tracking-wide">
            garee.pro
          </span>
        </div>
        <div className="pt-8 w-full h-full text-start flex items-center justify-center">
          <div className="text-center text-gray-500">Loading terminal...</div>
        </div>
      </div>
    ),
    ssr: false 
  }
);

export default function TerminalSectionWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full rounded-xl flex max-w-2xl min-h-64 border border-gray-700 flex-col shadow-lg shadow-primary overflow-hidden relative font-mono text-sm bg-background">
        <div className="bg-background left-0 w-full h-8 flex items-center px-3 gap-2 border-b border-gray-700 z-20">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-3 text-gray-400 text-xs tracking-wide">
            garee.pro
          </span>
        </div>
        <div className="pt-8 w-full h-full text-start flex items-center justify-center">
          <div className="text-center text-gray-500">Loading terminal...</div>
        </div>
      </div>
    }>
      <DynamicTerminalSection />
    </Suspense>
  );
}