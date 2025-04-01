export const initGravityEffect = () => {
  // Target all card elements in the dashboard
  const elements = document.querySelectorAll('[class*="rounded-lg"]');
  const bodies = [];
  const gravity = 0.6;  // Increased from 0.3
  const bounce = 0.8;   // Increased from 0.7
  const friction = 0.98; // Adjusted for more movement

  class PhysicsBody {
    constructor(element) {
      this.element = element;
      const rect = element.getBoundingClientRect();
      this.x = rect.left;
      this.y = rect.top;
      this.velX = 0;
      this.velY = 0;
      this.width = rect.width;
      this.height = rect.height;
      this.originalPosition = {
        x: this.x,
        y: this.y,
        position: window.getComputedStyle(element).position,
        top: element.style.top,
        left: element.style.left,
        transform: element.style.transform,
        width: element.style.width,
        height: element.style.height
      };

      // Ensure elements stay on top and maintain visibility
      element.style.position = 'fixed';
      element.style.width = `${this.width}px`;
      element.style.height = `${this.height}px`;
      element.style.transform = 'none';
      element.style.margin = '0';
      element.style.zIndex = '1000'; // Increased z-index
      element.style.pointerEvents = 'all'; // Make sure elements remain interactive
    }

    update() {
      this.velY += gravity;
      this.velX *= friction;
      
      this.x += this.velX;
      this.y += this.velY;

      // Bottom boundary with bounce
      if (this.y + this.height > window.innerHeight) {
        this.y = window.innerHeight - this.height;
        this.velY *= -bounce;
      }

      // Side boundaries with bounce
      if (this.x + this.width > window.innerWidth) {
        this.x = window.innerWidth - this.width;
        this.velX *= -bounce;
      }
      if (this.x < 0) {
        this.x = 0;
        this.velX *= -bounce;
      }

      // Update position while preserving other styles
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }

    reset() {
      Object.assign(this.element.style, {
        position: this.originalPosition.position,
        top: this.originalPosition.top,
        left: this.originalPosition.left,
        transform: this.originalPosition.transform,
        zIndex: '',
        margin: ''
      });
    }
  }

  // Only initialize visible elements
  elements.forEach(el => {
    if (el.offsetParent !== null && 
        window.getComputedStyle(el).display !== 'none' &&
        !el.closest('.min-h-screen') && // Exclude outer container
        !el.classList.contains('no-gravity')) {
      bodies.push(new PhysicsBody(el));
    }
  });

  // Animation loop
  let animationFrame;
  const update = () => {
    bodies.forEach(body => body.update());
    animationFrame = requestAnimationFrame(update);
  };

  // Start animation
  update();

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrame);
    bodies.forEach(body => body.reset());
  };
};
