'use client';

import { useState } from 'react';

// Define project data interface
interface Project {
  id: number;
  title: string;
  status: 'In Progress' | 'Complete' | 'Pending';
  progress: number;
  dueDate: string;
  description?: string;
  tasks?: {
    total: number;
    completed: number;
  };
}

// Sample project data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Website Redesign",
    status: "In Progress",
    progress: 80,
    dueDate: "2025-04-30",
    description: "Refresh the company website with new brand guidelines and improved UX.",
    tasks: {
      total: 12,
      completed: 9
    }
  },
  {
    id: 2,
    title: "SEO Optimization",
    status: "Complete",
    progress: 100,
    dueDate: "2025-03-15",
    description: "Improve organic search visibility and rankings.",
    tasks: {
      total: 8,
      completed: 8
    }
  },
  {
    id: 3,
    title: "Email Campaign",
    status: "Pending",
    progress: 0,
    dueDate: "2025-05-10",
    description: "Create a series of promotional emails for the upcoming product launch.",
    tasks: {
      total: 6,
      completed: 0
    }
  }
];

const ProjectOverview = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  
  // Filter projects based on selected filter
  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => 
        selectedFilter === 'complete' 
          ? project.status === 'Complete' 
          : project.status !== 'Complete'
      );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusClass = (status: string): string => {
    switch(status) {
      case 'In Progress':
        return 'status-in-progress';
      case 'Complete':
        return 'status-complete';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressBarColor = (status: string, progress: number): string => {
    if (status === 'Complete') return '#10b981'; // green
    if (progress > 75) return '#3b82f6'; // blue
    if (progress > 40) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const toggleProjectExpand = (projectId: number) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Project Overview</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setSelectedFilter('all')}
            style={{ 
              backgroundColor: selectedFilter === 'all' ? '#e5e7eb' : 'transparent', 
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
            onClick={() => setSelectedFilter('active')}
            style={{ 
              backgroundColor: selectedFilter === 'active' ? '#dbeafe' : 'transparent', 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Active
          </button>
          <button 
            onClick={() => setSelectedFilter('complete')}
            style={{ 
              backgroundColor: selectedFilter === 'complete' ? '#d1fae5' : 'transparent', 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Complete
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div 
              key={project.id} 
              style={{ 
                border: '1px solid #e5e7eb', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => toggleProjectExpand(project.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: '500' }}>{project.title}</h4>
                <span 
                  className={getStatusClass(project.status)}
                  style={{ 
                    padding: '0.25rem 0.5rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    borderRadius: '9999px' 
                  }}
                >
                  {project.status}
                </span>
              </div>
              
              <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${project.progress}%`, 
                    backgroundColor: getProgressBarColor(project.status, project.progress) 
                  }}
                ></div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <span>{project.progress}% Complete</span>
                  {project.tasks && (
                    <span>• {project.tasks.completed}/{project.tasks.total} Tasks</span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {project.status === 'Complete' ? 'Completed' : 'Due'}: {formatDate(project.dueDate)}
                </div>
              </div>
              
              {expandedProject === project.id && (
                <div style={{ 
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  {project.description && (
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
                      {project.description}
                    </p>
                  )}
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        fontSize: '0.75rem',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // In a real app, this would open project details
                        alert(`View details for ${project.title}`);
                      }}
                    >
                      <svg style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                          <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                        </g>
                      </svg>
                      View Details
                    </button>
                    
                    {project.status !== 'Complete' && (
                      <button
                        style={{
                          backgroundColor: 'transparent',
                          color: '#2563eb',
                          fontSize: '0.75rem',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '0.375rem',
                          border: '1px solid #2563eb',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // In a real app, this would mark the project as complete
                          const updatedProjects = projects.map(p => 
                            p.id === project.id 
                              ? { ...p, status: 'Complete' as const, progress: 100 } 
                              : p
                          );
                          setProjects(updatedProjects);
                        }}
                      >
                        <svg style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            color: '#6b7280', 
            border: '1px dashed #d1d5db', 
            borderRadius: '0.375rem' 
          }}>
            <svg style={{ width: '2rem', height: '2rem', margin: '0 auto', marginBottom: '0.5rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v6m0 3v.01"/>
            </svg>
            <p>No projects found matching your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;