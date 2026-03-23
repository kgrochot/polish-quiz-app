const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");
const answersContainer = document.getElementById("answers-container");
const explanationEl = document.getElementById("explanation");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const maxScoreEl = document.getElementById("max-score");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false; // um zu kontrollieren, dass Score nur einmal gezählt wird

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);
nextBtn.addEventListener("click", handleNext);

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    totalQuestions.textContent = quizQuestions.length;
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionNumber.textContent = currentQuestionIndex + 1;
    explanationEl.textContent = "";
    selectedAnswer = null;
    answered = false;
    nextBtn.disabled = true;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;

        button.addEventListener("click", () => {
            // Erklärung anzeigen
            explanationEl.innerHTML = answer.explanation || "Keine Erklärung verfügbar";

            // markiere korrekt/falsch
            button.classList.remove("wrong", "correct"); // vorherige entfernen
            if (answer.correct) {
                button.classList.add("correct");
            } else {
                button.classList.add("wrong");
            }

            // Score nur einmal zählen beim ersten Klick
            if (!answered) {
                selectedAnswer = answer;
                answered = true;
            }

            nextBtn.disabled = false; // Weiter aktivieren
        });

        answersContainer.appendChild(button);
    });

    updateProgress();
}

function handleNext() {
    if (!selectedAnswer) return;

    // Score erhöhen, falls korrekt
    if (selectedAnswer.correct) score++;

    // Nächste Frage
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreEl.textContent = score;
    maxScoreEl.textContent = quizQuestions.length;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
    nextBtn.disabled = true;
}

function updateProgress() {
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressEl.style.width = progressPercent + "%";
}

// === Hier kommen deine Fragen ===

const quizQuestions = [
  {
    question: "Wie sagt man auf Polnisch: Hallo / Hi?",
    answers: [
      { text: "Cześć", correct: true },
      { text: "Dziękuję", correct: false, explanation: "Das bedeutet 'Danke'" },
      { text: "Proszę", correct: false, explanation: "Das bedeutet 'Bitte'" },
      { text: "Tak", correct: false, explanation: "Das bedeutet 'Ja'" },
    ],
  },
  {
    question: "Wie sagt man: Danke?",
    answers: [
      { text: "Proszę", correct: false, explanation: "Das bedeutet 'Bitte'" },
      { text: "Dziękuję", correct: true },
      { text: "Przepraszam", correct: false, explanation: "Das bedeutet 'Entschuldigung'" },
      { text: "Nie", correct: false, explanation: "Das bedeutet 'Nein'" },
    ],
  },
  {
    question: "Wie sagt man: Bitte / Gern geschehen?",
    answers: [
      { text: "Proszę", correct: true },
      { text: "Tak", correct: false, explanation: "Das bedeutet 'Ja'" },
      { text: "Nie", correct: false, explanation: "Das bedeutet 'Nein'" },
      { text: "Pomocy!", correct: false, explanation: "Das bedeutet 'Hilfe!'" },
    ],
  },
  {
    question: "Wie sagt man: Ja?",
    answers: [
      { text: "Nie", correct: false, explanation: "Das bedeutet 'Nein'" },
      { text: "Tak", correct: true },
      { text: "Cześć", correct: false, explanation: "Das bedeutet 'Hallo'" },
      { text: "Do widzenia", correct: false, explanation: "Das bedeutet 'Auf Wiedersehen'" },
    ],
  },
  {
    question: "Wie sagt man: Nein?",
    answers: [
      { text: "Tak", correct: false, explanation: "Das bedeutet 'Ja'" },
      { text: "Nie", correct: true },
      { text: "Proszę", correct: false, explanation: "Das bedeutet 'Bitte'" },
      { text: "Dziękuję", correct: false, explanation: "Das bedeutet 'Danke'" },
    ],
  },
  {
    question: "Wie sagt man: Guten Tag?",
    answers: [
      { text: "Dobry wieczór", correct: false, explanation: "Das bedeutet 'Guten Abend'" },
      { text: "Dzień dobry", correct: true },
      { text: "Dobranoc", correct: false, explanation: "Das bedeutet 'Gute Nacht'" },
      { text: "Cześć", correct: false, explanation: "Das ist eher informell ('Hi')" },
    ],
  },
  {
    question: "Wie sagt man: Guten Abend?",
    answers: [
      { text: "Dzień dobry", correct: false, explanation: "Das bedeutet 'Guten Tag'" },
      { text: "Dobry wieczór", correct: true },
      { text: "Dobranoc", correct: false, explanation: "Das bedeutet 'Gute Nacht'" },
      { text: "Do widzenia", correct: false, explanation: "Das bedeutet 'Auf Wiedersehen'" },
    ],
  },
  {
    question: "Wie sagt man: Auf Wiedersehen?",
    answers: [
      { text: "Cześć", correct: false, explanation: "Das bedeutet 'Hallo / Tschüss informell'" },
      { text: "Do widzenia", correct: true },
      { text: "Proszę", correct: false, explanation: "Das bedeutet 'Bitte'" },
      { text: "Tak", correct: false, explanation: "Das bedeutet 'Ja'" },
    ],
  },
  {
    question: "Wie sagt man: Entschuldigung / Sorry?",
    answers: [
      { text: "Przepraszam", correct: true },
      { text: "Dziękuję", correct: false, explanation: "Das bedeutet 'Danke'" },
      { text: "Pomocy!", correct: false, explanation: "Das bedeutet 'Hilfe!'" },
      { text: "Tak sobie", correct: false, explanation: "Das bedeutet 'So lala'" },
    ],
  },
  {
    question: "Wie sagt man: Wie geht es dir?",
    answers: [
      { text: "Jak się masz?", correct: true },
      { text: "Ile to kosztuje?", correct: false, explanation: "Das bedeutet 'Wie viel kostet das?'" },
      { text: "Skąd jesteś?", correct: false, explanation: "Das bedeutet 'Woher kommst du?'" },
      { text: "Mówisz po angielsku?", correct: false, explanation: "Das bedeutet 'Sprichst du Englisch?'" },
    ],
  },
  {
    question: "Wie sagt man: Ich heiße…?",
    answers: [
      { text: "Mam na imię…", correct: true },
      { text: "Jestem z…", correct: false, explanation: "Das bedeutet 'Ich komme aus…'" },
      { text: "Mam … lat", correct: false, explanation: "Das bedeutet 'Ich bin … Jahre alt'" },
      { text: "Chcę…", correct: false, explanation: "Das bedeutet 'Ich möchte…'" },
    ],
  },
  {
    question: "Wie sagt man: Wie viel kostet das?",
    answers: [
      { text: "Gdzie jest toaleta?", correct: false, explanation: "Das bedeutet 'Wo ist die Toilette?'" },
      { text: "Ile to kosztuje?", correct: true },
      { text: "Co to jest?", correct: false, explanation: "Das bedeutet 'Was ist das?'" },
      { text: "Kiedy?", correct: false, explanation: "Das bedeutet 'Wann?'" },
    ],
  },
  {
    question: "Wie sagt man: Wo ist die Toilette?",
    answers: [
      { text: "Gdzie jest toaleta?", correct: true },
      { text: "Gdzie jest sklep?", correct: false, explanation: "Das bedeutet 'Wo ist der Laden?'" },
      { text: "Gdzie jest hotel?", correct: false, explanation: "Das bedeutet 'Wo ist das Hotel?'" },
      { text: "Gdzie jesteś?", correct: false, explanation: "Das bedeutet 'Wo bist du?'" },
    ],
  },
  {
    question: "Wie sagt man: Hilfe!",
    answers: [
      { text: "Pomocy!", correct: true },
      { text: "Stop!", correct: false, explanation: "Das ist Englisch" },
      { text: "Czekaj!", correct: false, explanation: "Das bedeutet 'Warte!'" },
      { text: "Biegnij!", correct: false, explanation: "Das bedeutet 'Lauf!'" },
    ],
  },
  {
    question: "Wie sagt man: So lala?",
    answers: [
      { text: "Bardzo dobrze", correct: false, explanation: "Das bedeutet 'Sehr gut'" },
      { text: "Tak sobie", correct: true },
      { text: "Źle", correct: false, explanation: "Das bedeutet 'Schlecht'" },
      { text: "Super", correct: false, explanation: "Das bedeutet 'Super'" },
    ],
  },
  {
    question: "Wie sagt man: Sehr gut?",
    answers: [
      { text: "Tak sobie", correct: false, explanation: "Das bedeutet 'So lala'" },
      { text: "Bardzo dobrze", correct: true },
      { text: "Źle", correct: false, explanation: "Das bedeutet 'Schlecht'" },
      { text: "Mało", correct: false, explanation: "Das bedeutet 'Wenig'" },
    ],
  },
  {
    question: "Wie sagt man: Woher kommst du?",
    answers: [
      { text: "Skąd jesteś?", correct: true },
      { text: "Gdzie mieszkasz?", correct: false, explanation: "Das bedeutet 'Wo wohnst du?'" },
      { text: "Kim jesteś?", correct: false, explanation: "Das bedeutet 'Wer bist du?'" },
      { text: "Co robisz?", correct: false, explanation: "Das bedeutet 'Was machst du?'" },
    ],
  },
  {
    question: "Wie sagt man: Sprichst du Englisch?",
    answers: [
      { text: "Mówisz po angielsku?", correct: true },
      { text: "Rozumiesz?", correct: false, explanation: "Das bedeutet 'Verstehst du?'" },
      { text: "Pomóż mi", correct: false, explanation: "Das bedeutet 'Hilf mir'" },
      { text: "Pracujesz tutaj?", correct: false, explanation: "Das bedeutet 'Arbeitest du hier?'" },
    ],
  },
  {
    question: "Wie sagt man: Ich möchte Kaffee?",
    answers: [
      { text: "Piję kawę", correct: false, explanation: "Das bedeutet 'Ich trinke Kaffee'" },
      { text: "Poproszę kawę", correct: true },
      { text: "Lubię kawę", correct: false, explanation: "Das bedeutet 'Ich mag Kaffee'" },
      { text: "Robię kawę", correct: false, explanation: "Das bedeutet 'Ich mache Kaffee'" },
    ],
  },
  {
    question: "Wie sagt man: Bis später / Bis bald?",
    answers: [
      { text: "Dobranoc", correct: false, explanation: "Das bedeutet 'Gute Nacht'" },
      { text: "Do zobaczenia", correct: true },
      { text: "Cześć", correct: false, explanation: "Kann auch 'Tschüss' informell sein" },
      { text: "Dziękuję", correct: false, explanation: "Das bedeutet 'Danke'" },
    ],
  },
];