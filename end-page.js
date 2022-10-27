const user = document.getElementById('username');
const keepScrBtn = document.getElementById('keepScrBtn');
const finGrade = document.getElementById('finGrade');
const currScore = localStorage.getItem('currScore');

const allHighScores = JSON.parse(localStorage.getItem('allHighScores')) || [];

const maxHS = 5;

finGrade.innerText = currScore;

user.addEventListener('keyup', () => {
    keepScrBtn.disabled = !user.value;
});

saveHS = (e) => {
    e.preventDefault();

    const score = {
        score: currScore,
        name: user.value,
    };
    allHighScores.push(score);
    allHighScores.sort((a, b) => b.score - a.score);
    allHighScores.splice(5);

    localStorage.setItem('allHighScores', JSON.stringify(allHighScores));
    window.location.assign('/');
};