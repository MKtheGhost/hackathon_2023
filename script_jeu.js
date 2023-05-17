const cards = [
  { name: "Person 1", category: "Category 1", affirmation: "Affirmation 1" },
  { name: "Person 2", category: "Category 2", affirmation: "Affirmation 2" },
  // ... Add more cards
];

let selectedCards;
let mysteryCard;
let score = 10;
let playerHP = 100;
let bossHP = 100;
const propositions = [];

function selectRandomCards(numCards) {
  const selectedCards = [];
  for (let i = 0; i < numCards; i++) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    selectedCards.push(cards[randomIndex]);
  }
  return selectedCards;
}

function chooseMysteryCard(cards) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

function displayCards() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";
  for (let i = 0; i < selectedCards.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = selectedCards[i].name;
    cardsContainer.appendChild(card);
  }
}

function startGame() {
  selectedCards = selectRandomCards(15);
  mysteryCard = chooseMysteryCard(selectedCards);
  displayCards();
}

function checkGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value;
  
  if (guess.toLowerCase() === mysteryCard.name.toLowerCase()) {
    score += 10;
    document.getElementById("result").textContent = "Bravo ! Vous avez trouvé la bonne carte.";
    animateBullet();
    killBoss();
  } else {
    score = 0;
    document.getElementById("result").textContent = "Dommage, ce n'est pas la bonne carte.";
    reducePlayerHP();
  }

  guessInput.value = "";
  guessInput.focus();

  score--;
  if (score === 0) {
    document.getElementById("result").textContent = "Vous avez perdu !";
    document.getElementById("guess").style.display = "none";
  }

  propositions.push(guess);
  displayPropositions();
}

function animateBullet() {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  document.body.appendChild(bullet);

  const boss = document.getElementById("boss-img");
  const bossPosition = boss.getBoundingClientRect();

  bullet.style.top = window.innerHeight - 100 + "px";
  bullet.style.left = window.innerWidth / 2 + "px";

  setTimeout(function() {
    bullet.style.transform = `translate(${bossPosition.left - window.innerWidth / 2}px, ${bossPosition.top - 100}px)`;
    setTimeout(function() {
      bullet.parentNode.removeChild(bullet);
    }, 500);
  }, 100);
}

function killBoss() {
  bossHP -= 10;
  document.getElementById("boss-hp").style.width = bossHP + "%";
  if (bossHP === 0) {
    document.getElementById("boss").innerHTML = "<p>Vous avez tué le boss !</p>";
  }
}

function reducePlayerHP() {
  playerHP -= 10;
  document.getElementById("player-hp").style.width = playerHP + "%";
  if (playerHP === 0) {
    document.getElementById("result").textContent = "Vous avez perdu !";
    document.getElementById("guess").style.display = "none";
  }
}

function displayPropositions() {
  const propositionsContainer = document.getElementById("propositions");
  propositionsContainer.innerHTML = "";
  for (let i = 0; i < propositions.length; i++) {
    const proposition = document.createElement("p");
    proposition.textContent = propositions[i];
    propositionsContainer.appendChild(proposition);
  }
}

startGame();
