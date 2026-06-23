# Noah Lynch Music - Monitoring Guide

## Overview
This guide explains how to monitor page visits, user journeys, and performance for the Noah Lynch Music website using Vercel Analytics and Vercel MCP tools.

## Current Setup

### Vercel Analytics Integration
- **Status**: ✅ Already installed and integrated
- **Location**: `app/layout.tsx` (lines 7-8, 158-159)
- **Components**: `<Analytics />` and `<SpeedInsights />`

### Custom Event Tracking
Custom tracking components have been added to key pages:

#### EPK Page Tracking (`/epk`)
- **Component**: `app/epk/_components/epk-page-tracker.tsx`
- **Events Tracked**:
  - `epk_page_view` - When someone visits the EPK page
  - `epk_booking_click` - When someone clicks the "Book Now" button
  - `epk_social_click` - Social media platform clicks (Instagram, Facebook, YouTube)
  - `epk_music_link_click` - Music platform clicks (Spotify, Apple Music, Amazon Music)

#### Gallery Page Tracking (`/gallery`)
- **Component**: `app/gallery/_components/gallery-page-tracker.tsx`
- **Events Tracked**:
  - `gallery_page_view` - When someone visits the gallery page
  - `gallery_image_click` - When someone clicks on images
  - `gallery_full_link_click` - When someone clicks "View Full Gallery"

## How to View Tracking Data

### 1. Vercel Analytics Dashboard (Primary Method)

Access the Vercel Analytics dashboard at:
https://vercel.com/williamsphotography/noahlynchmusic/analytics

**Available Metrics:**
- Page views and unique visitors
- Web Vitals (LCP, FID, CLS)
- Top pages
- Top countries, devices, browsers
- **Custom Events** - Your tracked events will appear here:
  - `epk_page_view` - EPK page visits
  - `epk_booking_click` - Booking button clicks
  - `epk_social_click` - Social media clicks (with platform data)
  - `epk_music_link_click` - Music platform clicks (with platform data)
  - `gallery_page_view` - Gallery page visits
  - `gallery_image_click` - Image interactions
  - `gallery_full_link_click` - Full gallery link clicks

**Viewing Custom Events:**
1. Navigate to the Analytics dashboard
2. Look for the "Events" or "Custom Events" section
3. Filter by event name to see specific tracking data
4. View event data including timestamps and custom properties

### 2. Vercel REST API (Programmatic Access)

You can fetch analytics data programmatically using the Vercel REST API:

**Get User Events:**
```typescript
const response = await fetch(
  'https://api.vercel.com/v3/events?limit=100&since=2024-06-16&until=2024-06-23&types=event&projectIds=prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6&teamId=team_QWWPyU38gefk5NnRUg983j8w',
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
    },
  }
);

const data = await response.json();
console.log(data);
```

**API Parameters:**
- `limit` - Number of events to return (max 100)
- `since` - Start date (ISO format or timestamp)
- `until` - End date (ISO format or timestamp)
- `types` - Event types to filter (e.g., "event", "pageview")
- `projectIds` - Your project ID: `prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6`
- `teamId` - Your team ID: `team_QWWPyU38gefk5NnRUg983j8w`
- `withPayload` - Include full event data

**Event Data Structure:**
```json
{
  "schema": "vercel.analytics.v2",
  "eventType": "event",
  "eventName": "epk_page_view",
  "eventData": "{\"page\":\"/epk\",\"timestamp\":\"2024-06-23T10:00:00.000Z\"}",
  "timestamp": 1694723400000,
  "projectId": "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  "ownerId": "team_QWWPyU38gefk5NnRUg983j8w",
  "sessionId": 12345,
  "deviceId": 67890,
  "origin": "https://www.noahlynch.com",
  "path": "/epk"
}
```

### 3. Log Drains (Export to External Systems)

Set up log drains to export analytics data to external systems:

**Supported Formats:**
- JSON Array (batch processing)
- NDJSON (stream processing)

**Example Analytics Data (JSON):**
```json
[
  {
    "schema": "vercel.analytics.v2",
    "eventType": "pageview",
    "timestamp": 1694723400000,
    "projectId": "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
    "ownerId": "team_QWWPyU38gefk5NnRUg983j8w",
    "sessionId": 12345,
    "deviceId": 67890,
    "origin": "https://www.noahlynch.com",
    "path": "/epk"
  },
  {
    "schema": "vercel.analytics.v2",
    "eventType": "event",
    "eventName": "epk_booking_click",
    "eventData": "{\"page\":\"/epk\",\"action\":\"booking_button_click\"}",
    "timestamp": 1694723405000,
    "projectId": "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
    "ownerId": "team_QWWPyU38gefk5NnRUg983j8w",
    "sessionId": 12345,
    "deviceId": 67890,
    "origin": "https://www.noahlynch.com",
    "path": "/epk"
  }
]
```

### 4. Runtime Logs (Alternative Method)

While not the primary method for analytics data, runtime logs can provide additional context:

```typescript
// View logs for specific pages
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  query: "/epk",
  since: "7d"
})
```

## Data Availability

**Initial Data:**
- Custom events typically appear in the dashboard within 24-48 hours after deployment
- Page views and basic metrics may appear sooner (within minutes)

**Historical Data:**
- Vercel Analytics retains data for up to 90 days on free plans
- Paid plans offer extended retention

**Real-Time vs. Processed:**
- Runtime logs provide near real-time data
- Analytics dashboard data is processed and aggregated (slight delay)

## Monitoring with Vercel MCP Tools

### Project Details
- **Project ID**: `prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6`
- **Team ID**: `team_QWWPyU38gefk5NnRUg983j8w`
- **Current Production Deployment**: `dpl_A9K5apuYmZ5CTFQwsqiUbB3DuNgw`
- **Domains**: `www.noahlynch.com`, `noahlynch.com`

### Runtime Logs Monitoring

#### Monitor All Production Logs (Last 24h)
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  limit: 100,
  since: "24h"
})
```

#### Monitor EPK Page Visits
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  query: "/epk",
  limit: 50,
  since: "7d"
})
```

#### Monitor Gallery Page Visits
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  query: "/gallery",
  limit: 50,
  since: "7d"
})
```

#### Monitor Tour Dates Page
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  query: "/tour-dates",
  limit: 50,
  since: "7d"
})
```

#### Monitor Music Pages (Dynamic Routes)
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  query: "/music/",
  limit: 50,
  since: "7d"
})
```

### Error Monitoring

#### Monitor Error Logs
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  level: ["error", "fatal"],
  limit: 50,
  since: "7d"
})
```

#### Monitor Client-Side Errors (4xx Status)
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  statusCode: "404",
  limit: 50,
  since: "7d"
})
```

### Performance Monitoring

#### Monitor Serverless Functions
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  source: ["serverless", "edge-function"],
  limit: 50,
  since: "7d"
})
```

### Real-Time Monitoring

#### Monitor Recent Activity (Last Hour)
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  since: "1h",
  limit: 100
})
```

#### Monitor Recent Activity (Last 30 Minutes)
```typescript
mcp3_get_runtime_logs({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  environment: "production",
  since: "30m",
  limit: 50
})
```

### Deployment Monitoring

#### Get Latest Deployment Info
```typescript
mcp3_get_deployment({
  idOrUrl: "dpl_A9K5apuYmZ5CTFQwsqiUbB3DuNgw",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w"
})
```

#### Get Deployment Build Logs
```typescript
mcp3_get_deployment_build_logs({
  idOrUrl: "dpl_A9K5apuYmZ5CTFQwsqiUbB3DuNgw",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w",
  limit: 100
})
```

#### List All Deployments
```typescript
mcp3_list_deployments({
  projectId: "prj_hDIAtW4LeLwh2DsqOHObJBxa0SX6",
  teamId: "team_QWWPyU38gefk5NnRUg983j8w"
})
```

## Key Pages to Monitor

### High Priority Pages
1. **`/epk`** - Electronic Press Kit (industry professionals)
   - Track booking inquiries
   - Monitor social media engagement
   - Track music platform clicks

2. **`/gallery`** - Photo gallery
   - Track image engagement
   - Monitor user interest in live performances

3. **`/tour-dates`** - Tour information
   - Track venue interest
   - Monitor booking potential

4. **`/music/[slug]`** - Individual music pages
   - Track which songs get most attention
   - Monitor streaming platform clicks

### User Journey Analysis

#### Typical Industry Professional Journey
1. Lands on homepage (`/`)
2. Clicks to EPK (`/epk`)
3. Reviews bio and music
4. Clicks "Book Now" button
5. Visits social media platforms

#### Typical Fan Journey
1. Lands on homepage (`/`)
2. Browses music (`/music/`)
3. Views gallery (`/gallery`)
4. Checks tour dates (`/tour-dates`)
5. Follows on social media

## Alert Recommendations

### Set Up Alerts For:
- **EPK page visits** - Important for booking opportunities
- **Error spikes** - Monitor for 4xx/5xx status codes
- **Slow response times** - Monitor serverless function performance
- **Booking button clicks** - Track conversion opportunities

### Key Metrics to Track
1. **EPK conversion rate** - EPK visits → Booking clicks
2. **Music page engagement** - Which songs get most attention
3. **Gallery interaction** - Image clicks and full gallery views
4. **Tour date interest** - Which venues generate most clicks

## CLI Commands (Alternative)

### View Production Logs
```bash
vercel logs --environment production --since 24h
```

### View EPK Page Logs
```bash
vercel logs --environment production --query "/epk" --since 7d
```

### Monitor Errors
```bash
vercel logs --environment production --level error --since 24h
```

### Stream Live Logs
```bash
vercel logs --follow --environment production
```

## Next Steps

1. **Deploy the changes** to production to enable custom tracking
2. **Monitor initial data** for 1-2 weeks to establish baselines
3. **Set up alerts** for key metrics (EPK visits, errors)
4. **Analyze user journeys** to optimize conversion paths
5. **Review Web Vitals** to ensure optimal performance

## Troubleshooting

### If tracking doesn't appear:
1. Ensure the site is deployed to production
2. Check that Vercel Analytics is properly initialized
3. Verify custom event tracking components are imported correctly
4. Allow 24-48 hours for initial data to appear in Vercel Analytics

### If MCP tools return errors:
1. Verify team and project IDs are correct
2. Ensure you have proper authentication
3. Check that the deployment ID is current
4. Try with shorter time ranges (e.g., "1h" instead of "7d")
