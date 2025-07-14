import React, { useState, useEffect } from 'react';

const MaintenancePage = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target date: August 5th, 2025 (assuming current year or next year)
  const targetDate = new Date('2025-08-05T00:00:00');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate progress percentage (assuming maintenance started some time ago)
  // For demo purposes, let's say maintenance started 30 days before August 5th
  const maintenanceStartDate = new Date('2025-07-06T00:00:00'); // 30 days before Aug 5
  const now = new Date();
  const totalDuration = targetDate.getTime() - maintenanceStartDate.getTime();
  const elapsed = now.getTime() - maintenanceStartDate.getTime();
  const progressPercentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    content: {
      maxWidth: '32rem',
      width: '100%',
      textAlign: 'center',
      color: 'white'
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #dbeafe, #a5f3fc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    divider: {
      width: '6rem',
      height: '0.25rem',
      background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
      margin: '0 auto 2rem',
      borderRadius: '9999px'
    },
    subtitle: {
      fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#dbeafe'
    },
    description: {
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      color: '#bfdbfe',
      lineHeight: '1.6',
      marginBottom: '3rem'
    },
    progressContainer: {
      marginBottom: '3rem'
    },
    progressLabel: {
      fontSize: '0.875rem',
      color: '#93c5fd',
      fontWeight: '500',
      marginBottom: '1rem'
    },
    progressBar: {
      width: '100%',
      height: '0.75rem',
      backgroundColor: 'rgba(30, 58, 138, 0.5)',
      borderRadius: '9999px',
      overflow: 'hidden',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #22d3ee, #60a5fa)',
      borderRadius: '9999px',
      transition: 'width 1s ease-out',
      position: 'relative',
      overflow: 'hidden',
      width: `${progressPercentage}%`
    },
    progressShine: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      animation: 'shine 2s infinite'
    },
    countdownGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(5rem, 1fr))',
      gap: '1rem',
      marginBottom: '3rem'
    },
    countdownItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '0.75rem',
      padding: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    countdownNumber: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 'bold',
      color: '#22d3ee'
    },
    countdownLabel: {
      fontSize: '0.75rem',
      color: '#bfdbfe',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginTop: '0.25rem'
    },
    footer: {
      color: '#bfdbfe',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
    },
    particles: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 1
    },
    particle: {
      position: 'absolute',
      borderRadius: '50%'
    },
    particle1: {
      top: '25%',
      left: '25%',
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: 'rgba(34, 211, 238, 0.3)',
      animation: 'ping 2s infinite'
    },
    particle2: {
      top: '75%',
      right: '25%',
      width: '0.25rem',
      height: '0.25rem',
      backgroundColor: 'rgba(96, 165, 250, 0.3)',
      animation: 'pulse 3s infinite'
    },
    particle3: {
      bottom: '25%',
      left: '33%',
      width: '0.375rem',
      height: '0.375rem',
      backgroundColor: 'rgba(34, 211, 238, 0.2)',
      animation: 'bounce 2s infinite'
    },
    particle4: {
      top: '50%',
      right: '33%',
      width: '0.25rem',
      height: '0.25rem',
      backgroundColor: 'rgba(147, 197, 253, 0.3)',
      animation: 'ping 3s infinite 1s'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes ping {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-0.5rem); }
          }
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      
      <div style={styles.content}>
        {/* Logo/Title Area */}
        <div>
          <h1 style={styles.title}>Schedule SPX</h1>
          <div style={styles.divider}></div>
        </div>

        {/* Sorry Message */}
        <div>
          <h2 style={styles.subtitle}>
            Sorry, Schedule SPX is down right now
          </h2>
          <p style={styles.description}>
            We're going through some big changes to serve you better.<br />
            We'll be back on <strong style={{color: '#22d3ee'}}>August 5th</strong>!
          </p>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressLabel}>
            Progress: {Math.round(progressPercentage)}% Complete
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill}>
              <div style={styles.progressShine}></div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div style={styles.countdownGrid}>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeRemaining.days}</div>
            <div style={styles.countdownLabel}>Days</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeRemaining.hours}</div>
            <div style={styles.countdownLabel}>Hours</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeRemaining.minutes}</div>
            <div style={styles.countdownLabel}>Minutes</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeRemaining.seconds}</div>
            <div style={styles.countdownLabel}>Seconds</div>
          </div>
        </div>

        {/* Additional Info */}
        <div style={styles.footer}>
          <p style={{marginBottom: '0.5rem'}}>Thank you for your patience!</p>
          <p>We're working hard to bring you an even better experience.</p>
        </div>

        {/* Floating particles effect */}
        <div style={styles.particles}>
          <div style={{...styles.particle, ...styles.particle1}}></div>
          <div style={{...styles.particle, ...styles.particle2}}></div>
          <div style={{...styles.particle, ...styles.particle3}}></div>
          <div style={{...styles.particle, ...styles.particle4}}></div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;