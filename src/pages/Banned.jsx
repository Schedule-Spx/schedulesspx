import React from 'react';
import { useAuth } from '../context/AuthContext';

const BannedPage = () => {
    const { user } = useAuth();

    const getBanMessage = () => {
        if (user?.email.includes('26')) {
            return 'You are banned for the day. Nice try with the Spirit Stick. Please try again tomorrow.';
        }
        return 'You have been permanently banned for violating the terms of service.';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='text-5xl'> Banned</h1>
            <br />
            <p className='text-2xl'>{getBanMessage()}</p>
        </div>
    );
}

export default BannedPage;
