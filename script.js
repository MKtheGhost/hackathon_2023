// Gestion du bouton Start
const startButton = document.getElementById('start-button');
const content = document.getElementById('content');
const gameContent = document.getElementById('game-content');
const settingsButtonHome = document.getElementById('settings-button-home');
const settingsButtonGame = document.getElementById('settings-button-game');
const sidebar = document.getElementById('sidebar');
const closeButton = document.getElementById('close-button');

startButton.addEventListener('click', () => {
  // Masquer le contenu actuel
  content.style.display = 'none';

  // Afficher le nouveau contenu (par exemple, une autre div avec le contenu du jeu)
  gameContent.style.display = 'block';
});

settingsButtonHome.addEventListener('click', () => {
  // Afficher la sidebar
  sidebar.style.right = '0';
});

settingsButtonGame.addEventListener('click', () => {
  // Afficher la sidebar
  sidebar.style.right = '0';
});

closeButton.addEventListener('click', () => {
  // Fermer la sidebar
  sidebar.style.right = '-300px';
});
