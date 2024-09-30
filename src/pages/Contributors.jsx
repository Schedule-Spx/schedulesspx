import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Contributors = () => {
    const { currentTheme } = useTheme(); 

    return (
        <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-4`} style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
            <div className="max-w-4xl mx-auto pb-16">
                <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
                    <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-md">
                        Contributors to ScheduleSPX
                    </h1>
                    <p className="text-lg leading-relaxed">
                        <strong>Kagen:</strong> Kagen was one of the two co-founders of ScheduleSPX. {' '}
                        <a 
                            href="https://kdog4u.com" 
                            className={`underline accent}`}  
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            More about Kagen...
                        </a>
                        <br />
                        <strong>David:</strong> David was one of the two co-founders of ScheduleSPX. {' '}
                        <a 
                            href="https://camick.org" 
                            className={`underline accent}`}  
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            More about David...
                        </a>
                        <br />

                        <strong>Russell:</strong> Russell joined shortly after Kagen & David and is currently a contributor. {' '}
                        <a 
                            href="https://russellwpage.com" 
                            className={`underline accent}`}  
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            More about Russell...
                        </a>
                        <br />
                        <strong>Eli:</strong> Eli joined the development team at the same time as Russell and is a contributor currently. {' '}
                        <a 
                            href="" 
                            className={`underline accent}`}  
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            More about Eli...
                        </a>

                    </p>
                </div>

                <div className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6`}>
                    <h2 className="text-xl font-bold mb-4 text-center">About the Project</h2>
                    <p className="text-lg leading-relaxed">
                        ScheduleSPX is the better way to view school-wide scheduling, created for and by students.
                        <Link 
                            to="/about"  
                            className={`underline accent}`}  
                        >
                            <br/> More about the project...
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contributors;
