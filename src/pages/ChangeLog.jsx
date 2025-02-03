import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ChangeLog = () => {
  const { currentTheme } = useTheme();

  const changeLogData = [
    {
      date: '2023-08-01',
      description: 'Initial release of Schedule-SPX',
      affectedComponents: ['LandingPage', 'MainDashboard'],
      author: 'Kagen Jensen',
      version: '1.0.0',
      links: [
        { text: 'Pull Request #1', url: 'https://github.com/KdogDevs/schedulesspx/pull/1' },
        { text: 'Issue #1', url: 'https://github.com/KdogDevs/schedulesspx/issues/1' }
      ]
    },
    {
      date: '2023-08-15',
      description: 'Added new themes and improved performance',
      affectedComponents: ['ThemeContext', 'NavBar'],
      author: 'David Camick',
      version: '1.1.0',
      links: [
        { text: 'Pull Request #2', url: 'https://github.com/KdogDevs/schedulesspx/pull/2' },
        { text: 'Issue #2', url: 'https://github.com/KdogDevs/schedulesspx/issues/2' }
      ]
    },
    // Add more change log entries as needed
  ];

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text} p-4`}>
      <div className="max-w-4xl mx-auto pb-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Log</h1>
        {changeLogData.map((entry, index) => (
          <div key={index} className={`${currentTheme.main} border ${currentTheme.border} rounded-lg shadow-lg p-6 mb-8`}>
            <h2 className="text-xl font-semibold mb-2">{entry.date}</h2>
            <p className="mb-2"><strong>Description:</strong> {entry.description}</p>
            <p className="mb-2"><strong>Affected Components/Files:</strong> {entry.affectedComponents.join(', ')}</p>
            <p className="mb-2"><strong>Author:</strong> {entry.author}</p>
            <p className="mb-2"><strong>Version:</strong> {entry.version}</p>
            <div className="mb-2">
              <strong>Links:</strong>
              <ul className="list-disc list-inside">
                {entry.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeLog;
