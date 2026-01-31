-- Analytics Events Table
-- Stores all user interaction events for RooferHQ

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Event details
  event_type TEXT NOT NULL, -- e.g., 'cta_click', 'scroll_milestone', 'section_view', 'territory_check'
  event_data JSONB DEFAULT '{}'::jsonb, -- Flexible data per event type

  -- User tracking (anonymous)
  session_id TEXT NOT NULL,
  user_id TEXT, -- Optional persistent user ID (cookie-based)

  -- Page context
  page TEXT NOT NULL, -- e.g., '/', '/verify'
  referrer TEXT,

  -- Technical metadata
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page);

-- Composite index for dashboard queries (today's events by type)
CREATE INDEX IF NOT EXISTS idx_analytics_date_type ON analytics_events(DATE(created_at), event_type);

-- Enable Row Level Security (but allow all for now - we'll lock this down later)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for now (service role will handle security)
CREATE POLICY "Allow all analytics operations" ON analytics_events
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- View for today's stats (for dashboard)
CREATE OR REPLACE VIEW analytics_today AS
SELECT
  event_type,
  COUNT(*) as count,
  COUNT(DISTINCT session_id) as unique_sessions
FROM analytics_events
WHERE created_at >= CURRENT_DATE
GROUP BY event_type
ORDER BY count DESC;

-- View for hourly activity (last 24 hours)
CREATE OR REPLACE VIEW analytics_hourly AS
SELECT
  DATE_TRUNC('hour', created_at) as hour,
  event_type,
  COUNT(*) as count
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY hour, event_type
ORDER BY hour DESC, count DESC;

-- Comments for documentation
COMMENT ON TABLE analytics_events IS 'Stores all user interaction events for RooferHQ analytics';
COMMENT ON COLUMN analytics_events.event_type IS 'Type of event: cta_click, scroll_milestone, section_view, territory_check, web_vital';
COMMENT ON COLUMN analytics_events.event_data IS 'Flexible JSONB field for event-specific data (CTA name, scroll percentage, etc.)';
COMMENT ON COLUMN analytics_events.session_id IS 'Anonymous session identifier (generated client-side)';
