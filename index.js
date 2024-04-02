const questions = [
  {
    question: "Which is the largest animal in the world? ",
    answer: [
      { text: "Shark", correct: "false" },
      { text: "Elephant", correct: "true" },
      { text: "Blue whale", correct: "false" },
      { text: "Giraffe", correct: "false" },
    ],
  },
  {
    question: 'Who wrote the novel "1984"?',
    answer: [
      { text: "George Orwell", correct: "true" },
      { text: "J.K. Rowling", correct: "false" },
      { text: "F. Scott Fitzgerald", correct: "false" },
      { text: "Ernest Hemingway", correct: "false" },
    ],
  },
  {
    question: "What is the capital city of Australia?",
    answer: [
      { text: "Sydney", correct: "false" },
      { text: "Melbourne", correct: "false" },
      { text: "Canberra", correct: "true" },
      { text: "Brisbane", correct: "false" },
    ],
  },
  {
    question: "Which is the largest animal in the world?",
    answer: [
      { text: "Shark", correct: "false" },
      { text: "Elephant", correct: "true" },
      { text: "Blue whale", correct: "false" },
      { text: "Giraffe", correct: "false" },
    ],
  },
  {
    question: "What is the chemical symbol for Gold?",
    answer: [
      { text: "Gd", correct: "false" },
      { text: "Go", correct: "false" },
      { text: "Ag", correct: "false" },
      { text: "Au", correct: "true" },
    ],
  },
  {
    question: "In what year was the first iPhone released?",
    answer: [
      { text: "2005", correct: "false" },
      { text: "2007", correct: "true" },
      { text: "2008", correct: "false" },
      { text: "2010", correct: "false" },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-question");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //show answer
  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

const selectAnswer = (e) => {
  const selectButton = e.target;
  const isCorrect = selectButton.dataset.correct === "true";
  if (isCorrect) {
    selectButton.classList.add("correct");
    score++;
  } else {
    selectButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
