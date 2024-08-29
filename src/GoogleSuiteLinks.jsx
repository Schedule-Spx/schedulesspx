import React from 'react';
import { useTheme } from './ThemeContext';
import googleDocsIcon from './assets/Google Docs Icon.svg';
import googleDriveIcon from './assets/Google Drive Icon.svg';
import googleSheetsIcon from './assets/Google Sheets Icon.svg';
import googleSlidesIcon from './assets/Google Slide Icon.svg';

const GoogleSuiteLinks = () => {
    const { currentTheme } = useTheme();

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
        <div className={`flex flex-col h-full ${currentTheme.accent} p-2 rounded-lg shadow-md`}>
            <div className="text-left mb-2">
                <h1 className={`text-sm font-medium ${currentTheme.text}`}>Document Creator</h1>
                <h2 className={`text-xs ${currentTheme.primary}`}>Click to create a new document</h2>
            </div>
            <div className="flex justify-between items-center flex-grow">
                {apps.map((app) => (
                    <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${currentTheme.main} hover:opacity-80 transition-opacity duration-200 p-1 rounded-md flex flex-col items-center justify-center`}
                    >
                        <img src={app.logo} alt={`${app.name} logo`} className="h-6 w-6 mb-1" />
                        <span className={`${currentTheme.text} font-semibold text-[0.6rem]`}>{app.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default GoogleSuiteLinks;
