// src/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Schedule SPX</h1>
      <div className="space-y-4">
        <p>
          Schedule SPX was created by Kagen Jensen and David Camick with a clear mission: to make life easier for students and teachers at St. Pius X. Tired of the hassle of logging into PowerSchool just to check the bell schedule? So were we. That's why we built Schedule SPX—a streamlined, easy-to-use platform that puts the daily schedule at your fingertips.
        </p>
        <p>
          But we didn't stop there. Schedule SPX also provides quick access to essential links like your grades, Canvas, sp.org, and even the cafe menu, making it your one-stop hub for everything you need throughout the school day.
        </p>
        <p>
          The original idea for Schedule SPX came from David, who is also leading the design, marketing! On the other hand, Kagen is the mastermind behind the code, API, front-end development of the site and all the technical workings that make the site run smoothly.
        </p>
        <p>
          Together, we're dedicated to enhancing your school experience by providing a reliable and accessible resource for staying on top of your schedule and more.
        </p>
      </div>
      <div className="mt-8">
        <a 
          href="https://www.instagram.com/schedulespx/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow us on Instagram
        </a>
      </div>
    </div>
  );
};

export default About;
