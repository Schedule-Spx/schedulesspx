import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Faculty ban emails (keep in sync with AuthContext)
const FACULTY_BAN_EMAILS = new Set([
  'kagenmjensen@me.com',
  'davidpaulcamick@gmail.com'
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
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setHours(12, 15, 0, 0);
        
        // If current time is past 12:15 PM, set target to next Friday
        if (targetDate < new Date()) {
            targetDate.setDate(targetDate.getDate() + (12 - targetDate.getDay()));
        } else {
            // Set to this Friday if we haven't passed 12:15 PM
            targetDate.setDate(targetDate.getDate() + (5 - targetDate.getDay()));
        }

        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            setCountdown(`${days}d ${hours}h ${minutes}m`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <h1 className="text-5xl">Access Denied</h1>
                <p className="text-xl mt-4">Please log in to access this page.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black text-white p-8 relative">
            {/* Hide any navigation elements */}
            <style>{`
                nav, header { 
                    display: none !important;
                }
            `}</style>
            
            <h1 className="text-6xl font-bold text-red-600 mb-12 text-center">
                {countdown} until the faculty will fall.
            </h1>
            
            <p className="text-2xl mb-12 text-center text-red-400">
                From not letting us have our phones, to never rounding up an 89 on a test to a 90, 
                the faculty has gone too far and they will feel the pain.
            </p>
            
            <div className="space-y-6 text-xl max-w-4xl mx-auto">
                <p className="text-gray-300">Cloyd: 6'8 and cant dunk? Embarrasing.</p>
                <p className="text-gray-300">Parr: Thinks hes still him, 17 years after his last college game.</p>
                <p className="text-gray-300">Byrne: Only got one snap in college. for a reason.</p>
                <p className="text-gray-300">Fr Robbie: Went 0-10 in the seminary basketball league. (0-11 if we count the last time he played students)</p>
                <p className="text-gray-300">Mr.C: thinks yelling "Go Team Go" will fix his problems.</p>
                <p className="text-gray-300">David Stancil: an embarrassment to the "David" name</p>
                <p className="text-gray-300">Dr.Lindencougal: nobody spells his last name right. (Forgettable)</p>
                <p className="text-gray-300">Mrs.Restrepo: never had her. never complained about it.</p>
                <p className="text-gray-300">Tijani: no amount of physics will get that ball in the basket</p>
                <p className="text-gray-300">Mcclay: can run cross country, but airballs if hes past the free throw line.</p>
            </div>
            
            <p className="mt-12 text-2xl font-bold text-center text-red-500">
                Athletes in their prime vs teachers who wish they were still in their 20s.
            </p>
        </div>
    );
};

export default FacultyBanPage;
