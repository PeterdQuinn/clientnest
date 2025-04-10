export interface Project {
    id: number;
    title: string;
    status: 'In Progress' | 'Complete' | 'Pending';
    progress: number;
    dueDate: string;
    description?: string;
    clientName?: string;
    tasks?: {
      total: number;
      completed: number;
    };
    team?: string[];
    tags?: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Website Redesign",
      status: "In Progress",
      progress: 80,
      dueDate: "2025-04-30",
      description: "Refresh the company website with new brand guidelines and improved UX.",
      clientName: "Jessica Smith",
      tasks: {
        total: 12,
        completed: 9
      },
      team: ["You"],
      tags: ["Design", "Frontend", "UI/UX"]
    },
    {
      id: 2,
      title: "SEO Optimization",
      status: "Complete",
      progress: 100,
      dueDate: "2025-03-15",
      description: "Improve organic search visibility and rankings.",
      clientName: "Jessica Smith",
      tasks: {
        total: 8,
        completed: 8
      },
      team: ["You"],
      tags: ["SEO", "Analytics", "Content"]
    },
    {
      id: 3,
      title: "Email Campaign",
      status: "Pending",
      progress: 0,
      dueDate: "2025-05-10",
      description: "Create a series of promotional emails for the upcoming product launch.",
      clientName: "Jessica Smith",
      tasks: {
        total: 6,
        completed: 0
      },
      team: ["You"],
      tags: ["Email", "Marketing", "Content"]
    },
    {
      id: 4,
      title: "Brand Redesign",
      status: "In Progress",
      progress: 45,
      dueDate: "2025-06-15",
      description: "Create a new brand identity including logo, color scheme, and typography.",
      clientName: "Jessica Smith",
      tasks: {
        total: 10,
        completed: 4
      },
      team: ["You"],
      tags: ["Branding", "Design", "Identity"]
    }
  ];
  
  // Helper functions for working with projects
  
  // Format project date for display
  export const formatProjectDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get project status color
  export const getStatusColor = (status: string): { bg: string, text: string } => {
    switch(status) {
      case 'Complete':
        return { bg: '#d1fae5', text: '#065f46' };
      case 'In Progress':
        return { bg: '#dbeafe', text: '#1e40af' };
      case 'Pending':
        return { bg: '#f3f4f6', text: '#374151' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };
  
  // Get progress bar color based on status and progress percentage
  export const getProgressColor = (status: string, progress: number): string => {
    if (status === 'Complete') return '#10b981'; // green
    if (progress > 75) return '#3b82f6'; // blue
    if (progress > 40) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };
  
  // Filter projects by status
  export const filterProjectsByStatus = (projects: Project[], status?: string): Project[] => {
    if (!status || status === 'all') {
      return projects;
    }
    
    if (status === 'active') {
      return projects.filter(project => project.status !== 'Complete');
    }
    
    return projects.filter(project => project.status === status);
  };
  
  // Check if a project is overdue
  export const isProjectOverdue = (project: Project): boolean => {
    if (project.status === 'Complete') return false;
    
    const dueDate = new Date(project.dueDate);
    const today = new Date();
    
    // Remove time portion for accurate date comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };
  
  // Calculate days remaining until due date (or days overdue)
  export const getDaysRemaining = (project: Project): { days: number, overdue: boolean } => {
    const dueDate = new Date(project.dueDate);
    const today = new Date();
    
    // Remove time portion for accurate date comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: Math.abs(diffDays),
      overdue: diffDays < 0
    };
  };