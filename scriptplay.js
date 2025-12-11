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
    colour: document.getElementById('section-colour')
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
MEMORY GAME LOGIC
-------------------- */

const CARD_IMAGES = [
  "images/beluga.png",
  "images/card1.PNG",
  "images/whaleshark.png",
  "images/card2.PNG",
  "images/card3.PNG",
  "images/card4.PNG",
  "images/card5.PNG",
  "images/southern.png"
];

let boardEl = document.getElementById('board');
let movesEl = document.getElementById('moves');
let timerEl = document.getElementById('timer');
let restartBtn = document.getElementById('restartBtn');
let messageEl = document.getElementById('message');

let cards = [];
let firstCard = null, secondCard = null;
let moves = 0;
let matches = 0;
let lockBoard = false;
let timerInterval = null;
let secondsElapsed = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatTime(s) {
  const m = Math.floor(s/60);
  const ss = s%60;
  return `${m}:${ss<10 ? "0"+ss : ss}`;
}

function startTimer(){
  if(timerInterval) return;
  timerInterval = setInterval(()=>{
    secondsElapsed++;
    timerEl.textContent = formatTime(secondsElapsed);
  },1000);
}

function stopTimer(){
  clearInterval(timerInterval);
  timerInterval = null;
}

function buildDeck(){
  const d = CARD_IMAGES.concat(CARD_IMAGES);
  shuffle(d);
  cards = d.map((img,i)=>({id:i, img, matched:false}));
}

function renderBoard(){
  if(!boardEl) return;
  boardEl.innerHTML = "";
  cards.forEach(card=>{
    const el = document.createElement("button");
    el.className = "card";
    el.setAttribute('aria-pressed','false');
    el.dataset.img = card.img;
    el.innerHTML = `
      <div class="card-inner">
        <div class="face front">?</div>
        <div class="face back"><img src="${card.img}" alt="whale image"></div>
      </div>
    `;

    el.addEventListener("click", ()=>handleFlip(el));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFlip(el);
      }
    });

    boardEl.appendChild(el);
  });
}

function handleFlip(el){
  if(lockBoard || el.classList.contains("is-flipped")) return;
  if(moves===0 && !firstCard) startTimer();

  el.classList.add("is-flipped");
  el.setAttribute('aria-pressed','true');

  if(!firstCard){ firstCard = el; return; }

  secondCard = el;
  moves++;
  if(movesEl) movesEl.textContent = moves;

  const match = firstCard.dataset.img === secondCard.dataset.img;
  if(match){
    matches++;
    resetTurn();
    if(matches === CARD_IMAGES.length) winGame();
  } else {
    lockBoard = true;
    setTimeout(()=>{
      if(firstCard) { firstCard.classList.remove("is-flipped"); firstCard.setAttribute('aria-pressed','false'); }
      if(secondCard) { secondCard.classList.remove("is-flipped"); secondCard.setAttribute('aria-pressed','false'); }
      resetTurn();
    },700);
  }
}

function resetTurn(){
  [firstCard,secondCard] = [null,null];
  lockBoard = false;
}

function winGame(){
  stopTimer();
  if(messageEl) messageEl.textContent = `You won! ${moves} moves • ${formatTime(secondsElapsed)}`;
}

function startGame(){
  stopTimer();
  secondsElapsed=0;
  if(timerEl) timerEl.textContent="0:00";
  moves=0; matches=0;
  if(movesEl) movesEl.textContent=0;
  if(messageEl) messageEl.textContent="Find all matching pairs!";
  firstCard=null; secondCard=null;

  buildDeck();
  renderBoard();
}

if(restartBtn) restartBtn.addEventListener("click", startGame);
startGame();

/* --------------------
QUIZ LOGIC
-------------------- */

const submitQuiz = document.getElementById("submitQuiz");
const resetQuiz = document.getElementById("resetQuiz");
const quizForm = document.getElementById("quiz");
const quizResult = document.getElementById("quizResult");
const againQuiz = document.getElementById("againQuiz");

const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const resultDesc = document.getElementById("resultDesc");
const resultFun = document.getElementById("resultFun");

const WHALES = {
  blue: {emoji:"🐋", title:"Blue Whale — Gentle Giant", desc:"Calm and kind.", fun:"Blue whales are the largest animals on Earth!"},
  orca: {emoji:"🖤", title:"Orca — Leader", desc:"Energetic and bold.", fun:"Orcas are highly intelligent team hunters!"},
  humpback:{emoji:"🎵", title:"Humpback — Song Artist", desc:"Musical and creative.", fun:"Humpbacks sing songs that travel miles!"},
  beluga:{emoji:"🤍", title:"Beluga — Explorer", desc:"Curious and playful.", fun:"Belugas are called the 'canaries of the sea'!"}
};

if (quizForm) {
  document.querySelectorAll(".quiz-option").forEach(opt=>{
    const input = opt.querySelector("input");
    opt.addEventListener("click", ()=>{
      const group = opt.parentElement;
      group.querySelectorAll(".quiz-option").forEach(o=>o.classList.remove("selected"));
      opt.classList.add("selected");
      if(input) input.checked = true;
    });
  });

  function getScores(){
    const data = new FormData(quizForm);
    const scores = {blue:0,orca:0,humpback:0,beluga:0};
    for(const [k,v] of data.entries()){
      if(scores[v] !== undefined) scores[v]++;
    }
    return scores;
  }

  function pickWinner(scores){
    let max = Math.max(...Object.values(scores));
    if (max === 0) return null;
    let tied = Object.keys(scores).filter(k=>scores[k]===max);
    return tied[Math.floor(Math.random()*tied.length)];
  }

  if(submitQuiz) submitQuiz.addEventListener("click", ()=>{
    const scores = getScores();
    const winner = pickWinner(scores);

    if(!winner){ alert("Please answer all questions!"); return; }

    const info = WHALES[winner];
    if(resultEmoji) resultEmoji.textContent = info.emoji;
    if(resultTitle) resultTitle.textContent = info.title;
    if(resultDesc) resultDesc.textContent = info.desc;
    if(resultFun) resultFun.textContent = info.fun;

    if(quizResult) quizResult.style.display = "block";
  });

  if(resetQuiz) resetQuiz.addEventListener("click", ()=>{
    quizForm.reset();
    document.querySelectorAll(".quiz-option").forEach(o=>o.classList.remove("selected"));
    if(quizResult) quizResult.style.display="none";
  });

  if(againQuiz) againQuiz.addEventListener("click", ()=>{
    quizForm.reset();
    document.querySelectorAll(".quiz-option").forEach(o=>o.classList.remove("selected"));
    if(quizResult) quizResult.style.display="none";
    window.scrollTo({top:0});
  });
}

/* --------------------
COLOURING PAGES LOGIC
-------------------- */
const colourCards = document.querySelectorAll('.colour-card');

colourCards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.dataset.img;
    if(!imgSrc) return;

    
    window.open(imgSrc, '_blank');
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

