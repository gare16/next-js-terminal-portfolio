'use client';

import { useEffect } from 'react';

// Performance monitoring for Core Web Vitals
export default function PerformanceObserver() {
  useEffect(() => {
    // Check if Performance Observer API is available
    if (typeof window === 'undefined' || typeof window.PerformanceObserver === 'undefined') {
      return;
    }

    // Define types for the specific performance entries we're working with
    type LargestContentfulPaint = PerformanceEntry & { startTime: number; size?: number };
    type FirstInput = PerformanceEntry & { processingStart?: number; startTime: number };
    type LayoutShift = PerformanceEntry & { value?: number; hadRecentInput?: boolean };

    // Get the PerformanceObserver constructor from window
    const PerfObserver = window.PerformanceObserver;

    // Measure Largest Contentful Paint (LCP)
    const measureLCP = () => {
      const observer = new PerfObserver((entryList) => {
        const entries = entryList.getEntries() as LargestContentfulPaint[];
        const lastEntry = entries[entries.length - 1];

        // Log LCP to console for development
        if (process.env.NODE_ENV === 'development' && lastEntry) {
          console.log('LCP:', lastEntry.startTime);
        }

        // You can send this data to your analytics service
        // For example, send to Vercel Analytics or Google Analytics
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Measure First Input Delay (FID)
    const measureFID = () => {
      const observer = new PerfObserver((entryList) => {
        const entries = entryList.getEntries() as FirstInput[];
        entries.forEach((entry) => {
          if (process.env.NODE_ENV === 'development' && entry.processingStart) {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Measure Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      let clsValue = 0;
      const observer = new PerfObserver((entryList) => {
        const entries = entryList.getEntries() as LayoutShift[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
          }
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('CLS:', clsValue);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    measureLCP();
    measureFID();
    measureCLS();

    // Cleanup observers if needed
    return () => {
      // Observers are automatically cleaned up when the page unloads
    };
  }, []);

  return null;
}