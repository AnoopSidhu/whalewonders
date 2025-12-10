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
TABS LOGIC
-------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const sections = {
    game: document.getElementById('section-game'),
    quiz: document.getElementById('section-quiz'),
  };

  
  Object.values(sections).forEach((sec, i) => {
    sec.style.display = i === 0 ? 'block' : 'none';
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selected = tab.dataset.tab;
      Object.keys(sections).forEach(key => {
        sections[key].style.display = key === selected ? 'block' : 'none';
      });
    });
  });
});

/* --------------------
MAPS LOGIC 
-------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const whaleButtons = document.querySelectorAll('.select-btn');
  const habitatMap = document.getElementById('habitat-map');

  const mapImages = {
    blue: "images/blue_whale_map.png",
    orca: "images/killer_whale_map.png",
    humpback: "images/humpback_whale_map.png",
    beluga: "images/beluga_whale_map.png",
    southern: "images/southern_whale_map.jpg",

  };

  whaleButtons.forEach(btn => {
    btn.addEventListener('click', () => {

      whaleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const whaleType = btn.dataset.whale;

      habitatMap.src = mapImages[whaleType];
    });
  });
});

/* --------------------
ZONE PANELS
---------------------*/
document.querySelectorAll('.zone-header').forEach(header => {
  header.addEventListener('click', () => {
    const panel = header.parentElement;
    panel.classList.toggle('open');
  });
});
