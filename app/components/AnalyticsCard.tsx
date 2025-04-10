'use client';

import { useEffect, useState } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { 
  weeklyAnalytics, 
  biweeklyAnalytics, 
  monthlyAnalytics, 
  weeklySummary, 
  biweeklySummary, 
  monthlySummary,
  getFormattedDates,
  getChartData,
  AnalyticsSummary
} from '../data/analytics';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

type TimeRange = '7' | '14' | '30';

const AnalyticsCard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7');
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary>(weeklySummary);

  useEffect(() => {
    // Generate chart data based on selected time range
    let data;
    let labels;
    let visitData;
    let pageViewData;
    
    switch(timeRange) {
      case '14':
        data = biweeklyAnalytics;
        setSummary(biweeklySummary);
        break;
      case '30':
        data = monthlyAnalytics;
        setSummary(monthlySummary);
        break;
      default:
        data = weeklyAnalytics;
        setSummary(weeklySummary);
    }
    
    labels = getFormattedDates(data);
    visitData = getChartData(data, 'visits');
    pageViewData = getChartData(data, 'pageViews');
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Website Visits',
          data: visitData,
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
        {
          label: 'Page Views',
          data: pageViewData,
          backgroundColor: 'rgba(14, 165, 233, 0.6)',
          borderColor: 'rgba(14, 165, 233, 1)',
          borderWidth: 1,
        }
      ],
    });
  }, [timeRange]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as TimeRange);
  };

  const formatDeltaValue = (value: number) => {
    const prefix = value >= 0 ? '↑' : '↓';
    const color = value >= 0 
      ? (value === 0 ? '#6b7280' : '#16a34a') // grey for 0, green for positive
      : '#dc2626'; // red for negative
    
    // For bounce rate, a negative delta is actually good
    const bounceRateStyle = value < 0 ? '#16a34a' : (value === 0 ? '#6b7280' : '#dc2626');
    
    return (
      <p style={{ fontSize: '0.75rem', color: color }}>
        {prefix} {Math.abs(value)}% from last period
      </p>
    );
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Website Analytics</h3>
        <div>
          <select 
            value={timeRange}
            onChange={handleTimeRangeChange}
            style={{ 
              padding: '0.375rem 0.75rem', 
              fontSize: '0.875rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem',
              backgroundColor: 'white'
            }}
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>
      
      <div style={{ height: '300px', position: 'relative' }}>
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#6b7280'
          }}>
            Loading chart data...
          </div>
        )}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1rem', 
        marginTop: '1.5rem', 
        textAlign: 'center' 
      }}>
        <div style={{
          padding: '1rem',
          borderRadius: '0.375rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Visits</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e40af' }}>
            {summary.totalVisits.toLocaleString()}
          </p>
          {formatDeltaValue(summary.visitsDelta)}
        </div>
        
        <div style={{
          padding: '1rem',
          borderRadius: '0.375rem',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
        }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Avg. Time</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0369a1' }}>
            {summary.avgSessionDuration}
          </p>
          {formatDeltaValue(summary.pageViewsDelta)}
        </div>
        
        <div style={{
          padding: '1rem',
          borderRadius: '0.375rem',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
        }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Bounce Rate</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4338ca' }}>
            {summary.avgBounceRate}%
          </p>
          {/* For bounce rate, negative is good */}
          <p style={{ 
            fontSize: '0.75rem', 
            color: summary.bounceRateDelta < 0 ? '#16a34a' : 
                  (summary.bounceRateDelta === 0 ? '#6b7280' : '#dc2626') 
          }}>
            {summary.bounceRateDelta < 0 ? '↓' : '↑'} {Math.abs(summary.bounceRateDelta)}% from last period
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;