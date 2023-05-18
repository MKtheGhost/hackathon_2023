// Exemple de données pour les cartes
const countries = [
	{ name: "France", flag: "france.png" },
	{ name: "Allemagne", flag: "germany.png" },
	// Ajoutez d'autres pays ici
];

// Exemple de données pour les affirmations
const affirmations = [
	"La capitale de ce pays est Paris.",
	"Ce pays est connu pour sa tour emblématique.",
	// Ajoutez d'autres affirmations ici
];

// Variables de jeu
let selectedCards = [];
let mysteryCard = null;
let guesses = [];
let score = 10;

// Fonction pour sélectionner les cartes du jeu
function selectCards() {
	const selectedCountries = getRandomItems(countries, 10);
	const selectedAffirmations = getRandomItems(affirmations, 10);

	selectedCards = selectedCountries.map((country, index) => {
		return {
			country: country,
			affirmation: selectedAffirmations[index],
			flipped: false
		};
	});

	mysteryCard = selectedCards[Math.floor(Math.random() * selectedCards.length)];
}

// Fonction pour obtenir des éléments aléatoires d'un tableau
function getRandomItems(array, count) {
	const shuffled = array.sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

// Fonction pour afficher les cartes
function renderCards() {
	const cardsContainer = document.getElementById("cards-container");
	cardsContainer.innerHTML = "";

	selectedCards.forEach((card, index) => {
		const cardElement = document.createElement("div");
		cardElement.className = "card";
		if (card.flipped) {
			cardElement.classList.add("flipped");
		}
		cardElement.addEventListener("click", () => flipCard(index));

		const frontElement = document.createElement("div");
		frontElement.className = "front";
		frontElement.style.backgroundImage = `url(${card.country.flag})`;

		const backElement = document.createElement("div");
		backElement.className = "back";
		backElement.innerText = card.affirmation;

		cardElement.appendChild(frontElement);
		cardElement.appendChild(backElement);
		cardsContainer.appendChild(cardElement);
	});
}

// Fonction pour retourner une carte
function flipCard(index) {
	if (!selectedCards[index].flipped) {
		selectedCards[index].flipped = true;
		renderCards();

		if (selectedCards[index] === mysteryCard) {
			endGame(true);
		} else {
			removeIncorrectCards(index);
		}
	}
}

// Fonction pour supprimer les cartes incorrectes
function removeIncorrectCards(index) {
	const incorrectCards = selectedCards.filter((card, i) => card !== selectedCards[index] && i !== index && card.flipped);

	if (incorrectCards.length > 0) {
		incorrectCards.forEach(card => {
			card.flipped = false;
		});

		score--;
		updateScore();

		renderCards();
	}
}

// Fonction pour terminer le jeu
function endGame(won) {
	const resultContainer = document.getElementById("result-container");
	const resultText = document.getElementById("result-text");
	const restartButton = document.getElementById("restart-button");

	if (won) {
		resultText.innerText = "Félicitations, vous avez trouvé la carte mystère !";
	} else {
		resultText.innerText = "Désolé, vous avez perdu.";
	}

	resultContainer.style.display = "block";
	restartButton.addEventListener("click", restartGame);
}

// Fonction pour redémarrer le jeu
function restartGame() {
	selectedCards = [];
	mysteryCard = null;
	guesses = [];
	score = 10;

	updateScore();
	selectCards();
	renderCards();

	const resultContainer = document.getElementById("result-container");
	resultContainer.style.display = "none";
}

// Fonction pour mettre à jour le score
function updateScore() {
	const scoreText = document.getElementById("score-text");
	scoreText.innerText = `Score: ${score}`;
}

// Fonction pour ajouter une affirmation proposée par le joueur
function addGuess(affirmation) {
	const guessesList = document.getElementById("guesses-list");
	const guessItem = document.createElement("li");
	guessItem.innerText = affirmation;
	guessesList.appendChild(guessItem);
}

// Appel de la fonction pour sélectionner les cartes et démarrer le jeu
selectCards();
renderCards();
updateScore();

