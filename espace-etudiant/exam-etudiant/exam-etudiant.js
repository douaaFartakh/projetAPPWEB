window.onload = function () {
    const username = localStorage.getItem("username");
    const userRole = localStorage.getItem("userRole");

    if (username) {
        document.getElementById("username").textContent = username;
    }

    if (userRole === "teacher") {
        window.location.href = "page-cree-examen.html";
    }

    loadExam();
};

function toggleMenu() {
    const dropdown = document.getElementById("userDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    window.location.href = "form.html";
}

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 0;
let userAnswers = [];

const examTitle = document.getElementById("exam-title");
const questionText = document.getElementById("question-text");
const mediaDisplay = document.getElementById("media-display");
const optionsContainer = document.getElementById("options");
const directAnswerInput = document.getElementById("direct-answer");
const timerDisplay = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultBtn = document.getElementById("result-btn");
const noQuestionsMessage = document.getElementById("no-questions-message");

function loadExam() {
    const examData = JSON.parse(localStorage.getItem("examData")) || { title: "Examen", questions: [] };
    examTitle.textContent = examData.title || "Examen";
    questions = examData.questions || [];
    userAnswers = new Array(questions.length).fill(null);

    console.log("Questions récupérées:", questions);

    if (questions.length === 0) {
        noQuestionsMessage.style.display = "block";
    } else {
        document.getElementById("timer").style.display = "block";
        document.getElementById("question-container").style.display = "block";
        document.getElementById("next-btn").style.display = "block";
        displayQuestion();
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showCompletion();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.enonce;
    mediaDisplay.innerHTML = question.media !== "Aucun" ? `<p><strong>Fichier:</strong> ${question.media}</p>` : "";
    optionsContainer.innerHTML = "";
    directAnswerInput.style.display = "none";
    directAnswerInput.value = "";
    nextBtn.disabled = true;

    timeLeft = parseInt(question.duree) || 30;
    timerDisplay.textContent = timeLeft;

    if (question.type === "qcm") {
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.addEventListener("click", () => selectOption(option, button));
            optionsContainer.appendChild(button);
        });
    } else if (question.type === "directe") {
        directAnswerInput.style.display = "block";
        directAnswerInput.addEventListener("input", () => {
            nextBtn.disabled = directAnswerInput.value.trim() === "";
        });
    }

    clearInterval(timer);
    startTimer();
}

function selectOption(selected, button) {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = selected;
    if (question.bonnes_reponses.split(",").includes(selected)) {
        score += parseInt(question.note) || 1;
    }
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.classList.remove("selected"));
    button.classList.add("selected");
    nextBtn.disabled = false;
    console.log("Answer selected: ", selected, "Current question: ", currentQuestionIndex);
}

function submitDirectAnswer() {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    const answer = directAnswerInput.value.trim();
    userAnswers[currentQuestionIndex] = answer;
    const expected = question.reponse;
    const tolerance = parseInt(question.tolerance) / 100 || 0;
    let isCorrect = false;

    if (isNaN(answer) || isNaN(expected)) {
        isCorrect = answer.toLowerCase() === expected.toLowerCase();
    } else {
        const numAnswer = parseFloat(answer);
        const numExpected = parseFloat(expected);
        isCorrect = Math.abs(numAnswer - numExpected) / numExpected <= tolerance;
    }

    if (isCorrect) {
        score += parseInt(question.note) || 1;
    }
    nextBtn.disabled = false;
    console.log("Direct answer submitted: ", answer, "Current question: ", currentQuestionIndex);
}

function startTimer() {
    clearInterval(timer);
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (questions[currentQuestionIndex].type === "directe" && directAnswerInput.value.trim()) {
                submitDirectAnswer();
            } else {
                userAnswers[currentQuestionIndex] = null;
                goToNextQuestion();
            }
            console.log("Timer ended, moving to next question...");
        }
    }, 1000);
}

function goToNextQuestion() {
    if (questions[currentQuestionIndex].type === "directe" && directAnswerInput.value.trim()) {
        submitDirectAnswer();
    }
    currentQuestionIndex++;
    console.log("Moving to next question, new index: ", currentQuestionIndex);
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showCompletion();
    }
}

function showCompletion() {
    clearInterval(timer);
    document.getElementById("question-container").style.display = "none";
    document.getElementById("timer").style.display = "none";
    nextBtn.style.display = "none";
    resultContainer.style.display = "block";

    localStorage.setItem("examScore", score);
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem("totalPoints", questions.reduce((sum, q) => sum + (parseInt(q.note) || 1), 0));

    console.log("Exam finished, score: ", score, "out of", questions.reduce((sum, q) => sum + (parseInt(q.note) || 1), 0));
}

nextBtn.addEventListener("click", () => {
    console.log("Next question button clicked");
    goToNextQuestion();
});

resultBtn.addEventListener("click", () => {
    console.log("Show result button clicked");
    window.location.href = "page-résultat.html";
});