/* --------------------
STAR ICON BEHAVIOUR
-------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const starIcon = document.getElementById('star-icon');
  const playLink = document.getElementById('play-link');

  if (playLink && starIcon) {
    playLink.addEventListener('mouseenter', () => {
      starIcon.style.transform = 'translate(-50%,-50%) rotate(80deg)';
      starIcon.style.opacity = '1';
    });

    playLink.addEventListener('mouseleave', () => {
      starIcon.style.transform = 'translate(-50%,-50%) rotate(0deg)';
      starIcon.style.opacity = '.85';
    });
  }
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
