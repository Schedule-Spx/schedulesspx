import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const Announcement = () => {
    const { currentTheme } = useTheme();
    const [announcementText, setAnnouncementText] = useState({
        title: 'Welcome to ScheduleSPX 2.0!',
        message: 'We\'re so happy you\'re here! Enjoy all the new features!'
    });

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await fetch('https://your-worker-url.workers.dev/api/announcement');
                if (response.ok) {
                    const data = await response.json();
                    setAnnouncementText(data);
                }
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncement();
    }, []);

    return (
        <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative`}>
            <div 
                className="absolute inset-0 rounded-lg"
                style={{
                    background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
                    zIndex: 0
                }}
            ></div>
            <div className="p-5 relative z-10">
                <div className="text-center">
                    <h2 className={`text-xl font-bold ${currentTheme.text}`}>{announcementText.title}</h2>
                    <p className={`text-sm ${currentTheme.text} opacity-80`}>
                        {announcementText.message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
