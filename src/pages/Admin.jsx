// src/pages/About.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import { useTheme } from '../context/ThemeContext';
import AboutSection1Img from '../assets/about section 1 img.png';
import AboutSection2Img from '../assets/about section 2 img.png';
import AboutSection3Img from '../assets/about section 3 img.png';
import AboutSection4Img from '../assets/about section 4 img.png';
import AboutSection5Img from '../assets/about section 5 img.png';
import AboutSection6Img from '../assets/about section 6 img.png';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [typedKeys, setTypedKeys] = useState('');
  const { currentTheme } = useTheme(); // Use the useTheme hook

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleKeyPress = (event) => {
    setTypedKeys((prevKeys) => {
      const newKeys = prevKeys + event.key;
      if (newKeys.endsWith('2014')) {
        setShowPopup(true);
        return ''; // Reset keys after showing popup
      }
      return newKeys.slice(-4); // Keep only the last 4 characters
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      className="about-container relative"
      style={{
        backgroundPosition: `center ${scrollY * 0.5}px`,
      }}
    >
      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className={`popup-content ${currentTheme.main} ${currentTheme.border} ${currentTheme.text}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              borderStyle: 'solid',
              borderWidth: '2px',
              borderRadius: '15px',
            }}
          >
            <button className="popup-close" onClick={closePopup}>X</button>
            <h2 className={`popup-heading ${currentTheme.accent}`}>
              Introducing the GOAT Mrs. Farrell
            </h2>
            <p className={`popup-text ${currentTheme.text}`}>
              Teacher of the Year award winner<br />
              Earned a Master’s in Non-Profit Management and Leadership<br />
              Named Most Enthusiastic by a senior class<br />
              #3 in high school graduating class (serious scholar vibes)<br />
              Winner of the Thespian Award in high school theatre<br />
              Frequent honors recipient and a proud teacher's pet back in the day<br />
              Halloween Costume Contest champion (alongside your department)<br />
              Thriving in year nine at St. Pius X, teaching Theology with passion<br />
              BA in Religious Studies from William & Mary<br />
              Active participant and supporter in the SPX community, with a love for poolside gatherings<br />
              Blessed with a wonderful husband and a spirited two-year-old daughter, Addie, who you’ll see cheering on at school events
            </p>
            <img src={AboutSection5Img} alt="Popup Content" className="popup-image" />
          </div>
        </div>
      )}

      {/* Section 0: Fullscreen Title with Scroll Prompt */}
      <section className="about-section about-section-0 relative z-20">
        <motion.h1
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: -100 }}
          transition={{ duration: 2 }}
          className="about-main-title"
        >
          Introducing <a className="glow-link" rel="noopener noreferrer">ScheduleSPX</a>
        </motion.h1>
        <motion.div
          className="scroll-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ bottom: 'calc(2rem + 100px)' }}
        >
          <span>&darr;</span> {/* Downward arrow */}
        </motion.div>
      </section>

      {/* Section 1 */}
      <section className="about-section relative z-20">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">It all started in English class...</h2>
            <p className="about-body">
              In true "lightbulb moment" fashion, David and Kagen had the idea of making a website to keep track of bell schedules during the day, with a way to see the time left in the tab preview, and have a progress bar.
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection1Img} alt="About Section 1" />
          </motion.div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section about-content-reverse relative z-20">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">However, it took more than that class to get it up and running...</h2>
            <p className="about-body">
              Kagen, with some "supervision" from David, created the base website and started the backend and figured out the system for coding, workshoping, and publishing the code to the main domain.
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection2Img} alt="About Section 2" />
          </motion.div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section relative z-20">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">But once it was up, we didn’t stop there.</h2>
            <p className="about-body">
              We kept having ideas after ideas, and soon enough we figured out a way to work the best in our workflow to be able to create, develop, and publish all the features you may want!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection3Img} alt="About Section 3" />
          </motion.div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="about-section about-content-reverse relative z-20">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">... and it quickly became the talk of the town</h2>
            <p className="about-body">
              Once people started visiting our site, it quickly became so popular that almost every computer on campus had it up! Everyone from freshman to the teachers were using the site. We even made the news! It was so cool to see everyone using and enjoying it!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection4Img} alt="About Section 4" />
          </motion.div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="about-section relative z-20">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">it was time to expand our team</h2>
            <p className="about-body">
              We realized that it was too much for just Kagen and David to keep updating the site, so they recruited Russel to help with development, and to help maintain the site once the seniors graduated. We also now were officially represented by Mrs. Farrell! She helps our Teacher-Student site relationship and is our #1 supporter! (type the year she got her B.A for a surprise)
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection5Img} alt="About Section 5" />
          </motion.div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="about-section about-content-reverse relative z-20">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">With our new team, and our loyal site users, we are ready to make this the best it can be!</h2>
            <p className="about-body">
              We are dedicated to keeping this site up, updated, and loved by all the students! Please reach out to <a href="mailto:admin@schedulespx.com" className="glow-link" target="_blank" rel="noopener noreferrer">admin@schedulespx.com</a> to reach us directly for any bug reports, feature requests, and ideas! Your support inspires us to keep going!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection6Img} alt="About Section 6" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
