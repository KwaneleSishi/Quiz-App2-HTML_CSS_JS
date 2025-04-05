const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "1993"],
        correctAnswer: "1995"
    },
    {
        question: "What does SDLC stand for?",
        options: [
            "System Design Life Cycle",
            "Software Design Life Cycle",
            "Software Development Life Cycle",
            "System Development Life Cycle"
        ],
        correctAnswer: "Software Development Life Cycle"
    },
    {
        question: "Which phase is NOT part of the Software Development Life Cycle (SDLC)?",
        options: ["Planning", "Analysis", "Testing", "Maintenance"],
        correctAnswer: "Testing"
    },
    {
        question: "What does UML stand for in software engineering?",
        options: [
            "Unified Modeling Language",
            "Universal Modeling Language",
            "Unique Modeling Language",
            "Unified Management Language"
        ],
        correctAnswer: "Unified Modeling Language"
    },
    {
        question: "Which of the following is NOT a software development model?",
        options: ["Agile", "Waterfall", "Spiral", "RAD (Rapid Application Development)"],
        correctAnswer: "RAD (Rapid Application Development)"
    },
    {
        question: "Which is NOT a phase in the software development process?",
        options: ["Planning", "Design", "Implementation", "Maintenance"],
        correctAnswer: "Planning"
    },
    {
        question: "Which aspect is NOT typically considered in software quality attributes?",
        options: ["Performance", "User interface", "Functionality", "Output"],
        correctAnswer: "Output"
    },
    {
        question: "What is the main purpose of software testing?",
        options: [
            "To ensure the software meets requirements",
            "To find errors",
            "To document the software",
            "To create user manuals"
        ],
        correctAnswer: "To find errors"
    },
    {
        question: "Which software development model follows a linear sequential flow?",
        options: ["Waterfall", "V-Model", "Agile", "Big Bang"],
        correctAnswer: "Waterfall"
    },
    {
        question: "What is the purpose of the Design Phase in SDLC?",
        options: [
            "To define the system requirements",
            "To translate requirements into design",
            "To perform unit testing",
            "To deploy the software"
        ],
        correctAnswer: "To translate requirements into design"
    },
    {
        question: "Which of the following is NOT a software development model?",
        options: ["Waterfall model", "Agile model", "Hardware model", "Spiral model"],
        correctAnswer: "Hardware model"
    },
    {
        question: "Which is a drawback of the Waterfall model?",
        options: ["No risk analysis", "High-risk analysis", "No customer involvement", "Sequential phases"],
        correctAnswer: "No risk analysis"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 300; // 5 minutes in seconds
const userAnswers = new Array(quizData.length).fill(null);

// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const submitButton = document.getElementById("submit-btn");
const reviewButton = document.getElementById("review-btn");

// Start the Quiz
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);
submitButton.addEventListener("click", submitQuiz);
reviewButton.addEventListener("click", () => location.reload());

function startQuiz() {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const questionData = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h3>${currentQuestionIndex + 1}. ${questionData.question}</h3>
        ${questionData.options.map((option, index) => `
            <div class="option ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}" 
                 onclick="selectAnswer('${option}')">${option}</div>
        `).join("")}
    `;
    prevButton.style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
    nextButton.style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";
    submitButton.style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    displayQuestion();
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === null) {
        alert("Please select an answer before proceeding.");
        return;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function prevQuestion() {
    currentQuestionIndex--;
    displayQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    if (userAnswers.includes(null)) {
        alert("Please answer all questions before submitting.");
        return;
    }

    clearInterval(timer);
    calculateScore();
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
}

function calculateScore() {
    score = userAnswers.filter((answer, index) => answer === quizData[index].correctAnswer).length;
    scoreElement.textContent = `${score} / ${quizData.length}`;
}
