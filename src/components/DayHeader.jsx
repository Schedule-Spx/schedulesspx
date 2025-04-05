import React, { useEffect, useState, useMemo, memo, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';
import PopupMessage from './PopupMessage';
import ReactMarkdown from 'react-markdown';

// Constants
const UPDATE_INTERVAL = 1000; // 1 second
const MAX_ANNOUNCEMENT_LENGTH = 100;

// Main component
const DayHeader = memo(({ onAnnouncementClick }) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showFullAnnouncement, setShowFullAnnouncement] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  
  // Add ref for text container
  const textContainerRef = useRef(null);
  const [textTruncated, setTextTruncated] = useState(false);

  // Fetch latest announcement from the API
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://schedule-api.devs4u.workers.dev/api/popup', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Only show active announcements
          if (data.isActive) {
            setAnnouncement(data);
          } else {
            setAnnouncement(null);
          }
        } else {
          console.error("Failed to fetch announcement:", await response.text());
        }
      } catch (error) {
        console.error('Error fetching announcement:', error);
      }
    };

    fetchAnnouncement();
    const interval = setInterval(fetchAnnouncement, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, UPDATE_INTERVAL);
    
    return () => clearInterval(timer);
  }, []);

  // Check if text needs truncation
  useEffect(() => {
    if (!textContainerRef.current || !announcement) return;

    const checkTruncation = () => {
      const element = textContainerRef.current;
      setTextTruncated(element.scrollHeight > element.clientHeight);
    };

    checkTruncation();
    
    // Add resize observer to check when container size changes
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(textContainerRef.current);

    return () => resizeObserver.disconnect();
  }, [announcement]);

  // Format date and time
  const dateTimeInfo = useMemo(() => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return {
      date: currentDateTime.toLocaleDateString('en-US', options),
      time: currentDateTime.toLocaleTimeString('en-US')
    };
  }, [currentDateTime]);

  // Get user's first name
  const firstName = useMemo(() => {
    return user?.name?.split(' ')[0] || 'Guest';
  }, [user]);

  // Function to handle opening the popup
  const handleAnnouncementClick = () => {
    if (announcement) {
      onAnnouncementClick(announcement);
    }
  };

  // Styles for markdown content
  const markdownStyles = {
    h1: `text-2xl font-bold ${currentTheme.text} mb-4`,
    h2: `text-xl font-bold ${currentTheme.text} mb-3`,
    h3: `text-lg font-bold ${currentTheme.text} mb-2`,
    p: `${currentTheme.text} mb-4`,
    a: `${currentTheme.text} underline hover:opacity-80`,
    ul: `list-disc list-inside mb-4 ${currentTheme.text}`,
    ol: `list-decimal list-inside mb-4 ${currentTheme.text}`,
    li: 'mb-1',
    blockquote: `border-l-4 ${currentTheme.border} pl-4 italic my-4`,
    code: `font-mono bg-black bg-opacity-20 rounded px-1`,
  };

  return (
    <div className="w-full h-full">
      <div className={`${currentTheme.main} w-full h-full flex flex-col relative rounded-lg overflow-hidden`}>
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
            zIndex: 0,
          }}
        />
        <div className="p-4 flex flex-col h-full relative z-10">
          {/* Content container with fade transition */}
          <div className="relative flex-grow">
            {/* Normal View */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${
                showFullContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {/* Centered Welcome and DateTime */}
              <div className="text-center mb-6">
                <h1 className={`text-3xl font-bold ${currentTheme.text} mb-2`}>
                  Welcome, {firstName}!
                </h1>
                <p className={`${currentTheme.text} opacity-75 text-lg`}>
                  {dateTimeInfo.date}, {dateTimeInfo.time}
                </p>
              </div>

              {/* Divider */}
              <div className={`border-t ${currentTheme.border} border-opacity-20 my-4`} />

              {/* Announcement Preview */}
              <div className="flex-grow flex flex-col items-center justify-center">
                {announcement ? (
                  <div className="text-center">
                    <h2 className={`text-xl font-bold ${currentTheme.text} mb-1`}>
                      {announcement.title}
                    </h2>
                    <p className={`${currentTheme.text} opacity-75 text-sm mb-4`}>
                      Posted by {announcement.author}
                    </p>
                    <button
                      onClick={() => setShowFullContent(true)}
                      className={`${currentTheme.accent} px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      View Full Announcement
                    </button>
                  </div>
                ) : (
                  <div className={`${currentTheme.text} text-center opacity-75`}>
                    No announcements at this time
                  </div>
                )}
              </div>
            </div>

            {/* Full Announcement View */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${
                showFullContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {announcement && (
                <div className="h-full flex flex-col">
                  {/* Back button */}
                  <button
                    onClick={() => setShowFullContent(false)}
                    className={`${currentTheme.text} opacity-75 hover:opacity-100 flex items-center gap-2 mb-4 transition-opacity`}
                  >
                    <FaArrowLeft /> Back
                  </button>

                  {/* Announcement content with hidden scrollbar */}
                  <div className="flex-grow overflow-y-auto scrollbar-hide">
                    <h2 className={`text-2xl font-bold ${currentTheme.text} mb-4`}>
                      {announcement.title}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className={markdownStyles.h1} {...props} />,
                          h2: ({node, ...props}) => <h2 className={markdownStyles.h2} {...props} />,
                          h3: ({node, ...props}) => <h3 className={markdownStyles.h3} {...props} />,
                          p: ({node, ...props}) => <p className={markdownStyles.p} {...props} />,
                          a: ({node, ...props}) => <a className={markdownStyles.a} target="_blank" rel="noopener noreferrer" {...props} />,
                          ul: ({node, ...props}) => <ul className={markdownStyles.ul} {...props} />,
                          ol: ({node, ...props}) => <ol className={markdownStyles.ol} {...props} />,
                          li: ({node, ...props}) => <li className={markdownStyles.li} {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className={markdownStyles.blockquote} {...props} />,
                          code: ({node, ...props}) => <code className={markdownStyles.code} {...props} />,
                        }}
                      >
                        {announcement.message}
                      </ReactMarkdown>
                    </div>
                    <p className={`${currentTheme.text} opacity-75 text-sm mt-4`}>
                      - {announcement.author}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DayHeader;
