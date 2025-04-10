export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on window resize (if it becomes desktop view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: { xs: '0', md: '16rem' }, // Apply margin on medium screens and up
        width: { xs: '100%', md: 'calc(100% - 16rem)' } 
      }} className="content-wrapper">
        <Topbar toggleMobileMenu={toggleMobileMenu} />
        
        <div style={{ 
          flex: '1', 
          padding: '1.5rem', 
          backgroundColor: '#f3f4f6', 
          overflow: 'auto'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.5rem'
          }}>
            <ProjectOverview />
            <Timeline />
            <MessageLog />
            <FileUploads />
            <AnalyticsCard />
          </div>
        </div>
      </div>
    </div>
  );
}'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Add responsive CSS for mobile/desktop display
const globalStyles = `
  @media (min-width: 768px) {
    .mobile-only {
      display: none !important;
    }
    .desktop-sidebar {
      left: 0 !important;
    }
    .content-wrapper {
      margin-left: 16rem;
      width: calc(100% - 16rem);
    }
  }
  
  @media (max-width: 767px) {
    .desktop-only {
      display: none !important;
    }
    .content-wrapper {
      margin-left: 0;
      width: 100%;
    }
  }
`;

const Sidebar = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 40 
          }} 
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div 
        style={{ 
          width: '16rem', 
          height: '100%', 
          backgroundColor: 'white', 
          borderRight: '1px solid #e5e7eb', 
          padding: '1rem',
          position: 'fixed',
          zIndex: 50,
          left: isMobileMenuOpen ? '0' : '-100%',
          transition: 'left 0.3s ease-in-out',
          top: 0,
          bottom: 0,
          overflowY: 'auto'
        }}
        className="desktop-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>ClientNest</h1>
          <button 
            onClick={toggleMobileMenu}
            style={{ display: 'block', padding: '0.5rem' }}
            className="mobile-only"
          >
            <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <a style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#f3f4f6', color: '#111827', marginBottom: '0.5rem' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
            <span style={{ marginLeft: '0.75rem' }}>Dashboard</span>
          </a>
          <a style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '0.375rem', color: '#111827', marginBottom: '0.5rem' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
              <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
              <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
            </svg>
            <span style={{ marginLeft: '0.75rem' }}>Files</span>
          </a>
          <a style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '0.375rem', color: '#111827', marginBottom: '0.5rem' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"/>
              <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"/>
            </svg>
            <span style={{ marginLeft: '0.75rem' }}>Messages</span>
          </a>
          <a style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '0.375rem', color: '#111827', marginBottom: '0.5rem' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 7.5h-1V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.5H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM5 3h10v4.5H5V3Zm13 14.5H2v-5h1.5v.5A1.5 1.5 0 0 0 5 14.5h4.5a1.5 1.5 0 0 0 1.5-1.5V13h3v.5a1.5 1.5 0 0 0 1.5 1.5H20v5Z"/>
            </svg>
            <span style={{ marginLeft: '0.75rem' }}>Settings</span>
          </a>
        </nav>
        
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <a style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '0.375rem', color: '#111827' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
            </svg>
            <span style={{ marginLeft: '0.75rem' }}>Logout</span>
          </a>
        </div>
      </div>
    </>
  );
};

const Topbar = ({ toggleMobileMenu }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '1rem 1.5rem', 
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={toggleMobileMenu} 
          style={{ marginRight: '1rem', display: 'block' }}
          className="mobile-only"
        >
          <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Hey Jessica 👋</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem', position: 'relative' }}>
          <svg style={{ width: '1.25rem', height: '1.25rem', color: '#4b5563' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>
          </svg>
        </div>
        
        <button style={{ display: 'flex', fontSize: '0.875rem', backgroundColor: '#1f2937', borderRadius: '9999px' }}>
          <img style={{ width: '2rem', height: '2rem', borderRadius: '9999px' }} src="https://ui-avatars.com/api/?name=Jessica+Smith&background=0D8ABC&color=fff" alt="user photo" />
        </button>
      </div>
    </div>
  );
};

const ProjectOverview = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Project Overview</h3>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>2 projects</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ fontWeight: '500' }}>Website Redesign</h4>
            <span style={{ 
              backgroundColor: '#dbeafe', 
              color: '#1d4ed8', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '9999px', 
              fontSize: '0.75rem', 
              fontWeight: '500' 
            }} className="status-badge status-in-progress">In Progress</span>
          </div>
          <div style={{ 
            height: '0.5rem', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '9999px', 
            overflow: 'hidden', 
            marginBottom: '0.5rem' 
          }} className="progress-bar">
            <div style={{ 
              width: '80%', 
              backgroundColor: '#3b82f6', 
              height: '100%'
            }} className="progress-bar-fill"></div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '0.875rem', 
            color: '#6b7280',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <span>80% Complete</span>
            <span>Due: April 30, 2025</span>
          </div>
        </div>
        
        <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ fontWeight: '500' }}>SEO Optimization</h4>
            <span style={{ 
              backgroundColor: '#dcfce7', 
              color: '#15803d', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '9999px', 
              fontSize: '0.75rem', 
              fontWeight: '500' 
            }} className="status-badge status-complete">Complete</span>
          </div>
          <div style={{ 
            height: '0.5rem', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '9999px', 
            overflow: 'hidden', 
            marginBottom: '0.5rem' 
          }} className="progress-bar">
            <div style={{ 
              width: '100%', 
              backgroundColor: '#10b981', 
              height: '100%'
            }} className="progress-bar-fill"></div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '0.875rem', 
            color: '#6b7280',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <span>100% Complete</span>
            <span>Completed: March 15, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>Project Timeline</h3>
      
      <ol style={{ position: 'relative', borderLeft: '1px solid #e5e7eb' }}>
        <li style={{ marginBottom: '1.5rem', marginLeft: '1rem', position: 'relative' }}>
          <div style={{ position: 'absolute', width: '0.75rem', height: '0.75rem', backgroundColor: '#10b981', borderRadius: '9999px', top: '0.375rem', left: '-1.375rem', border: '1px solid white' }}></div>
          <time style={{ marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280', display: 'block' }}>March 1, 2025</time>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Kickoff Call – ✅</h4>
        </li>
        <li style={{ marginBottom: '1.5rem', marginLeft: '1rem', position: 'relative' }}>
          <div style={{ position: 'absolute', width: '0.75rem', height: '0.75rem', backgroundColor: '#10b981', borderRadius: '9999px', top: '0.375rem', left: '-1.375rem', border: '1px solid white' }}></div>
          <time style={{ marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280', display: 'block' }}>March 10, 2025</time>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Homepage Mockup – ✅</h4>
        </li>
        <li style={{ marginLeft: '1rem', position: 'relative' }}>
          <div style={{ position: 'absolute', width: '0.75rem', height: '0.75rem', backgroundColor: '#3b82f6', borderRadius: '9999px', top: '0.375rem', left: '-1.375rem', border: '1px solid white' }}></div>
          <time style={{ marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280', display: 'block' }}>April 15, 2025</time>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>SEO Setup – ⏳</h4>
        </li>
      </ol>
    </div>
  );
};

const MessageLog = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>Recent Messages</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ 
          backgroundColor: '#f9fafb', 
          borderRadius: '0.5rem', 
          padding: '0.75rem', 
          border: '1px solid #e5e7eb' 
        }} className="message-card message-dev">
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>You - 2 days ago</div>
          <p style={{ fontSize: '0.875rem' }}>Hi Jessica, I've finished the homepage mockup. Can you take a look when you have a chance?</p>
        </div>
        
        <div style={{ 
          backgroundColor: '#dbeafe', 
          borderRadius: '0.5rem', 
          padding: '0.75rem', 
          border: '1px solid #bfdbfe' 
        }} className="message-card message-client">
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Jessica - Yesterday</div>
          <p style={{ fontSize: '0.875rem' }}>I love it! The design looks fantastic. Quick question - could we make the logo a bit larger?</p>
        </div>
        
        <div style={{ 
          backgroundColor: '#f9fafb', 
          borderRadius: '0.5rem', 
          padding: '0.75rem', 
          border: '1px solid #e5e7eb' 
        }} className="message-card message-dev">
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>You - Yesterday</div>
          <p style={{ fontSize: '0.875rem' }}>Absolutely! I'll adjust that and send you an updated version by EOD today.</p>
        </div>
      </div>
      
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <input type="text" style={{ 
            flexGrow: 1, 
            borderTopLeftRadius: '0.5rem', 
            borderBottomLeftRadius: '0.5rem', 
            borderWidth: '1px', 
            borderColor: '#d1d5db', 
            padding: '0.5rem', 
            fontSize: '0.875rem',
            width: '100%'
          }} placeholder="Type a message..." />
          <button style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            borderTopRightRadius: '0.5rem', 
            borderBottomRightRadius: '0.5rem', 
            padding: '0 1rem',
            whiteSpace: 'nowrap'
          }}>Send</button>
        </div>
      </div>
    </div>
  );
};

const FileUploads = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Files & Documents</h3>
        <button style={{ fontSize: '0.875rem', fontWeight: '500', color: '#2563eb' }}>Upload File</button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0.75rem', 
          borderRadius: '0.5rem', 
          border: '1px solid #e5e7eb',
          flexWrap: 'wrap',
          gap: '0.75rem' 
        }} className="file-card">
          <div style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
              <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
            </svg>
          </div>
          <div style={{ flexGrow: 1 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>logo-final.png</p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploaded on March 10, 2025</p>
          </div>
          <a href="#" style={{ fontSize: '0.875rem', color: '#2563eb', whiteSpace: 'nowrap' }}>Download</a>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0.75rem', 
          borderRadius: '0.5rem', 
          border: '1px solid #e5e7eb',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }} className="file-card">
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
              <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2Z"/>
            </svg>
          </div>
          <div style={{ flexGrow: 1 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>seo-checklist.pdf</p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploaded on March 15, 2025</p>
          </div>
          <a href="#" style={{ fontSize: '0.875rem', color: '#2563eb', whiteSpace: 'nowrap' }}>Download</a>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCard = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>Weekly Analytics</h3>
      
      <div style={{ height: '16rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: '0.5rem' }}>
        <div>
          <p style={{ textAlign: 'center' }}>Chart.js integration will go here</p>
          <p style={{ fontSize: '0.875rem', textAlign: 'center' }}>Weekly website visits: 1,240</p>
        </div>
      </div>
    </div>>