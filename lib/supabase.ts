import { createClient } from '@supabase/supabase-js';

// Use placeholder values if environment variables are not set (for build time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Client-side Supabase client (public operations)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (admin operations - API routes only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Analytics event types
export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'scroll_milestone'
  | 'section_view'
  | 'territory_check'
  | 'web_vital'
  | 'network_quality_detected'
  | 'sequence_quality_loaded'
  | 'sequence_upgrade_started'
  | 'sequence_upgrade_completed'
  | 'manual_hd_upgrade_clicked'
  | 'sequence_load_error';

// Analytics event structure
export interface AnalyticsEvent {
  event_type: AnalyticsEventType;
  event_data?: Record<string, any>;
  session_id: string;
  user_id?: string;
  page: string;
  referrer?: string;
  user_agent?: string;
  screen_width?: number;
  screen_height?: number;
}
