'use client';

import { useState } from 'react';

interface Milestone {
  id: string;
  title: string;
  status: 'complete' | 'in-progress' | 'upcoming';
  date: string;
  description?: string;
  assignedTo?: string;
}

// Sample milestone data
const milestonesData: Milestone[] = [
  {
    id: 'm1',
    title: 'Kickoff Call',
    status: 'complete',
    date: '2025-03-01',
    description: 'Initial project discussion and scope definition with Jessica.',
    assignedTo: 'Both'
  },
  {
    id: 'm2',
    title: 'Homepage Mockup',
    status: 'complete',
    date: '2025-03-10',
    description: 'Design the initial mockup for the homepage based on project requirements.',
    assignedTo: 'You'
  },
  {
    id: 'm3',
    title: 'SEO Setup',
    status: 'in-progress',
    date: '2025-04-15',
    description: 'Configure meta tags, headings, and content for optimal search engine visibility.',
    assignedTo: 'You'
  },
  {
    id: 'm4',
    title: 'Content Creation',
    status: 'upcoming',
    date: '2025-04-20',
    description: 'Develop website copy and content based on brand guidelines.',
    assignedTo: 'Jessica'
  },
  {
    id: 'm5',
    title: 'Final Review',
    status: 'upcoming',
    date: '2025-04-25',
    description: 'Comprehensive review of the website before launch.',
    assignedTo: 'Both'
  },
  {
    id: 'm6',
    title: 'Launch',
    status: 'upcoming',
    date: '2025-04-30',
    description: 'Deploy the website to production servers and make it live.',
    assignedTo: 'You'
  }
];

const Timeline = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(milestonesData);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Filter milestones based on selected filter
  const filteredMilestones = activeFilter === 'all' 
    ? milestones 
    : milestones.filter(m => m.status === activeFilter);
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get status icon
  const getStatusIcon = (status: string): React.ReactNode => {
    switch(status) {
      case 'complete':
        return <span style={{ marginLeft: '0.25rem' }}>✅</span>;
      case 'in-progress':
        return <span style={{ marginLeft: '0.25rem' }}>⏳</span>;
      default:
        return <span style={{ marginLeft: '0.25rem' }}>📅</span>;
    }
  };
  
  // Get dot color based on status
  const getDotColor = (status: string): string => {
    switch(status) {
      case 'complete':
        return '#10b981'; // Green
      case 'in-progress':
        return '#3b82f6'; // Blue
      default:
        return '#9ca3af'; // Gray
    }
  };
  
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Project Timeline</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveFilter('all')}
            style={{ 
              backgroundColor: activeFilter === 'all' ? '#e5e7eb' : 'transparent', 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('complete')}
            style={{ 
              backgroundColor: activeFilter === 'complete' ? '#d1fae5' : 'transparent', 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Complete
          </button>
          <button 
            onClick={() => setActiveFilter('in-progress')}
            style={{ 
              backgroundColor: activeFilter === 'in-progress' ? '#dbeafe' : 'transparent', 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            In progress
          </button>
          <button 
            onClick={() => setActiveFilter('upcoming')}
            style={{ 
              backgroundColor: activeFilter === 'upcoming' ? '#f3f4f6' : 'transparent', 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Upcoming
          </button>
        </div>
      </div>
      
      <ol style={{ position: 'relative', borderLeft: '1px solid #e5e7eb' }}>
        {filteredMilestones.map((milestone) => (
          <li key={milestone.id} style={{ marginBottom: '1.5rem', marginLeft: '1rem', position: 'relative' }}>
            <div 
              style={{ 
                position: 'absolute', 
                width: '0.75rem', 
                height: '0.75rem', 
                backgroundColor: getDotColor(milestone.status), 
                borderRadius: '9999px', 
                top: '0.375rem', 
                left: '-1.375rem', 
                border: '1px solid white' 
              }}
            ></div>
            
            <div 
              style={{ 
                backgroundColor: milestone.status === 'complete' ? 'rgba(16, 185, 129, 0.1)' : 
                               milestone.status === 'in-progress' ? 'rgba(59, 130, 246, 0.1)' : 
                               'rgba(156, 163, 175, 0.1)',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                border: '1px solid ' + (
                  milestone.status === 'complete' ? 'rgba(16, 185, 129, 0.2)' : 
                  milestone.status === 'in-progress' ? 'rgba(59, 130, 246, 0.2)' : 
                  'rgba(156, 163, 175, 0.2)'
                )
              }}
            >
              <time 
                style={{ 
                  marginBottom: '0.25rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 'normal', 
                  color: '#6b7280', 
                  display: 'block' 
                }}
              >
                {formatDate(milestone.date)}
              </time>
              
              <h4 
                style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {milestone.title} {getStatusIcon(milestone.status)}
              </h4>
              
              {milestone.description && (
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {milestone.description}
                </p>
              )}
              
              {milestone.assignedTo && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  <span>Assigned to: </span>
                  <span style={{ 
                    marginLeft: '0.25rem',
                    backgroundColor: milestone.assignedTo === 'You' ? '#dbeafe' : 
                                   milestone.assignedTo === 'Jessica' ? '#fce7f3' : 
                                   '#f3f4f6',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '9999px',
                    fontSize: '0.675rem',
                    color: milestone.assignedTo === 'You' ? '#1e40af' : 
                           milestone.assignedTo === 'Jessica' ? '#9d174d' : 
                           '#374151'
                  }}>
                    {milestone.assignedTo}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
        
        {filteredMilestones.length === 0 && (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            color: '#6b7280', 
            border: '1px dashed #d1d5db', 
            borderRadius: '0.375rem',
            marginLeft: '0.5rem'
          }}>
            <svg style={{ width: '2rem', height: '2rem', margin: '0 auto', marginBottom: '0.5rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v6m0 3v.01"/>
            </svg>
            <p>No milestones found matching your filter.</p>
          </div>
        )}
      </ol>
    </div>
  );
};

export default Timeline;