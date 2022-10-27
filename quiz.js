const question = document.getElementById('question');
const allChoices = Array.from(document.getElementsByClassName('choice-txt'));
const progTxt = document.getElementById('progTxt');
const scrTxt = document.getElementById('score');
const fullBar = document.getElementById('fullBar');
const loading = document.getElementById('loader');
const quiz = document.getElementById('game');
let currQuestion = {};
let okAns = false;
let score = 0;
let queCount = 0;
let useableQue = [];

let allQuestions = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadQues) => {
        allQuestions = loadQues.results.map((loadQue) => {
            const makeQuestion = {
                question: loadQue.question,
            };

            const allAnsChoices = [...loadQue.incorrect_answers];
            makeQuestion.answer = Math.floor(Math.random() * 4) + 1;
            allAnsChoices.splice(
                makeQuestion.answer - 1,
                0,
                loadQue.correct_answer
            );

            allAnsChoices.forEach((choice, index) => {
                makeQuestion['choice' + (index + 1)] = choice;
            });

            return makeQuestion;
        });

        startQuiz();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const correctAnsPlus = 10;
const maxQues = 3;

startQuiz = () => {
    queCount = 0;
    score = 0;
    useableQue = [...allQuestions];
    grabQuestion();
    quiz.classList.remove('hidden');
    loading.classList.add('hidden');
};

grabQuestion = () => {
    if (useableQue.length === 0 || queCount >= maxQues) {
        localStorage.setItem('currScore', score);
        //go to the end page
        return window.location.assign('/end-page.html');
    }
    queCount++;
    progTxt.innerText = `Question ${queCount}/${maxQues}`;
    //Update the progress bar
    fullBar.style.width = `${(queCount / maxQues) * 100}%`;

    const quesIndex = Math.floor(Math.random() * useableQue.length);
    currQuestion = useableQue[quesIndex];
    question.innerText = currQuestion.question;

    allChoices.forEach((choice) => {
        const numb = choice.dataset['number'];
        choice.innerText = currQuestion['choice' + numb];
    });

    useableQue.splice(quesIndex, 1);
    okAns = true;
};

allChoices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!okAns) return;

        okAns = false;
        const selChoice = e.target;
        const selectAns = selChoice.dataset['number'];

        const putClass =
            selectAns == currQuestion.answer ? 'correct' : 'incorrect';

        if (putClass === 'correct') {
            incScr(correctAnsPlus);
        }

        selChoice.parentElement.classList.add(putClass);

        setTimeout(() => {
            selChoice.parentElement.classList.remove(putClass);
            grabQuestion();
        }, 1000);
    });
});

incScr = (num) => {
    score += num;
    scrTxt.innerText = score;
};