import React, { useState } from 'react';
import '../styles/TutorialModal.css';

const TutorialModal = ({ closeTutorial }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleClose = () => {
    closeTutorial();
  };

  // Define position, scale, and vignette settings for each step using your manually set properties
  const steps = [
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1, vignette: { radius: '4000px', opacity: 1, positionX: '50%', positionY: '40%' } },
    { top: '50%', left: '50%', transform: 'none', scale: 1.2, vignette: { radius: '3000px', opacity: 1, positionX: '50%', positionY: '10%' } },
    { top: '64%', left: '20%', transform: 'translateX(-50%)', scale: 0.75, vignette: { radius: '4000px', opacity: 1, positionX: '20%', positionY: '54%' } },
    { top: '70%', left: '80%', transform: 'translateX(-40%)', scale: 0.8, vignette: { radius: '4000px', opacity: 1, positionX: '80%', positionY: '60%' } },
    { top: '6%', left: '85%', transform: 'translateX(-50%)', scale: 0.7, vignette: { radius: '5000px', opacity: 1, positionX: '85%', positionY: '6%' } },
  ];

  const currentStep = steps[step - 1] || { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1, vignette: { radius: '400px', opacity: 0.8, positionX: '50%', positionY: '50%' } };

  return (
    <>
      {steps.map((_, index) => (
        <div
          key={index}
          className={`vignette-overlay ${step === index + 1 ? 'active' : ''}`}
          style={{
            top: currentStep.vignette.positionY,
            left: currentStep.vignette.positionX,
            width: currentStep.vignette.radius,
            height: currentStep.vignette.radius,
            opacity: currentStep.vignette.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      ))}

      <div
        className={`tutorial-modal ${step === 1 ? 'scale-in' : ''}`}
        style={{
          top: currentStep.top,
          left: currentStep.left,
          transform: `${currentStep.transform} scale(${currentStep.scale})`,
        }}
      >
        {step === 1 && (
          <div className="tutorial-content">
            <h2>Welcome to ScheduleSPX 2.0!</h2>
            <p>
              We're super excited you are here! If you already know how to use the site, you can close this, but if you'd like a little tour, press continue!
            </p>
            <button onClick={handleClose}>Close Tutorial</button>
            <button onClick={handleNext}>Continue Tutorial</button>
          </div>
        )}
        {step === 2 && (
          <div className="tutorial-content">
            <h2>Bell Schedule</h2>
            <p>Here's the bell schedule. It has all the classes for the day, as well as updates for homeroom, mass, etc.!</p>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        {step === 3 && (
          <div className="tutorial-content">
            <h2>Quick Links</h2>
            <p>This is the quick links section. You can go directly to Canvas, x2VOL, Sage Dining, and more!</p>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        {step === 4 && (
          <div className="tutorial-content">
            <h2>Document Creator</h2>
            <p>Click one of the icons to create a new document in a new tab!</p>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        {step === 5 && (
          <div className="tutorial-content">
            <h2>Account Section</h2>
            <p>Last but not least, here's the account section. You can change your theme to whatever you want here, as well as set your own periods!</p>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        {step === 6 && (
          <div className="tutorial-content">
            <h2>That's All!</h2>
            <p>Thats all for now, please enjoy and we will see you next time there's an update!</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </>
  );
};

export default TutorialModal;
