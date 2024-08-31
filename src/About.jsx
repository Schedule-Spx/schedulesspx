// src/About.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import AboutSection1Img from './assets/about section 1 img.png';
import AboutSection2Img from './assets/about section 2 img.png';
import AboutSection3Img from './assets/about section 3 img.png';
import AboutSection4Img from './assets/about section 4 img.png';

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="about-container"
      style={{
        backgroundPosition: `center ${scrollY * 0.5}px`,
      }}
    >
      {/* Section 0: Fullscreen Title with Scroll Prompt */}
      <section className="about-section about-section-0">
        <motion.h1
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: -100 }}
          transition={{ duration: 2 }}
          className="about-main-title"
        >
          Introducing <a className="glow-link" rel="noopener noreferrer">ScheduleSPX!</a>
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
      <section className="about-section">
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
              In true "lightbulb moment" fashion, <a href="https://instagram.com/davidcamick" className="glow-link" target="_blank" rel="noopener noreferrer">David</a> and <a href="https://instagram.com/kdogdevs" className="glow-link" target="_blank" rel="noopener noreferrer">Kagen</a> had the idea of making a website to keep track of bell schedules during the day, with a way to see the time left in the tab preview, and have a progress bar.
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10, }}
            whileInView={{ opacity: 1, x: 0, rotate: 15, }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection1Img} alt="About Section 1" />
          </motion.div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section">
        <div className="about-content about-content-reverse">
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
            initial={{ opacity: 0, x: -100, rotate: 10, }}
            whileInView={{ opacity: 1, x: 0, rotate: -5, }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection2Img} alt="About Section 2" />
          </motion.div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">But once it was up, we didn't stop there.</h2>
            <p className="about-body">
              We kept having ideas after ideas, and soon enough we figured out a way to work the best in our workflow to be able to create, develop, and publish all the features you may want!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: -10, }}
            whileInView={{ opacity: 1, x: 0, rotate: 5, }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection3Img} alt="About Section 3" />
          </motion.div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="about-section">
        <div className="about-content about-content-reverse">
          <motion.div
            className="about-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">...and we won't stop here, either.</h2>
            <p className="about-body">
              We are dedicated to keeping this site up, updated, and loved by all the students! Please reach out to <a href="mailto:admin@schedulespx.com" className="glow-link" target="_blank" rel="noopener noreferrer">admin@schedulespx.com</a> to reach us directly for any bug reports, feature requests, and ideas! Your support inspires us to keep going!
            </p>
          </motion.div>
          <motion.div
            className="about-image-placeholder"
            initial={{ opacity: 0, x: -100, rotate: 10, }}
            whileInView={{ opacity: 1, x: 0, rotate: -5, }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={AboutSection4Img} alt="About Section 4" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
