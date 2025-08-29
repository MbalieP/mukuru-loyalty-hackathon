const questions = [
  { question: "Capital of South Africa?", options: ["Pretoria","Johannesburg","Cape Town","Durban"], answer:"Pretoria" },
  { question: "National animal?", options: ["Springbok","Lion","Elephant","Rooibok"], answer:"Springbok" },
  { question: "National flower?", options: ["Protea","Rose","Lily","Orchid"], answer:"Protea" },
  { question: "Ocean to the south?", options: ["Indian","Atlantic","Southern","Pacific"], answer:"Indian" },
  { question: "First democratic president in 1994?", options: ["Nelson Mandela","Thabo Mbeki","Cyril Ramaphosa","FW de Klerk"], answer:"Nelson Mandela" },
  { question: "Largest city?", options: ["Cape Town","Durban","Johannesburg","Pretoria"], answer:"Johannesburg" }
];

// Random 4 questions
function getRandomQuestions(arr, n) {
  let shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const selectedQuestions = getRandomQuestions(questions, 4);

const container = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const resultEl = document.getElementById('result');
let currentQuestion = 0;
let score = 0;

// Show a single question
function showQuestion() {
  container.innerHTML = "";
  const q = selectedQuestions[currentQuestion];
  const p = document.createElement('p');
  p.textContent = `${currentQuestion+1}. ${q.question}`;
  container.appendChild(p);

  q.options.forEach(opt => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = opt;
    label.appendChild(input);
    label.appendChild(document.createTextNode(opt));
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });

  progressBar.style.width = `${(currentQuestion/selectedQuestions.length)*100}%`;
}

showQuestion();

// Handle next/submit
document.getElementById('quizForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer.");

  if (selected.value === selectedQuestions[currentQuestion].answer) score++;

  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    progressBar.style.width = '100%';
    const successThreshold = Math.ceil(selectedQuestions.length * 0.8);
    if (score >= successThreshold) {
      resultEl.textContent = `🎉 Success! You got ${score}/${selectedQuestions.length} correct!`;
    } else {
      resultEl.textContent = `❌ You got ${score}/${selectedQuestions.length} correct. Try again!`;
    }
    container.innerHTML = ""; // remove question after completion
    e.target.querySelector('button').style.display = 'none';
  }
});
