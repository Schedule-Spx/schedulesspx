import React from 'react';
import { useAuth } from '../context/AuthContext';

const BannedPage = () => {
    const { user } = useAuth();

    const getBanMessage = () => {
        if (user?.email.includes('26@spxstudent.org')) {
            return 'You are banned Under suspicion for stealing the spirit stick';
        }
        if (user?.email.includes('kjensen25@spxstudent.org')) {
            return 'You are banned Under suspicion for stealing the spirit stick';
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
