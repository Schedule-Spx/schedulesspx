// GoogleLogin.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLogin = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login - Token Response:", tokenResponse);
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        console.log("Google Login - User Info:", userInfo);
        
        const userData = {
          name: userInfo.name,
          email: userInfo.email,
          profilePicture: userInfo.picture,
          accessToken: tokenResponse.access_token
        };
        console.log("Google Login - Passing user data to onLoginSuccess:", userData);
        onLoginSuccess(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
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
