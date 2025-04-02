import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Faculty ban emails (keep in sync with AuthContext)
const FACULTY_BAN_EMAILS = new Set([
  'kagenmjensen@me.com'
]);

// Faculty emails that are exempt from the ban (keep in sync with AuthContext)
const FACULTY_EXEMPT_EMAILS = new Set([
  'lfarrell@spx.org',
  'mlawson@spx.org'
]);

const FacultyBanPage = () => {
    const { user, isLoggedIn, getBanStatus } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if an email should go to faculty ban page
    const isFacultyBanned = (email) => {
        if (!email) return false;
        const lowerEmail = email.toLowerCase();
        
        // Check exempt emails
        if (FACULTY_EXEMPT_EMAILS.has(lowerEmail)) {
            return false;
        }
        
        return lowerEmail.endsWith('@spx.org') || FACULTY_BAN_EMAILS.has(lowerEmail);
    };
    
    // Prevent navigation away from this page if user is banned faculty
    useEffect(() => {
        if (!isLoggedIn() || !user) {
            return;
        }
        
        const { isBanned, type } = getBanStatus();
        
        // If user is banned but not as faculty, redirect to regular ban page
        if (isBanned && type !== 'faculty') {
            navigate('/banned', { replace: true });
            return;
        }
        
        // If user is not banned but on this page, redirect to home
        if (!isBanned && location.pathname === '/facultyban') {
            navigate('/', { replace: true });
        }
    }, [user, isLoggedIn, navigate, location.pathname, getBanStatus]);
    
    // Block navigation attempts with history listener
    useEffect(() => {
        const { isBanned, type } = getBanStatus();
        
        if (!isBanned || type !== 'faculty') return;
        
        // Block navigation attempts via browser back/forward buttons
        const unblock = navigate((nextLocation) => {
            // Only allow navigation to facultyban page
            if (nextLocation.pathname !== '/facultyban') {
                return false;
            }
            return true;
        });
        
        return () => {
            if (unblock) unblock();
        };
    }, [navigate, getBanStatus]);

    if (!isLoggedIn() || !user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl">Access Denied</h1>
                <p className="text-xl mt-4">Please log in to access this page.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 border-t-8 border-red-600">
                <h1 className="text-4xl font-bold text-red-700 mb-6">Faculty Access Restricted</h1>
                
                <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-bold">Notice to Faculty Members</p>
                </div>
                
                <p className="text-lg mb-4">
                    Due to administrative decisions, faculty access to ScheduleSPX has been temporarily restricted.
                </p>
                
                <p className="text-lg mb-4">
                    We've implemented this restriction to ensure all platform changes are properly vetted before
                    wider faculty access is granted. This helps us maintain the integrity and security of the service.
                </p>
                
                <p className="text-lg mb-4">
                    <strong>Email:</strong> {user.email}
                </p>
                
                <div className="mt-8 p-4 bg-yellow-50 border rounded">
                    <p className="font-semibold text-gray-700">
                        If you believe this is an error or have questions, please contact 
                        Ms. Farrell or Mr. Lawson as they have access to the system.
                    </p>
                </div>
                
                <p className="mt-8 text-sm text-gray-500">
                    This restriction is enforced by the system and cannot be bypassed. Please do not attempt to
                    access the service through alternative means.
                </p>
            </div>
        </div>
    );
};

export default FacultyBanPage;
