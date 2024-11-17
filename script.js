const questions = [
    {
        question: "what is your Name ?",
        choices: ["subhro", "lalu", "jonny", "sam"],
        correct: "subhro",
        selectedanswer:""
    },
    {
        question: "What is the largest planet in our solar system ?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter",
        selectedanswer:""
    },
    {
        question: "Who wrote 'Hamlet' ?",
        choices: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
        correct: "William Shakespeare",
        selectedanswer:""
    }
];
const curquestion = document.getElementById('question');
const q1 = document.getElementById('choice1-label')
const q2 = document.getElementById('choice2-label')
const q3 = document.getElementById('choice3-label')
const q4 = document.getElementById('choice4-label')
const next = document.getElementById('next-btn')
const resultcontainer = document.getElementById('answer-score');
const score = document.getElementById('score')
const timer = document.getElementById('time');
const reviewContainer = document.getElementById('review');

let currentQuestion = 0;
let yourscore = 0;
let timeleft = 10;
let time;
function loadQuestion(currentQuestion) {
    clearInterval(time);
    timeleft = 10;
    const curQuiz = questions[currentQuestion];
    curquestion.textContent = curQuiz.question;
    q1.textContent = curQuiz.choices[0];
    q2.textContent = curQuiz.choices[1];
    q3.textContent = curQuiz.choices[2];
    q4.textContent = curQuiz.choices[3];

    time = setInterval(countdown, 1000);
}

next.addEventListener('click', function () {
    nextQuestion();
});
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name ="answer"]:checked');
    if (selectedAnswer) {
        const answerText = document.querySelector(`label[for=${selectedAnswer.id}]`).textContent;
        questions[currentQuestion].selectedanswer = (answerText)?answerText:'';
        if (answerText === questions[currentQuestion].correct) {
            yourscore++;
        }
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
        selectedAnswer.checked = false;
    } else {
        selectedAnswer.checked = false;
        displayresults();
    }
}
function countdown() {
    timeleft--;
    timer.innerText = timeleft;
    if (timeleft <= 0) {
        clearInterval(time);
        if (currentQuestion + 1 === questions.length) {
            displayresults();
        } else {
           nextQuestion(); 
        }
    }

}
function displayresults() {
    document.getElementById('question-container').style.display = 'none';
    resultcontainer.style.display = 'block';
    const resultDisplay = questions.map((q,index) =>
        `<div id="review-box">
        <p><strong>Qusestion ${index + 1} : </strong>${q.question}</p>
        <p id="review-box-p">Your Answer : ${q.selectedanswer}</p>
        <p id="review-box-p">Correct Answer : <strong>${q.correct}</strong></p>
        </div>`
    ).join('');

    score.textContent = `${yourscore}/${questions.length}`;
    reviewContainer.innerHTML = resultDisplay;
}
document.getElementById('reset-btn').addEventListener('click', function () {
    resultcontainer.style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    questions.forEach((q) =>  q.selectedanswer = '');
    currentQuestion = 0;
    yourscore = 0;
    loadQuestion(currentQuestion);
});
loadQuestion(currentQuestion);