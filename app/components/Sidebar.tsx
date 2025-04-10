'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  count?: number;
}

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
        </svg>
      )
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
        </svg>
      ),
      count: 4
    },
    {
      name: 'Files',
      href: '/files',
      icon: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
          <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
          <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
        </svg>
      )
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"/>
          <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"/>
        </svg>
      ),
      count: 6
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8Zm.5-13c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5Zm1.5 5c0 .6-.4 1-1 1H9v4h2c.6 0 1 .4 1 1s-.4 1-1 1H8c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1h2V9h-2c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1 .4 1 1v2Z"/>
        </svg>
      )
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 7.5h-1V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.5H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM5 3h10v4.5H5V3Zm13 14.5H2v-5h1.5v.5A1.5 1.5 0 0 0 5 14.5h4.5a1.5 1.5 0 0 0 1.5-1.5V13h3v.5a1.5 1.5 0 0 0 1.5 1.5H20v5Z"/>
        </svg>
      )
    }
  ];
  
  return (
    <aside 
      style={{ 
        width: collapsed ? '5rem' : '16rem', 
        height: '100%', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e5e7eb', 
        padding: '1rem',
        transition: 'width 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Logo and collapse toggle */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        marginBottom: '2rem' 
      }}>
        {!collapsed ? (
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>ClientNest</h1>
        ) : (
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>CN</div>
        )}
        
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          style={{ 
            backgroundColor: 'transparent', 
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}
        >
          {collapsed ? (
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
          ) : (
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            style={{ textDecoration: 'none' }}
            onClick={() => setActiveItem(item.name)}
          >
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem', 
                backgroundColor: activeItem === item.name ? '#f3f4f6' : 'transparent', 
                color: activeItem === item.name ? '#111827' : '#6b7280',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: collapsed ? 0 : '0.75rem' }}>
                {item.icon}
              </div>
              
              {!collapsed && <span>{item.name}</span>}
              
              {!collapsed && item.count && (
                <span style={{ 
                  marginLeft: 'auto',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '9999px'
                }}>
                  {item.count}
                </span>
              )}
              
              {collapsed && item.count && (
                <span style={{ 
                  position: 'absolute',
                  top: '-0.25rem',
                  right: '-0.25rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '0.675rem',
                  fontWeight: '500',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '9999px',
                  minWidth: '1rem',
                  textAlign: 'center'
                }}>
                  {item.count}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
      
      {/* Client Info */}
      {!collapsed && (
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '0.75rem', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{ 
            width: '2.5rem', 
            height: '2.5rem', 
            borderRadius: '0.375rem', 
            backgroundColor: '#dbeafe', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#1e40af',
            fontWeight: '600',
            fontSize: '1rem'
          }}>
            JS
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>Jessica Smith</p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Client</p>
          </div>
        </div>
      )}
      
      {/* User info at bottom */}
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '1rem', 
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <div style={{ 
          width: '2rem', 
          height: '2rem', 
          borderRadius: '9999px', 
          backgroundColor: '#3b82f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontWeight: '600',
          fontSize: '0.875rem'
        }}>
          YA
        </div>
        
        {!collapsed && (
          <div style={{ flex: '1' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#111827' }}>Your Account</p>
            <p style={{ fontSize: '0.675rem', color: '#6b7280' }}>Web Developer</p>
          </div>
        )}
        
        {!collapsed && (
          <button 
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280'
            }}
            onClick={() => alert('Logout clicked')}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
            </svg>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;