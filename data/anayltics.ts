export interface AnalyticsDataPoint {
    date: string;
    visits: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: string; // in format "m:ss"
  }
  
  export interface AnalyticsSummary {
    totalVisits: number;
    totalPageViews: number;
    avgBounceRate: number;
    avgSessionDuration: string;
    visitsDelta: number; // percentage change from previous period
    pageViewsDelta: number;
    bounceRateDelta: number;
  }
  
  // Sample daily analytics data for the past week
  export const weeklyAnalytics: AnalyticsDataPoint[] = [
    {
      date: '2025-04-02',
      visits: 150,
      pageViews: 250,
      bounceRate: 25,
      avgSessionDuration: '4:12'
    },
    {
      date: '2025-04-03',
      visits: 230,
      pageViews: 390,
      bounceRate: 24,
      avgSessionDuration: '4:45'
    },
    {
      date: '2025-04-04',
      visits: 180,
      pageViews: 300,
      bounceRate: 26,
      avgSessionDuration: '3:58'
    },
    {
      date: '2025-04-05',
      visits: 290,
      pageViews: 500,
      bounceRate: 22,
      avgSessionDuration: '5:10'
    },
    {
      date: '2025-04-06',
      visits: 200,
      pageViews: 320,
      bounceRate: 23,
      avgSessionDuration: '4:30'
    },
    {
      date: '2025-04-07',
      visits: 100,
      pageViews: 220,
      bounceRate: 28,
      avgSessionDuration: '3:45'
    },
    {
      date: '2025-04-08',
      visits: 90,
      pageViews: 190,
      bounceRate: 27,
      avgSessionDuration: '4:05'
    }
  ];
  
  // Sample biweekly analytics data
  export const biweeklyAnalytics: AnalyticsDataPoint[] = [
    ...weeklyAnalytics,
    {
      date: '2025-03-26',
      visits: 120,
      pageViews: 210,
      bounceRate: 29,
      avgSessionDuration: '3:30'
    },
    {
      date: '2025-03-27',
      visits: 185,
      pageViews: 320,
      bounceRate: 25,
      avgSessionDuration: '4:15'
    },
    {
      date: '2025-03-28',
      visits: 160,
      pageViews: 280,
      bounceRate: 26,
      avgSessionDuration: '3:55'
    },
    {
      date: '2025-03-29',
      visits: 260,
      pageViews: 450,
      bounceRate: 23,
      avgSessionDuration: '4:40'
    },
    {
      date: '2025-03-30',
      visits: 190,
      pageViews: 290,
      bounceRate: 24,
      avgSessionDuration: '4:22'
    },
    {
      date: '2025-03-31',
      visits: 110,
      pageViews: 200,
      bounceRate: 28,
      avgSessionDuration: '3:55'
    },
    {
      date: '2025-04-01',
      visits: 95,
      pageViews: 180,
      bounceRate: 30,
      avgSessionDuration: '3:40'
    }
  ];
  
  // Sample monthly analytics data
  export const monthlyAnalytics: AnalyticsDataPoint[] = [
    ...biweeklyAnalytics,
    // Additional data points for a full month would go here
    // This is abbreviated for brevity
  ];
  
  // Summary statistics
  export const weeklySummary: AnalyticsSummary = {
    totalVisits: 1240,
    totalPageViews: 2170,
    avgBounceRate: 24,
    avgSessionDuration: '4:32',
    visitsDelta: 12, // 12% increase from previous week
    pageViewsDelta: 8,
    bounceRateDelta: -3 // negative means improvement (lower bounce rate)
  };
  
  export const biweeklySummary: AnalyticsSummary = {
    totalVisits: 2360,
    totalPageViews: 4100,
    avgBounceRate: 25.5,
    avgSessionDuration: '4:15',
    visitsDelta: 10,
    pageViewsDelta: 7,
    bounceRateDelta: -2
  };
  
  export const monthlySummary: AnalyticsSummary = {
    totalVisits: 4780,
    totalPageViews: 8250,
    avgBounceRate: 25,
    avgSessionDuration: '4:20',
    visitsDelta: 15,
    pageViewsDelta: 12,
    bounceRateDelta: -5
  };
  
  // Helper function to format dates as day names (e.g., "Mon", "Tue")
  export function getFormattedDates(data: AnalyticsDataPoint[]): string[] {
    return data.map(point => {
      const date = new Date(point.date);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }).reverse(); // Most recent date last
  }
  
  // Helper function to extract specific metrics for chart
  export function getChartData(data: AnalyticsDataPoint[], metric: keyof AnalyticsDataPoint): number[] {
    return data.map(point => {
      // Handle special case for avgSessionDuration which is a string
      if (metric === 'avgSessionDuration') {
        const [minutes, seconds] = (point[metric] as string).split(':').map(Number);
        return minutes * 60 + seconds;
      }
      return point[metric] as number;
    }).reverse(); // Most recent data last
  }