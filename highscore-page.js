const scoreBoard = document.getElementById("scoreBoard");
const allHighScores = JSON.parse(localStorage.getItem("allHighScores")) || [];

scoreBoard.innerHTML = allHighScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");