export function startQuiz(container) {
  const questions = [
    // Mukuru-themed questions
    { 
      question: "What service does Mukuru primarily offer?", 
      options: ["Online Shopping","Money Transfers","Ride Hailing","Food Delivery"], 
      answer: "Money Transfers" 
    },
    { 
      question: "Which continent does Mukuru mainly operate in?", 
      options: ["Asia","Europe","Africa","South America"], 
      answer: "Africa" 
    },
    { 
      question: "Mukuru allows users to send money to?", 
      options: ["Family and Friends","Companies only","Banks only","Government"], 
      answer: "Family and Friends" 
    },
    { 
      question: "Mukuru transactions can be picked up in?", 
      options: ["Only in South Africa","Multiple countries in Africa","Anywhere in the world","Online only"], 
      answer: "Multiple countries in Africa" 
    },
    // Bonus South Africa question
    { 
      question: "Which city is known as the largest economic hub in South Africa?", 
      options: ["Cape Town","Johannesburg","Durban","Pretoria"], 
      answer: "Johannesburg" 
    }
  ];

  // Pick 4 random questions from the array
  function getRandomQuestions(arr, n) {
    let shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  const selectedQuestions = getRandomQuestions(questions, 4);

  // Build quiz UI
  container.innerHTML = `
    <div class="mukuru-card">
      <div class="card-header">
        <h1>Mukuru Quiz</h1>
        <p>Answer the questions to succeed! 💰</p>
      </div>
      <div class="card-content">
        <div class="progress-container">
          <div class="progress-bar" id="progress-bar"></div>
        </div>
        <form id="quizForm">
          <div id="question-container"></div>
          <button type="submit">Next</button>
        </form>
        <p id="result"></p>
      </div>
    </div>
  `;

  const containerEl = container.querySelector('#question-container');
  const progressBar = container.querySelector('#progress-bar');
  const resultEl = container.querySelector('#result');
  const form = container.querySelector('#quizForm');

  let currentQuestion = 0;
  let score = 0;

  function showQuestion() {
    containerEl.innerHTML = "";
    const q = selectedQuestions[currentQuestion];
    const p = document.createElement('p');
    p.textContent = `${currentQuestion + 1}. ${q.question}`;
    containerEl.appendChild(p);

    q.options.forEach(opt => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = opt;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      containerEl.appendChild(label);
      containerEl.appendChild(document.createElement('br'));
    });

    progressBar.style.width = `${(currentQuestion / selectedQuestions.length) * 100}%`;
  }

  showQuestion();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = container.querySelector('input[name="answer"]:checked');
    if (!selected) return alert("Please select an answer.");

    if (selected.value === selectedQuestions[currentQuestion].answer) score++;

    currentQuestion++;

    if (currentQuestion < selectedQuestions.length) {
      showQuestion();
    } else {
      progressBar.style.width = '100%';

      const percentCorrect = (score / selectedQuestions.length) * 100;
      let pointsEarned = 0;

      if (percentCorrect === 100) {
        pointsEarned = 2;
        resultEl.textContent = `🎉 Perfect! You got all ${score}/${selectedQuestions.length} correct! +2 points`;
      } else if (percentCorrect >= 70) {
        pointsEarned = 1;
        resultEl.textContent = `🎉 Good job! You got ${score}/${selectedQuestions.length} correct! +1 point`;
      } else {
        pointsEarned = 0;
        resultEl.textContent = `❌ You got ${score}/${selectedQuestions.length} correct. 0 points`;
      }

      containerEl.innerHTML = "";
      form.querySelector('button').style.display = 'none';

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "landingpage.html";
      }, 2000);
    }
  });
}
