import React from 'react';
import { useTheme } from './ThemeContext';

const Announcement = () => {
    const { currentTheme } = useTheme();

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
                <div className="text-center">
                    <h2 className={`text-xl font-bold ${currentTheme.text}`}>Welcome to ScheduleSPX 2.0!</h2>
                    <p className={`text-sm ${currentTheme.text} opacity-80`}>
                        We're so happy you're here! Enjoy all the new features!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
