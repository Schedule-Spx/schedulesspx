import React, { useState } from 'react';
import './TutorialModal.css';

const TutorialModal = ({ closeTutorial }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleClose = () => {
    closeTutorial();
  };

  // Define position and scale variables for each step
  const steps = [
    { top: '00%', left: '50%', transform: 'translateX(-50%)', scale: 1 },
    { top: '50%', left: '50%', transform: 'none', scale: 1.2 },
    { top: '64%', left: '20%', transform: 'translateX(-50%)', scale: 0.75 },
    { top: '70%', left: '80%', transform: 'translateX(-50%)', scale: 0.8 },
    { top: '6%', left: '85%', transform: 'translateX(-50%)', scale: 0.7 },
  ];

  // Use a default step if the step exceeds the defined steps
  const currentStep = steps[step - 1] || { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1 };

  return (
    <div
      className="tutorial-modal"
      style={{
        top: currentStep.top,
        left: currentStep.left,
        transform: `${currentStep.transform} scale(${currentStep.scale})`,
      }}
    >
      {step === 1 && (
        <div className="tutorial-content">
          <h2>Hi! I'm the Time Lion</h2>
          <p>
            I'm like a golden lion, but my specialty is time and bell schedules! Super exciting, right? If you already know how to use the site, you can close this, but if you'd like a little tour, press continue!
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
          <p>Here's the document creator. Click one of the icons to create a new document in a new tab!</p>
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
          <p>That's all I have for you now. I'll see you next time there's an update! See ya!</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TutorialModal;
