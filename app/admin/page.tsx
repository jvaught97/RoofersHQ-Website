"use client";

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { Activity, MousePointerClick, Eye, MapPin, Gauge, Users } from 'lucide-react';

interface AnalyticsEvent {
  id: string;
  created_at: string;
  event_type: string;
  event_data: Record<string, unknown>;
  session_id: string;
  page: string;
}

interface Stats {
  total_events: number;
  unique_sessions: number;
  cta_clicks: number;
  territory_checks: number;
  avg_scroll_depth: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [stats, setStats] = useState<Stats>({
    total_events: 0,
    unique_sessions: 0,
    cta_clicks: 0,
    territory_checks: 0,
    avg_scroll_depth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage after component mounts (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple password protection (replace with proper auth in production)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'rooferhq2026') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  // Fetch analytics data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAnalytics = async () => {
      setIsLoading(true);

      // Fetch recent events
      const { data: eventsData } = await supabaseClient
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (eventsData) {
        setEvents(eventsData);

        // Calculate stats
        const uniqueSessions = new Set(eventsData.map(e => e.session_id)).size;
        const ctaClicks = eventsData.filter(e => e.event_type === 'cta_click').length;
        const territoryChecks = eventsData.filter(e => e.event_type === 'territory_check').length;

        const scrollEvents = eventsData.filter(e => e.event_type === 'scroll_milestone');
        const avgScroll = scrollEvents.length > 0
          ? scrollEvents.reduce((sum, e) => sum + (e.event_data?.percentage || 0), 0) / scrollEvents.length
          : 0;

        setStats({
          total_events: eventsData.length,
          unique_sessions: uniqueSessions,
          cta_clicks: ctaClicks,
          territory_checks: territoryChecks,
          avg_scroll_depth: Math.round(avgScroll),
        });
      }

      setIsLoading(false);
    };

    fetchAnalytics();

    // Set up real-time subscription
    const channel = supabaseClient
      .channel('analytics_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics_events',
        },
        (payload) => {
          setEvents(prev => [payload.new as AnalyticsEvent, ...prev].slice(0, 50));
          // Refresh stats
          fetchAnalytics();
        }
      )
      .subscribe();

    // Refresh every 10 seconds as fallback
    const interval = setInterval(fetchAnalytics, 10000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Show nothing during SSR/initial mount to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="bg-black/50 border border-white/10 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded text-white mb-4 focus:outline-none focus:border-[#CA8A04]"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#CA8A04] text-black font-bold rounded hover:bg-[#EAB308] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">RooferHQ Analytics</h1>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Activity className="w-6 h-6" />}
            label="Total Events"
            value={stats.total_events}
            color="blue"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="Unique Sessions"
            value={stats.unique_sessions}
            color="purple"
          />
          <StatCard
            icon={<MousePointerClick className="w-6 h-6" />}
            label="CTA Clicks"
            value={stats.cta_clicks}
            color="yellow"
          />
          <StatCard
            icon={<MapPin className="w-6 h-6" />}
            label="Territory Checks"
            value={stats.territory_checks}
            color="green"
          />
          <StatCard
            icon={<Gauge className="w-6 h-6" />}
            label="Avg Scroll Depth"
            value={`${stats.avg_scroll_depth}%`}
            color="orange"
          />
          <StatCard
            icon={<Eye className="w-6 h-6" />}
            label="Conversion Rate"
            value={stats.unique_sessions > 0 ? `${Math.round((stats.cta_clicks / stats.unique_sessions) * 100)}%` : '0%'}
            color="red"
          />
        </div>

        {/* Live Event Feed */}
        <div className="bg-black/50 border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#CA8A04]" />
            Live Event Feed
          </h2>

          {isLoading ? (
            <div className="text-center py-8 text-white/60">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-white/60">No events yet. Start using the site to see analytics.</div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {events.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    green: 'bg-green-500/10 text-green-400',
    orange: 'bg-orange-500/10 text-orange-400',
    red: 'bg-red-500/10 text-red-400',
  }[color];

  return (
    <div className="bg-black/50 border border-white/10 rounded-lg p-6">
      <div className={`inline-flex p-3 rounded-lg mb-3 ${colorClasses}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}

function EventRow({ event }: { event: AnalyticsEvent }) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'cta_click':
        return <MousePointerClick className="w-4 h-4" />;
      case 'section_view':
        return <Eye className="w-4 h-4" />;
      case 'territory_check':
        return <MapPin className="w-4 h-4" />;
      case 'scroll_milestone':
        return <Gauge className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'cta_click':
        return 'text-yellow-400';
      case 'section_view':
        return 'text-blue-400';
      case 'territory_check':
        return 'text-green-400';
      case 'scroll_milestone':
        return 'text-purple-400';
      default:
        return 'text-white/60';
    }
  };

  const formatEventData = (data: Record<string, unknown>) => {
    if (Object.keys(data).length === 0) return null;
    return JSON.stringify(data, null, 2);
  };

  const timeAgo = (timestamp: string) => {
    // Use a memoized current time to avoid calling Date.now() during render
    const now = new Date().getTime();
    const seconds = Math.floor((now - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-black/30 rounded border border-white/5 hover:border-white/10 transition">
      <div className={`mt-0.5 ${getEventColor(event.event_type)}`}>
        {getEventIcon(event.event_type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{event.event_type.replace('_', ' ')}</span>
          <span className="text-xs text-white/40">{event.page}</span>
        </div>
        {formatEventData(event.event_data) && (
          <div className="text-xs text-white/60 font-mono bg-black/50 p-2 rounded mt-1">
            {formatEventData(event.event_data)}
          </div>
        )}
      </div>
      <div className="text-xs text-white/40 whitespace-nowrap">
        {timeAgo(event.created_at)}
      </div>
    </div>
  );
}
