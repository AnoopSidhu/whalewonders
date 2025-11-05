
// script.js - safe star hover behavior
document.addEventListener('DOMContentLoaded', () => {
  const starIcon = document.getElementById('star-icon');
  const aboutLink = document.getElementById('about-link');

  if (!aboutLink) {
    console.warn('About link element (#about-link) not found.');
    return;
  }
  if (!starIcon) {
    console.warn('Star element (#star-icon) not found.');
    return;
  }

  // Hover in -> spin + glow
  aboutLink.addEventListener('mouseenter', () => {
    // keep the translate for centering and add rotation
    starIcon.style.transform = 'translate(-50%, -50%) rotate(360deg)';
    starIcon.style.filter = 'brightness(1.35) drop-shadow(0 4px 10px rgba(255,225,130,0.25))';
    starIcon.style.opacity = '1';
  });

  // Hover out -> reset
  aboutLink.addEventListener('mouseleave', () => {
    starIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    starIcon.style.filter = 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))';
    starIcon.style.opacity = '0.85';
  });
});
