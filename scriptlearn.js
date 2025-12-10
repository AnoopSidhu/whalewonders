
// STAR HOVER BEHAVIOR

document.addEventListener('DOMContentLoaded', () => {
  const starIcon = document.getElementById('star-icon');
  const learnLink = document.getElementById('learn-link');

  if (learnLink && starIcon) {
    learnLink.addEventListener('mouseenter', () => {
      starIcon.style.transform = 'translate(-50%, -50%) rotate(80deg)';
      starIcon.style.opacity = '1';
    });

    learnLink.addEventListener('mouseleave', () => {
      starIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
      starIcon.style.opacity = '0.85';
    });
  }
});


// TAB SWITCHING 

const speciesBtn = document.getElementById("species-btn");
const conservationBtn = document.getElementById("conservation-btn");
const funFactsBtn = document.getElementById("facts-btn");

const speciesSection = document.getElementById("species");
const conservationSection = document.getElementById("conservation");
const funFactsSection = document.getElementById("fun-facts");

const tabs = document.querySelectorAll(".tab");

// Function to show only one section
function showSection(sectionToShow) {
  speciesSection.style.display = "none";
  conservationSection.style.display = "none";
  funFactsSection.style.display = "none";

  sectionToShow.style.display = "block";
}

// Add click listeners to tabs
tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // remove & re-add active class
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // determine which content to show
    const target = tab.dataset.section;
    if (target === "species") showSection(speciesSection);
    if (target === "conservation") showSection(conservationSection);
    if (target === "fun") showSection(funFactsSection);
  });
});

// Default visible section
showSection(speciesSection);

/* FUN FACTS CARD SYSTEM */
const funFacts = [
  "There are two types of whales: the baleen whales and the toothed whales. Baleen whales, including humpbacks and blue whales, have fibrous 'baleen' plates in their mouths instead of teeth, which help them filter out and consume huge quantities of zooplankton: small prey including krill, fish or crustaceans called copepods. Whereas toothed whales, such as orcas, beluga and sperm whales, have teeth which enable them to feed on larger prey such as fish and squid. All dolphin families, including porpoises, are also classified as whales, as they are more related to their toothed counterparts.",
  "Humpback whales in the Southern Hemisphere live off their fat reserves for 5.5-7.5 months each year, as they migrate from their tropical breeding grounds to the Antarctic, to feed on krill.​",
  "All toothed whales have a ‘melon’ in their foreheads. It’s a mass of tissue which focuses the whales’ calls, vital for communication and echolocation.​ Like bats, they use this echolocation to see.",
  "Some whales use bubble netting to feed. This involves whales cooperatively blowing bubbles that encircle their prey. As the prey won't cross through the bubbles, they're trapped, making it easy for the whales to eat them.​",
  "There used to be thousands of blue whales in the Antarctic. It's estimated that there were over 225,000 Antarctic blue whales before their exploitation in the 1900s. Today, there are estimated to be less than 2,000 Antarctic blue whales left in the world.",
  "The Antarctic blue whale is the biggest of all blue whales. It is also the largest animal on the planet, weighing up to 180 tons (approximately 36 elephants) and reaching up to 30 metres in length. They can consume about 4 tonnes of krill a day!"
];

let funIndex = 0;

const funText = document.getElementById("funfact-text");
const funPrev = document.getElementById("fun-prev");
const funNext = document.getElementById("fun-next");

// show first fact on load
funText.textContent = funFacts[funIndex];

function updateFunFact() {
  funText.style.opacity = 0;
  funText.style.transform = "scale(0.98)";

  setTimeout(() => {
    funText.textContent = funFacts[funIndex];
    funText.style.opacity = 1;
    funText.style.transform = "scale(1)";
  }, 200);
}

funNext.addEventListener("click", () => {
  funIndex = (funIndex + 1) % funFacts.length;
  updateFunFact();
});

funPrev.addEventListener("click", () => {
  funIndex = (funIndex - 1 + funFacts.length) % funFacts.length;
  updateFunFact();
});
