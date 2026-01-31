# RooferHQ Analytics System - Setup Guide

## Overview
You now have a complete analytics system with:
- **Supabase database** for storing events
- **Real-time admin dashboard** at `/admin`
- **Automatic tracking** for CTAs, scroll depth, section views, and Web Vitals
- **Custom event tracking** via `useAnalytics()` hook

---

## 1. Supabase Setup

### Step 1: Create Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter project details:
   - **Name:** RooferHQ Analytics
   - **Database Password:** (choose a strong password)
   - **Region:** Choose closest to your users
4. Wait for project to provision (~2 minutes)

### Step 2: Run Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `/supabase/schema.sql` and paste
4. Click "Run" to create the analytics tables

### Step 3: Get API Credentials
1. Go to **Settings → API**
2. Copy these values:
   - **Project URL:** `https://[PROJECT_ID].supabase.co`
   - **Anon Key:** (public key for client-side)
   - **Service Role Key:** (secret key for server-side)

### Step 4: Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **IMPORTANT:** Add `.env.local` to `.gitignore` (already done)

---

## 2. Test the Analytics System

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Visit the Homepage
Open [http://localhost:3000](http://localhost:3000) and interact with the site:
- Scroll through the page
- Click CTAs ("Run Market Audit", "Claim Territory", etc.)
- Enter a ZIP code in the Territory Checker
- View different sections

### Step 3: Check Console (Development Mode)
Open browser DevTools → Console. You should see:
```
[Analytics] page_view
[Analytics] scroll_milestone { percentage: 25 }
[Analytics] cta_click { cta_name: 'hero_market_audit', ... }
[Web Vitals] LCP 1234
```

### Step 4: Access Admin Dashboard
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter password: `rooferhq2026`
3. You should see:
   - **Live Event Feed** - Real-time stream of user actions
   - **Stats Cards** - Total events, unique sessions, CTA clicks, etc.
   - **Real-time updates** - New events appear automatically

---

## 3. What's Being Tracked

### Automatic Events (No Code Required)
| Event Type | Trigger | Data Captured |
|------------|---------|---------------|
| `page_view` | Page loads | Page path, referrer, screen size |
| `scroll_milestone` | User scrolls 25%, 50%, 75%, 100% | Scroll percentage |
| `section_view` | Section becomes 50% visible | Section name |
| `web_vital` | Core Web Vitals measured | LCP, FID, CLS, TTFB |

### Manual CTA Tracking
| CTA Location | Event Name | Data |
|--------------|------------|------|
| Hero Overlay | `hero_market_audit` | CTA name, location, text |
| Scroll Sequence End | `claim_territory` | CTA name, location, text |
| Founding Partners | `founding_partners_apply` | CTA name, location, text |
| Territory Checker | `territory_check` | ZIP code entered |

---

## 4. Admin Dashboard Features

### Live Stats (Real-time)
- **Total Events:** All tracked interactions
- **Unique Sessions:** Count of individual visitors
- **CTA Clicks:** How many clicked any CTA
- **Territory Checks:** How many entered ZIP codes
- **Avg Scroll Depth:** How far users scroll on average
- **Conversion Rate:** CTA clicks ÷ unique sessions

### Live Event Feed
- **Real-time updates:** Events appear as they happen
- **Event details:** Type, data, timestamp
- **Time ago:** "2s ago", "5m ago", etc.
- **Auto-scrolling:** New events at the top

### Real-Time Subscriptions
The dashboard uses Supabase real-time to update automatically when new events are inserted. No page refresh needed!

---

## 5. Adding Custom Tracking

### Track Custom Events
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleButtonClick = () => {
    trackEvent('custom_event', {
      button_name: 'special_cta',
      value: 100
    });
  };

  return <button onClick={handleButtonClick}>Click Me</button>;
}
```

### Track Section Visibility
```typescript
import { useSectionTracking } from '@/hooks/useAnalytics';

function MySection() {
  useSectionTracking('my-section-name');

  return <section id="my-section-name">...</section>;
}
```

### Track Scroll Depth (Already Added to Homepage)
```typescript
import { useScrollTracking } from '@/hooks/useAnalytics';

function HomePage() {
  useScrollTracking(); // Automatically tracks 25%, 50%, 75%, 100%

  return <main>...</main>;
}
```

---

## 6. Deployment to Production

### Step 1: Update Environment Variables in Vercel
1. Go to Vercel project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

### Step 2: Change Admin Password
Before deploying, update the hardcoded password in `/app/admin/page.tsx`:
```typescript
if (password === 'YOUR_SECURE_PASSWORD_HERE') {
  setIsAuthenticated(true);
}
```

**Better Option:** Use environment variable:
```typescript
if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
  setIsAuthenticated(true);
}
```

### Step 3: Deploy
```bash
git add .
git commit -m "Add analytics system with Supabase"
git push
```

Vercel will automatically deploy with your new analytics system!

---

## 7. Viewing Analytics in Production

### Admin Dashboard
Visit: `https://your-domain.com/admin`

### Supabase Dashboard (SQL Queries)
For advanced analysis, use SQL Editor in Supabase:

**Top CTAs by click count:**
```sql
SELECT
  event_data->>'cta_name' as cta_name,
  COUNT(*) as clicks
FROM analytics_events
WHERE event_type = 'cta_click'
GROUP BY cta_name
ORDER BY clicks DESC;
```

**Conversion funnel:**
```sql
SELECT
  COUNT(DISTINCT session_id) as total_visitors,
  COUNT(DISTINCT CASE WHEN event_type = 'cta_click' THEN session_id END) as clicked_cta,
  ROUND(
    100.0 * COUNT(DISTINCT CASE WHEN event_type = 'cta_click' THEN session_id END) /
    COUNT(DISTINCT session_id),
    2
  ) as conversion_rate
FROM analytics_events
WHERE created_at >= CURRENT_DATE;
```

**Average session duration:**
```sql
SELECT
  session_id,
  MIN(created_at) as first_event,
  MAX(created_at) as last_event,
  EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) as duration_seconds
FROM analytics_events
GROUP BY session_id
HAVING COUNT(*) > 1
ORDER BY duration_seconds DESC;
```

---

## 8. Optional: Enable Vercel Analytics

For additional performance metrics:

1. Go to Vercel project dashboard
2. Click **Analytics** tab
3. Enable **Web Analytics** (free)
4. This will add official Vercel Analytics alongside your custom Supabase tracking

---

## 9. Troubleshooting

### Events Not Appearing in Admin Dashboard
- Check browser console for errors
- Verify `.env.local` has correct Supabase credentials
- Check Supabase dashboard → Database → Tables → `analytics_events` for data
- Ensure real-time is enabled in Supabase (enabled by default)

### "Failed to save event" Error
- Check `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
- Verify API route is working: `http://localhost:3000/api/analytics`
- Check Supabase database logs for errors

### Admin Dashboard Shows 0 Events
- Visit homepage first to generate events
- Click CTAs, scroll, interact with territory checker
- Check browser console for `[Analytics]` logs
- Verify events are in Supabase database

### TypeScript Errors
Run:
```bash
npm run build
```
Fix any type errors before deploying.

---

## 10. Files Created

Here's what was added to your project:

### Database
- `/supabase/schema.sql` - Database schema for analytics

### Configuration
- `/.env.local.example` - Environment variables template
- `/lib/supabase.ts` - Supabase client configuration

### Hooks
- `/hooks/useAnalytics.ts` - Custom analytics hooks

### API Routes
- `/app/api/analytics/route.ts` - API for saving/retrieving events

### Components
- `/components/WebVitals.tsx` - Web Vitals tracking
- `/app/admin/page.tsx` - Admin dashboard

### Modified Files
- `/app/layout.tsx` - Added WebVitals component and metadata
- `/app/page.tsx` - Added scroll tracking
- `/components/ScrollSequence.tsx` - Added CTA tracking
- `/components/FoundingPartners.tsx` - Added CTA tracking
- `/components/TerritoryChecker.tsx` - Added territory check tracking
- `/package.json` - Added `@supabase/supabase-js` dependency

---

## 11. Next Steps

### Week 1: Validate Tracking
- Monitor admin dashboard daily
- Verify all events are being captured
- Check Web Vitals scores (aim for LCP < 2.5s)

### Week 2: Analyze Data
- Which CTA converts best?
- What's the average scroll depth?
- Where do users drop off?

### Week 3: Optimize
- Move high-performing CTAs higher on page
- Shorten sections where users drop off
- Improve Web Vitals if needed

### Future Enhancements
- Add form submission tracking (when forms are built)
- Set up email alerts for high-intent actions (territory checks)
- Build conversion funnel visualization
- Add A/B testing for CTAs
- Export data to CSV for deeper analysis

---

## Support

Questions? Check:
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Web Vitals: https://web.dev/vitals

---

**You're all set!** Start the dev server and visit `/admin` to see your analytics in action. 🚀
