import React, { useEffect, useState, memo, useMemo, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaTimes, FaPlus, FaEdit } from 'react-icons/fa';
import Cookies from 'js-cookie';

// Memoized Link component
const QuickLink = memo(({ href, children, fadeIn }) => {
  const { currentTheme } = useTheme();
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${fadeIn ? 'opacity-100' : 'opacity-0'} 
        w-full transition-opacity duration-500 bg-opacity-100 
        ${currentTheme.main} ${currentTheme.text} 
        brightness-125 font-semibold py-2 px-4 rounded 
        text-center block transform hover:scale-105 
        transition-transform duration-300 no-underline
        whitespace-nowrap overflow-hidden text-ellipsis min-h-[2.5rem]
        flex items-center justify-center`}
      style={{ 
        transition: 'opacity 0.5s ease-in-out, box-shadow 0.3s, transform 0.3s',
        fontSize: 'clamp(0.75rem, 3vw, 1rem)' // Responsive font size
      }}
    >
      {children}
    </a>
  );
});

// Memoized gradient overlay
const GradientOverlay = memo(() => (
  <div 
    className="absolute inset-0 rounded-lg"
    style={{
      background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
      zIndex: 0
    }}
  />
));

// Main component
const QuickLinks = memo(({ editMode }) => {
  const { currentTheme } = useTheme();
  const [visibleLinks, setVisibleLinks] = useState([]);
  const [userLinks, setUserLinks] = useState(() => {
    const saved = Cookies.get('quickLinks');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Canvas', url: 'https://stpius.instructure.com/' },
      { id: 2, name: 'PowerSchool', url: 'https://powerschool.spx.org/public/' },
      { id: 3, name: 'x2VOL', url: 'https://x2vol.com/' },
      { id: 4, name: 'SPX Website', url: 'https://www.spx.org/' },
      { id: 5, name: 'Sage Dining', url: 'https://www.sagedining.com/sites/stpiusxcatholichighschool/menu' }
    ];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  // Save links to cookies whenever they change
  useEffect(() => {
    Cookies.set('quickLinks', JSON.stringify(userLinks), { expires: 365 });
  }, [userLinks]);
  
  // Staggered fade-in animation
  useEffect(() => {
    const timeouts = [];
    userLinks.forEach((link, index) => {
      const timeout = setTimeout(() => {
        setVisibleLinks(prev => [...prev, link.id]);
      }, index * 100);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [userLinks]);

  const handleAddLink = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLink = {
      id: Math.max(0, ...userLinks.map(l => l.id)) + 1,
      name: formData.get('name'),
      url: formData.get('url')
    };
    setUserLinks(prev => [...prev, newLink]);
    setShowAddForm(false);
  };

  const handleEditLink = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setUserLinks(prev => prev.map(link => 
      link.id === editingLink.id 
        ? { ...link, name: formData.get('name'), url: formData.get('url') }
        : link
    ));
    setEditingLink(null);
  };

  const handleRemoveLink = (id) => {
    setUserLinks(prev => prev.filter(link => link.id !== id));
  };

  return (
    <div className="w-full h-full">
      <div className={`${currentTheme.main} w-full h-full flex flex-col relative rounded-lg overflow-hidden`}>
        <div className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
            zIndex: 0,
          }}
        />
        <div className="p-2 relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className={`text-lg font-bold ${currentTheme.text} truncate`}>Quick Links</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className={`${currentTheme.accent} p-1 rounded-full hover:opacity-80 transition-opacity`}
            >
              <FaPlus size={16} />
            </button>
          </div>
          
          <div className="space-y-1 flex-grow flex flex-col overflow-y-auto scrollbar-hide">
            {userLinks.map(link => (
              <div key={link.id} className="flex items-stretch gap-1 min-h-0 w-full">
                <div className="flex-grow">
                  <QuickLink
                    href={link.url}
                    fadeIn={visibleLinks.includes(link.id)}
                  >
                    {link.name}
                  </QuickLink>
                </div>
                <div className="flex gap-1 shrink-0 w-[80px]">
                  <button
                    onClick={() => setEditingLink(link)}
                    className={`${currentTheme.accent} p-1 rounded hover:opacity-80 transition-opacity flex-1 flex justify-center`}
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className={`${currentTheme.accent} p-1 rounded hover:opacity-80 transition-opacity flex-1 flex justify-center`}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Link Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={`${currentTheme.main} rounded-lg p-4 w-80`}>
            <h3 className={`${currentTheme.text} text-lg font-bold mb-4`}>Add Quick Link</h3>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Link Name"
                  className={`w-full p-2 rounded ${currentTheme.accent}`}
                  required
                />
              </div>
              <div>
                <input
                  type="url"
                  name="url"
                  placeholder="URL (https://...)"
                  className={`w-full p-2 rounded ${currentTheme.accent}`}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className={`${currentTheme.accent} px-4 py-2 rounded`}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className={`${currentTheme.accent} px-4 py-2 rounded`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Link Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={`${currentTheme.main} rounded-lg p-4 w-80`}>
            <h3 className={`${currentTheme.text} text-lg font-bold mb-4`}>Edit Quick Link</h3>
            <form onSubmit={handleEditLink} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingLink.name}
                  className={`w-full p-2 rounded ${currentTheme.accent}`}
                  required
                />
              </div>
              <div>
                <input
                  type="url"
                  name="url"
                  defaultValue={editingLink.url}
                  className={`w-full p-2 rounded ${currentTheme.accent}`}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className={`${currentTheme.accent} px-4 py-2 rounded`}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className={`${currentTheme.accent} px-4 py-2 rounded`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

export default QuickLinks;
