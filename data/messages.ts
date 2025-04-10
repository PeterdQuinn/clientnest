export interface Message {
    id: string;
    content: string;
    sender: 'client' | 'dev';
    senderName: string;
    timestamp: string;
    read: boolean;
  }
  
  export const messages: Message[] = [
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
  
  // Message templates for quick replies
  export const messageTemplates = [
    {
      id: 'template1',
      label: 'Thank you',
      content: "Thanks for your feedback! I'll implement those changes right away."
    },
    {
      id: 'template2',
      label: 'Design updated',
      content: "I've updated the design based on your feedback. Let me know what you think!"
    },
    {
      id: 'template3',
      label: 'Schedule call',
      content: "When would be a good time to schedule our next call?"
    },
    {
      id: 'template4',
      label: 'Confirm receipt',
      content: "I've received your files. I'll review them and get back to you soon."
    },
    {
      id: 'template5',
      label: 'Status update',
      content: "Just wanted to give you a quick update - the project is on track and we're making good progress."
    }
  ];
  
  // Helper function to format a message timestamp for display
  export const formatMessageTimestamp = (timestamp: string): string => {
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
  
  // Group messages by date for UI display
  export const groupMessagesByDate = (messages: Message[]) => {
    const grouped: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    
    return grouped;
  };