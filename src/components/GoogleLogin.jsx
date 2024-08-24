// src/components/GoogleLogin.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLogin = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      // Here you would typically send the access token to your backend
      // The backend would then use it to fetch the user's info and return it
      // For this example, we'll simulate that with a timeout
      setTimeout(() => {
        onLoginSuccess({
          name: 'Google User',
          email: 'user@example.com',
          // You wouldn't actually store the access token in the frontend like this
          accessToken: tokenResponse.access_token
        });
      }, 1000);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <button onClick={() => login()} className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
