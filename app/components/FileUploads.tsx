'use client';

import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
}

// Sample file data
const filesData: FileItem[] = [
  {
    id: 'file1',
    name: 'logo-final.png',
    type: 'image/png',
    size: 1240000, // size in bytes
    uploadDate: '2025-03-10',
    uploadedBy: 'You'
  },
  {
    id: 'file2',
    name: 'seo-checklist.pdf',
    type: 'application/pdf',
    size: 458000,
    uploadDate: '2025-03-15',
    uploadedBy: 'You'
  },
  {
    id: 'file3',
    name: 'client-feedback.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 350000,
    uploadDate: '2025-03-22',
    uploadedBy: 'Jessica'
  },
  {
    id: 'file4',
    name: 'analytics-report.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 890000,
    uploadDate: '2025-04-01',
    uploadedBy: 'You'
  }
];

const FileUploads = () => {
  const [files, setFiles] = useState<FileItem[]>(filesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Filter files based on search query
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    let iconColor = 'rgba(59, 130, 246, 0.8)'; // default blue color
    let icon = (
      <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
        <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2Z"/>
      </svg>
    );
    
    if (fileType.startsWith('image/')) {
      iconColor = 'rgba(59, 130, 246, 0.8)'; // blue for images
      icon = (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.382 4.763 1.724-1.724a1 1 0 0 1 1.591.226l2.293 4.763a1 1 0 0 1 .017.948Z"/>
        </svg>
      );
    } else if (fileType === 'application/pdf') {
      iconColor = 'rgba(220, 38, 38, 0.8)'; // red for PDFs
      icon = (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4.5 11H4v1h.5a.5.5 0 0 0 0-1ZM7 5V4H2v12h12V9h4V5h-3V2H7v3Zm5.5 7H12v1h.5a.5.5 0 0 0 0-1Zm1.5 4H2V4h5v3h3v2h5v7h-1ZM8.5 11H8v3h.5a1.5 1.5 0 0 0 0-3Z"/>
        </svg>
      );
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('xlsx')) {
      iconColor = 'rgba(16, 185, 129, 0.8)'; // green for spreadsheets
      icon = (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .383a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
        </svg>
      );
    } else if (fileType.includes('word') || fileType.includes('document') || fileType.includes('docx')) {
      iconColor = 'rgba(37, 99, 235, 0.8)'; // darker blue for documents
      icon = (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10 8v5h1V8h-1Zm2 0v5h1V8h-1ZM5 14a1 1 0 0 1-.5-.134A1.494 1.494 0 0 1 3 12.5v-1A1.5 1.5 0 0 1 4.5 10h2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1.5ZM7 11H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H7v-2Z"/>
        </svg>
      );
    }
    
    return (
      <div style={{ 
        backgroundColor: iconColor.replace('0.8', '0.2'), 
        color: iconColor, 
        padding: '0.5rem', 
        borderRadius: '0.5rem', 
        marginRight: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
    );
  };

  // Handle file upload simulation
  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add a simulated new file
          const newFile: FileItem = {
            id: `file${files.length + 1}`,
            name: `new-upload-${Math.floor(Math.random() * 1000)}.pdf`,
            type: 'application/pdf',
            size: Math.floor(Math.random() * 1000000) + 100000,
            uploadDate: new Date().toISOString().split('T')[0],
            uploadedBy: 'You'
          };
          
          setFiles(prev => [newFile, ...prev]);
          setIsUploading(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500' }}>Files & Documents</h3>
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          style={{ 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            color: '#2563eb',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
          </svg>
          Upload File
        </button>
      </div>
      
      {/* Search bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', color: '#6b7280' }}>
            <svg style={{ width: '1rem', height: '1rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            style={{ 
              width: '100%', 
              padding: '0.625rem 0.75rem 0.625rem 2.25rem', 
              fontSize: '0.875rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem',
              backgroundColor: 'white' 
            }} 
            placeholder="Search files..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Upload progress indicator (shown when uploading) */}
      {isUploading && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploading...</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{uploadProgress}%</span>
          </div>
          <div style={{ height: '0.25rem', width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${uploadProgress}%`, 
                backgroundColor: '#3b82f6', 
                borderRadius: '9999px',
                transition: 'width 0.3s ease-in-out'
              }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Files list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredFiles.length > 0 ? (
          filteredFiles.map(file => (
            <div key={file.id} className="file-card">
              {getFileIcon(file.type)}
              <div style={{ flexGrow: 1 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{file.name}</p>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', gap: '0.75rem' }}>
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>Uploaded on {formatDate(file.uploadDate)}</span>
                  <span>•</span>
                  <span>By {file.uploadedBy}</span>
                </div>
              </div>
              <a 
                href="#" 
                style={{ 
                  fontSize: '0.875rem', 
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would trigger a download
                  alert(`Downloading ${file.name}`);
                }}
              >
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                  <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>
                Download
              </a>
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
            <p>No files found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploads;