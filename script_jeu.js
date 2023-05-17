const cards = [
  { name: "Person 1", category: "Category 1", affirmation: "Affirmation 1" },
  { name: "Person 2", category: "Category 2", affirmation: "Affirmation 2" },
  { name: "Person 3", category: "Category 3", affirmation: "Affirmation 3" },
  { name: "Person 4", category: "Category 4", affirmation: "Affirmation 4" },
  { name: "Person 5", category: "Category 5", affirmation: "Affirmation 5" },
  { name: "Person 6", category: "Category 6", affirmation: "Affirmation 6" },
  { name: "Person 7", category: "Category 7", affirmation: "Affirmation 7" },
  // ... Add more cards
];

let mysteryCard;
let score = 10;

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
}

startGame();
