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
        <div className={`${currentTheme.main} rounded-lg shadow-lg w-full border-2 ${currentTheme.border} flex flex-col items-center relative`}>
            {/* Gradient Overlay */}
            <div 
                className="absolute inset-0 rounded-lg"
                style={{
                    background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
                    zIndex: 0
                }}
            ></div>
            <div className="flex flex-col items-center p-5 relative z-10">
                <h2 className={`text-xl font-bold ${currentTheme.text} text-center`}>Document Creator</h2>
                <p className={`text-sm ${currentTheme.text} opacity-80 text-center`}>Click to create a new document</p>
            </div>
            <div className="flex justify-center w-full px-5 mb-4 relative z-10">
                <div className="grid grid-cols-4 gap-4">
                    {apps.map((app) => (
                        <a
                            key={app.name}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${currentTheme.main} hover:opacity-80 transition-opacity duration-200 px-3 py-1 rounded-md flex flex-col items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 hover:brightness-125 transition-transform duration-200`}
                            style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
                        >
                            <img 
                                src={app.logo} 
                                alt={`${app.name} logo`} 
                                className="h-6 w-8 mb-1 object-contain"
                            />
                            <span 
                                className={`${currentTheme.text} font-semibold text-[0.6rem]`}
                            >
                                {app.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoogleSuiteLinks;
