
document.addEventListener('DOMContentLoaded', () => {
  const starIcon = document.getElementById('star-icon');
  const learnLink = document.getElementById('learn-link');

  if (!learnLink) {
    console.warn('About link element (#learn-link) not found.');
    return;
  }
  if (!starIcon) {
    console.warn('Star element (#star-icon) not found.');
    return;
  }

  
  learnLink.addEventListener('mouseenter', () => {
    starIcon.style.transform = 'translate(-50%, -50%) rotate(80deg)';
    //starIcon.style.filter = 'brightness(1.35) drop-shadow(0 4px 10px rgba(255,225,130,0.25))';
    starIcon.style.opacity = '1';
  });

  
  learnLink.addEventListener('mouseleave', () => {
    starIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    starIcon.style.filter = 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))';
    starIcon.style.opacity = '0.85';
  });
});

/* --------------------
RANDOM FOOTER FACT
-------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const factBox = document.getElementById("footer-fact-text");

  const whaleFacts = [
    "Blue whales have hearts the size of cars!",
    "Humpback whales sing songs that can last for hours.",
    "Beluga whales can swim backwards!",
    "Whales sleep with half their brain awake!"
  ];

  function changeFact() {
    const random = Math.floor(Math.random() * whaleFacts.length);
    factBox.textContent = whaleFacts[random];
  }

  setInterval(changeFact, 6000);
});
