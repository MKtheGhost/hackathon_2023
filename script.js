// Gestion du bouton Start
const startButton = document.getElementById('start-button');
const content = document.getElementById('content');
const gameContent = document.getElementById('game-content');
const settingsButton = document.getElementById('settings-button');
const sidebar = document.getElementById('sidebar');
const closeButton = document.getElementById('close-button');

startButton.addEventListener('click', () => {
  // Masquer le contenu actuel
  content.style.display = 'none';

  // Afficher le nouveau contenu (par exemple, une autre div avec le contenu du jeu)
  gameContent.style.display = 'block';
});

// Gestion du bouton de paramètres
settingsButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

closeButton.addEventListener('click', () => {
  sidebar.classList.remove('open');
});