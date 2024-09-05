import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import googleDocsIcon from '../assets/Google Docs Icon.svg';
import googleDriveIcon from '../assets/Google Drive Icon.svg';
import googleSheetsIcon from '../assets/Google Sheets Icon.svg';
import googleSlidesIcon from '../assets/Google Slide Icon.svg';

const GoogleSuiteLinks = () => {
    const { currentTheme } = useTheme();
    const [fadeIn, setFadeIn] = useState(Array(4).fill(false));

    useEffect(() => {
        const delays = [0, 0.25, 0.5, 0.75];
        delays.forEach((delay, index) => {
            setTimeout(() => {
                setFadeIn((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                });
            }, delay * 1000);
        });
    }, []);

    const apps = [
        { 
            name: 'Docs', 
            logo: googleDocsIcon, 
            url: 'https://doc.new' 
        },
        { 
            name: 'Sheets', 
            logo: googleSheetsIcon, 
            url: 'https://sheet.new' 
        },
        { 
            name: 'Slides', 
            logo: googleSlidesIcon, 
            url: 'https://slide.new' 
        },
        { 
            name: 'Drive', 
            logo: googleDriveIcon, 
            url: 'https://drive.google.com' 
        },
    ];

    return (
        <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} relative`}>
            {/* Gradient Overlay */}
            <div 
                className="absolute inset-0 rounded-lg"
                style={{
                    background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
                    zIndex: 0
                }}
            ></div>
            <div className="p-5 relative z-10">
                <div className="mb-4 text-center">
                    <h2 className={`text-xl font-bold ${currentTheme.text}`}>Document Creator</h2>
                    <p className={`text-sm ${currentTheme.text} opacity-80`}>Click to create a new document</p>
                </div>
                <div className="flex justify-around items-center">
                    {apps.map((app, index) => (
                        <a
                            key={app.name}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${currentTheme.main} ${fadeIn[index] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 px-3 py-1 rounded-md flex flex-col items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out`}
                            style={{ transition: 'opacity 1s ease-in-out, box-shadow 0.5s, transform 0.5s' }}
                        >
                            <img 
                                src={app.logo} 
                                alt={`${app.name} logo`} 
                                className="h-6 w-8 mb-1 object-contain transform transition-transform duration-500 ease-in-out"
                                style={{ transition: 'transform 0.5s, filter 0.5s' }}
                            />
                            <span className={`${currentTheme.text} font-semibold text-[0.6rem]`}>{app.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoogleSuiteLinks;
