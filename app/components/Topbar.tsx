'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'update' | 'alert' | 'task';
}

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'New Message',
      message: 'Jessica sent you a new message about the website redesign.',
      time: '10 min ago',
      read: false,
      type: 'message'
    },
    {
      id: 'n2',
      title: 'Task Completed',
      message: 'Homepage mockup has been marked as complete.',
      time: '1 hour ago',
      read: false,
      type: 'task'
    },
    {
      id: 'n3',
      title: 'Project Update',
      message: 'SEO Optimization project is now 100% complete.',
      time: '2 days ago',
      read: true,
      type: 'update'
    }
  ]);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      setCurrentTime(now.toLocaleDateString('en-US', options));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'message':
        return (
          <div style={{ 
            backgroundColor: '#dbeafe', 
            color: '#1e40af', 
            borderRadius: '9999px', 
            width: '2rem', 
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 4H16v9c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1v-1H5v1c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3V7h1c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1Z"/>
              <path d="M4 3h9c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1Zm9 9V4H4v8h9Z"/>
            </svg>
          </div>
        );
      case 'task':
        return (
          <div style={{ 
            backgroundColor: '#d1fae5', 
            color: '#065f46', 
            borderRadius: '9999px', 
            width: '2rem', 
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </div>
        );
      case 'update':
        return (
          <div style={{ 
            backgroundColor: '#fef3c7', 
            color: '#92400e', 
            borderRadius: '9999px', 
            width: '2rem', 
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
            </svg>
          </div>
        );
      case 'alert':
        return (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#b91c1c', 
            borderRadius: '9999px', 
            width: '2rem', 
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would also update the theme in localStorage or a context
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0.75rem 1.5rem', 
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: 'white'
    }}>
      {/* Left side: Welcome message */}
      <div>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '500' }}>
          Hey Jessica 👋
        </h2>
        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          {currentTime}
        </p>
      </div>
      
      {/* Right side: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>
            <svg style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            placeholder="Search..." 
            style={{ 
              backgroundColor: '#f3f4f6', 
              borderRadius: '0.375rem', 
              border: 'none', 
              padding: '0.5rem 0.5rem 0.5rem 2rem',
              fontSize: '0.875rem',
              width: '12rem'
            }} 
          />
        </div>
        
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          style={{ 
            backgroundColor: 'transparent', 
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}
        >
          {darkMode ? (
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-14a.72.72 0 0 1 .72.72v1.09a.72.72 0 0 1-1.44 0V1.72A.72.72 0 0 1 10 1Zm0 16a.72.72 0 0 1-.72-.72v-1.09a.72.72 0 0 1 1.44 0v1.09a.72.72 0 0 1-.72.72Zm7-7a.72.72 0 0 1-.72.72h-1.09a.72.72 0 0 1 0-1.44h1.09A.72.72 0 0 1 17 10Zm-12.91.72a.72.72 0 0 1 0-1.44h1.09a.72.72 0 0 1 0 1.44H4.09ZM14.9 5.1a.72.72 0 0 1-1.02 0l-.77-.77a.72.72 0 0 1 1.02-1.02l.77.78a.72.72 0 0 1 0 1.01Zm-8.02 8.02a.72.72 0 0 1-1.02 0l-.77-.77a.72.72 0 0 1 1.02-1.02l.77.78a.72.72 0 0 1 0 1.01ZM14.9 14.9a.72.72 0 0 1 0 1.02l-.77.77a.72.72 0 1 1-1.02-1.02l.78-.77a.72.72 0 0 1 1.01 0ZM6.88 6.88a.72.72 0 0 1 0 1.02l-.77.77a.72.72 0 1 1-1.02-1.02l.78-.77a.72.72 0 0 1 1.01 0Z"/>
            </svg>
          ) : (
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.5 6a7.488 7.488 0 0 1 6.44-7.25 1 1 0 0 0 .859-.5A1 1 0 0 0 17.333.041 10.909 10.909 0 0 0 10.5 2.5 10.5 10.5 0 0 0 10.5 17.5a10.91 10.91 0 0 0 6.833 2.459A1 1 0 0 0 18.3 18.8a1 1 0 0 0-.5-.859 7.489 7.489 0 0 1-4.44-5.952 7.488 7.488 0 0 1 4.44-7.74Z"/>
            </svg>
          )}
        </button>
        
        {/* Notifications */}
        <div style={{ position: 'relative' }} ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ 
              position: 'relative',
              backgroundColor: 'transparent', 
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280'
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>
            </svg>
            
            {unreadCount > 0 && (
              <span style={{ 
                position: 'absolute',
                top: '0.125rem',
                right: '0.125rem',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '0.675rem',
                fontWeight: '500',
                padding: '0.125rem 0.25rem',
                borderRadius: '9999px',
                minWidth: '1rem',
                textAlign: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div style={{ 
              position: 'absolute', 
              top: 'calc(100% + 0.5rem)', 
              right: '-1rem', 
              backgroundColor: 'white', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
              borderRadius: '0.5rem', 
              width: '20rem', 
              zIndex: 10,
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '0.75rem 1rem', 
                borderBottom: '1px solid #e5e7eb' 
              }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600' }}>Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    style={{ 
                      backgroundColor: 'transparent', 
                      border: 'none',
                      fontSize: '0.75rem',
                      color: '#2563eb',
                      cursor: 'pointer'
                    }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              
              <div style={{ maxHeight: '24rem', overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      style={{ 
                        padding: '0.75rem 1rem', 
                        borderBottom: '1px solid #e5e7eb',
                        backgroundColor: notification.read ? 'white' : '#f3f4f6',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out'
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {getNotificationIcon(notification.type)}
                        <div style={{ flex: '1' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>{notification.title}</h4>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{notification.time}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              
              <div style={{ padding: '0.75rem 1rem', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                <Link 
                  href="/notifications"
                  style={{ 
                    fontSize: '0.75rem',
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile menu */}
        <div style={{ position: 'relative' }} ref={profileMenuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <img 
              style={{ width: '2rem', height: '2rem', borderRadius: '9999px' }} 
              src="https://ui-avatars.com/api/?name=Your+Name&background=3b82f6&color=fff" 
              alt="Your profile" 
            />
          </button>
          
          {/* Profile dropdown */}
          {showProfileMenu && (
            <div style={{ 
              position: 'absolute', 
              top: 'calc(100% + 0.5rem)', 
              right: 0, 
              backgroundColor: 'white', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
              borderRadius: '0.5rem', 
              width: '12rem', 
              zIndex: 10,
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                padding: '0.5rem 0' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  padding: '0.5rem 1rem',
                  borderBottom: '1px solid #e5e7eb',
                  marginBottom: '0.5rem'
                }}>
                  <img 
                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px' }} 
                    src="https://ui-avatars.com/api/?name=Your+Name&background=3b82f6&color=fff" 
                    alt="Your profile" 
                  />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Your Name</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Web Developer</p>
                  </div>
                </div>
                
                <Link 
                  href="/profile"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    color: '#374151',
                    textDecoration: 'none'
                  }}
                  onClick={() => setShowProfileMenu(false)}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                  Your Profile
                </Link>
                
                <Link 
                  href="/settings"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    color: '#374151',
                    textDecoration: 'none'
                  }}
                  onClick={() => setShowProfileMenu(false)}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 7.5h-1V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.5H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM5 3h10v4.5H5V3Zm13 14.5H2v-5h1.5v.5A1.5 1.5 0 0 0 5 14.5h4.5a1.5 1.5 0 0 0 1.5-1.5V13h3v.5a1.5 1.5 0 0 0 1.5 1.5H20v5Z"/>
                  </svg>
                  Settings
                </Link>
                
                <div style={{ 
                  height: '1px', 
                  backgroundColor: '#e5e7eb', 
                  margin: '0.5rem 0' 
                }}></div>
                
                <button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    color: '#ef4444',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onClick={() => {
                    setShowProfileMenu(false);
                    // In a real app, this would log the user out
                    alert('Logout clicked');
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;