const cards = [
  { name: "Person 1", category: "Category 1", affirmation: "Affirmation 1" },
  { name: "Person 2", category: "Category 2", affirmation: "Affirmation 2" },
  // ... Add more cards
];

let selectedCards;
let mysteryCard;
let score = 10;
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
    killBoss();
  } else {
    score = 0;
    document.getElementById("result").textContent = "Dommage, ce n'est pas la bonne carte.";
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

function killBoss() {
  bossHP -= 10;
  document.getElementById("boss-hp").style.width = bossHP + "%";
  if (bossHP === 0) {
    document.getElementById("boss").innerHTML = "<p>Vous avez tué le boss !</p>";
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
