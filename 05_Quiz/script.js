document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("choices-list");
  const nextButton = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreText = document.getElementById("score");
  const restartButton = document.getElementById("restart-btn");
  const startButton = document.getElementById("start-btn");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];
  let currentQuestionIndex = 0;
  let score = 0;

  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startButton.classList.remove("hidden");
    startQuiz();
  });

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreText.textContent = `${score} out of ${questions.length}`;
  }

  function startQuiz() {
    startButton.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }
  function showQuestion() {
    nextButton.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = ""; // Clear previous options
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(choice, li));
      optionsContainer.appendChild(li);
    });
  }
  function selectAnswer(selectedChoice, selectedLi) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const allOptions = optionsContainer.querySelectorAll("li");

    // Disable further clicks on any option
    allOptions.forEach((li) => {
      li.style.pointerEvents = "none";
    });

    // Check if the user's choice was correct
    if (selectedChoice === correctAnswer) {
      score++;
      // Add 'correct' class to the selected option
      selectedLi.classList.add("correct");
    } else {
      // If incorrect, add 'incorrect' class to the selected option
      selectedLi.classList.add("incorrect");
      // And also highlight the correct answer
      allOptions.forEach((li) => {
        if (li.textContent === correctAnswer) {
          li.classList.add("correct");
        }
      });
    }
    nextButton.classList.remove("hidden");
  }
});
