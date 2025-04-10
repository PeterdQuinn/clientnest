export interface Milestone {
    id: string;
    title: string;
    status: 'complete' | 'in-progress' | 'upcoming';
    date: string;
    description?: string;
    assignedTo?: string;
  }
  
  export const milestones: Milestone[] = [
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
  
  // Helper function to format milestone dates for display
  export const formatMilestoneDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Helper function to get status display text and icon
  export const getStatusDisplay = (status: string): { text: string, icon: string } => {
    switch(status) {
      case 'complete':
        return { text: 'Completed', icon: '✅' };
      case 'in-progress':
        return { text: 'In Progress', icon: '⏳' };
      default:
        return { text: 'Upcoming', icon: '📅' };
    }
  };
  
  // Helper function to get status color for UI elements
  export const getStatusColor = (status: string): { bg: string, text: string, border: string } => {
    switch(status) {
      case 'complete':
        return { 
          bg: 'rgba(16, 185, 129, 0.1)', 
          text: '#065f46', 
          border: 'rgba(16, 185, 129, 0.2)' 
        };
      case 'in-progress':
        return { 
          bg: 'rgba(59, 130, 246, 0.1)', 
          text: '#1e40af', 
          border: 'rgba(59, 130, 246, 0.2)' 
        };
      default:
        return { 
          bg: 'rgba(156, 163, 175, 0.1)', 
          text: '#374151', 
          border: 'rgba(156, 163, 175, 0.2)' 
        };
    }
  };
  
  // Filter milestones by status
  export const filterMilestones = (milestones: Milestone[], status?: string): Milestone[] => {
    if (!status || status === 'all') {
      return milestones;
    }
    return milestones.filter(m => m.status === status);
  };
  
  // Calculate project progress percentage based on completed milestones
  export const calculateProgress = (milestones: Milestone[]): number => {
    if (milestones.length === 0) return 0;
    
    const completedCount = milestones.filter(m => m.status === 'complete').length;
    return Math.round((completedCount / milestones.length) * 100);
  };
  
  // Check if a milestone is overdue
  export const isOverdue = (milestone: Milestone): boolean => {
    if (milestone.status === 'complete') return false;
    
    const milestoneDate = new Date(milestone.date);
    const today = new Date();
    
    // Remove time portion for accurate date comparison
    milestoneDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return milestoneDate < today;
  };
  
  // Get upcoming milestones (within the next 7 days)
  export const getUpcomingMilestones = (milestones: Milestone[]): Milestone[] => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return milestones.filter(milestone => {
      if (milestone.status === 'complete') return false;
      
      const milestoneDate = new Date(milestone.date);
      return milestoneDate >= today && milestoneDate <= nextWeek;
    });
  };