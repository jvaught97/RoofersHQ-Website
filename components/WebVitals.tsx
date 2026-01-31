"use client";

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', metric.name, metric.value);
    }

    // Send to analytics API
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'web_vital',
        event_data: {
          metric_name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        },
        session_id: sessionStorage.getItem('analytics_session_id') || 'unknown',
        user_id: localStorage.getItem('analytics_user_id') || undefined,
        page: window.location.pathname,
        user_agent: navigator.userAgent,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
      }),
    }).catch((error) => {
      console.error('Failed to send web vital:', error);
    });
  });

  return null;
}
