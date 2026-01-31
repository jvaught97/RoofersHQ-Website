"use client";

import { useCallback, useEffect, useRef } from 'react';
import type { AnalyticsEventType } from '@/lib/supabase';

// Generate or retrieve session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Generate or retrieve persistent user ID (optional)
const getUserId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  let userId = localStorage.getItem('analytics_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('analytics_user_id', userId);
  }
  return userId;
};

export function useAnalytics() {
  const sessionIdRef = useRef<string>('');
  const userIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
    userIdRef.current = getUserId();
  }, []);

  const trackEvent = useCallback(
    async (
      eventType: AnalyticsEventType,
      eventData?: Record<string, any>
    ) => {
      if (typeof window === 'undefined') return;

      const payload = {
        event_type: eventType,
        event_data: eventData || {},
        session_id: sessionIdRef.current || getSessionId(),
        user_id: userIdRef.current || getUserId(),
        page: window.location.pathname,
        referrer: document.referrer || undefined,
        user_agent: navigator.userAgent,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        timestamp: new Date().toISOString(),
      };

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', eventType, eventData);
      }

      // Send to API
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error('Analytics error:', error);
      }
    },
    []
  );

  // Track page views automatically
  useEffect(() => {
    trackEvent('page_view');
  }, [trackEvent]);

  return { trackEvent };
}

// Convenience hook for tracking scroll depth
export function useScrollTracking() {
  const { trackEvent } = useAnalytics();
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track milestones at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !trackedMilestones.current.has(milestone)
        ) {
          trackedMilestones.current.add(milestone);
          trackEvent('scroll_milestone', { percentage: milestone });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);
}

// Convenience hook for tracking section visibility
export function useSectionTracking(sectionName: string) {
  const { trackEvent } = useAnalytics();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackEvent('section_view', { section: sectionName });
          }
        });
      },
      { threshold: 0.5 } // Track when 50% visible
    );

    const element = document.getElementById(sectionName);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionName, trackEvent]);
}
