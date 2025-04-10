'use client';

import { useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'client' | 'dev';
  senderName: string;
  timestamp: string;
  read: boolean;
}

// Sample message data
const messagesData: Message[] = [
  {
    id: 'm1',
    content: "Hi there! I've reviewed the initial wireframes and they look great. Can we schedule a call to discuss a few tweaks?",
    sender: 'client',
    senderName: 'Jessica',
    timestamp: '2025-04-07T10:23:00',
    read: true
  },
  {
    id: 'm2',
    content: "Absolutely! I'm available tomorrow between 10am and 2pm. Let me know what time works best for you.",
    sender: 'dev',
    senderName: 'You',
    timestamp: '2025-04-07T10:45:00',
    read: true
  },
  {
    id: 'm3',
    content: "Let's do 11am. Also, could you provide some examples of the color palette you're considering?",
    sender: 'client',
    senderName: 'Jessica',
    timestamp: '2025-04-07T11:02:00',
    read: true
  },
  {
    id: 'm4',
    content: "Hi Jessica, I've finished the homepage mockup. Can you take a look when you have a chance?",
    sender: 'dev',
    senderName: 'You',
    timestamp: '2025-04-08T14:30:00',
    read: true
  },
  {
    id: 'm5',
    content: "I love it! The design looks fantastic. Quick question - could we make the logo a bit larger?",
    sender: 'client',
    senderName: 'Jessica',
    timestamp: '2025-04-08T15:45:00',
    read: true
  },
  {
    id: 'm6',
    content: "Absolutely! I'll adjust that and send you an updated version by EOD today.",
    sender: 'dev',
    senderName: 'You',
    timestamp: '2025-04-08T16:05:00',
    read: true
  }
];

const MessageLog = () => {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [newMessage, setNewMessage] = useState('');
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    
    // Yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    
    // Older
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      content: newMessage,
      sender: 'dev',
      senderName: 'You',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate a response from the client after 3 seconds
    setTimeout(() => {
      const clientResponse: Message = {
        id: `m${messages.length + 2}`,
        content: "Thanks for the update! I'll take a look at it right away.",
        sender: 'client',
        senderName: 'Jessica',
        timestamp: new Date().toISOString(),
        read: false
      };
      
      setMessages(prev => [...prev, clientResponse]);
    }, 3000);
  };
  
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Messages</h3>
        <span style={{ 
          fontSize: '0.75rem', 
          padding: '0.25rem 0.5rem', 
          backgroundColor: 'rgba(59, 130, 246, 0.1)', 
          color: '#2563eb',
          borderRadius: '9999px',
          fontWeight: '500'
        }}>
          {messages.length} messages
        </span>
      </div>
      
      {/* Messages container with scrolling */}
      <div style={{ 
        height: '350px', 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column',
        scrollBehavior: 'smooth',
        padding: '0.5rem',
        marginBottom: '1rem'
      }}>
        {/* Date separator */}
        <div style={{ 
          textAlign: 'center', 
          margin: '0.75rem 0', 
          position: 'relative',
          zIndex: 1
        }}>
          <span style={{ 
            fontSize: '0.75rem', 
            backgroundColor: '#f3f4f6', 
            color: '#6b7280',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px'
          }}>
            April 7, 2025
          </span>
        </div>
        
        {messages.map((message, index) => {
          // Check if we need to add a date separator
          let dateSeparator = null;
          if (index > 0) {
            const currentDate = new Date(message.timestamp).toDateString();
            const prevDate = new Date(messages[index - 1].timestamp).toDateString();
            
            if (currentDate !== prevDate) {
              const formattedDate = new Date(message.timestamp).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              });
              
              dateSeparator = (
                <div key={`sep-${message.id}`} style={{ 
                  textAlign: 'center', 
                  margin: '0.75rem 0', 
                  position: 'relative',
                  zIndex: 1
                }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    backgroundColor: '#f3f4f6', 
                    color: '#6b7280',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px'
                  }}>
                    {formattedDate}
                  </span>
                </div>
              );
            }
          }
          
          return (
            <>
              {dateSeparator}
              <div 
                key={message.id}
                className={`message-card ${message.sender === 'client' ? 'message-client' : 'message-dev'}`}
                style={{ 
                  alignSelf: message.sender === 'client' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: message.sender === 'client' ? 'rgba(30, 64, 175, 0.7)' : 'rgba(31, 41, 55, 0.7)',
                  marginBottom: '0.25rem'
                }}>
                  {message.senderName} - {formatTimestamp(message.timestamp)}
                </div>
                <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </p>
              </div>
            </>
          );
        })}
      </div>
      
      {/* Message input */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{ 
            flex: '1', 
            borderRadius: '0.375rem 0 0 0.375rem', 
            border: '1px solid #d1d5db', 
            padding: '0.625rem', 
            fontSize: '0.875rem',
            outline: 'none',
            borderRight: 'none'
          }}
        />
        <button 
          onClick={handleSendMessage}
          style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            borderRadius: '0 0.375rem 0.375rem 0', 
            padding: '0 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.328 9.5 9 4v11L3 12.5v-7L9 3m9.328 6.5L15 12"/>
          </svg>
          Send
        </button>
      </div>
      
      {/* Quick reply buttons */}
      <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button 
          onClick={() => setNewMessage("Thanks for your feedback! I'll implement those changes right away.")}
          style={{ 
            backgroundColor: '#f3f4f6', 
            color: '#4b5563', 
            borderRadius: '9999px', 
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Thank you
        </button>
        <button 
          onClick={() => setNewMessage("I've updated the design based on your feedback. Let me know what you think!")}
          style={{ 
            backgroundColor: '#f3f4f6', 
            color: '#4b5563', 
            borderRadius: '9999px', 
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Design updated
        </button>
        <button 
          onClick={() => setNewMessage("When would be a good time to schedule our next call?")}
          style={{ 
            backgroundColor: '#f3f4f6', 
            color: '#4b5563', 
            borderRadius: '9999px', 
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Schedule call
        </button>
      </div>
    </div>
  );
};

export default MessageLog;