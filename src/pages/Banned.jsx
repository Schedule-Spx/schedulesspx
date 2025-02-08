import React from 'react';
import { useAuth } from '../context/AuthContext';

const BannedPage = () => {
    const { user } = useAuth();

    const getBanMessage = () => {
        if (user?.email.includes('26@spxstudent.org')) {
            return 'Due to the allogations regarding the theft and unrightful ownership of the Spirit Stick, and you being the primary (and only suspect) you and all your members have been banned from ScheduleSPX. The ban will cover all aspects of our site, and will be lifted when a verdict has been reached';
        }

        return 'You have been permanently banned for violating the terms of service.';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='text-5xl'> Banned</h1>
            <br />
            <p className='text-2xl'>{getBanMessage()}</p>
            <p className='text-xl'>You are not allowed to access any other parts of the website.</p>
        </div>
    );
}

export default BannedPage;
