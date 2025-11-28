// Simple Quiz logic
const questions = [
  {
    q: 'Which language is primarily used for web page structure?',
    choices: ['Python','HTML','Java','C++'],
    answer: 1
  },
  {
    q: 'Which tag is used for JavaScript in HTML?',
    choices: ['<script>','<js>','<code>','<source>'],
    answer: 0
  },
  {
    q: 'Which CSS property changes text color?',
    choices: ['background','color','font-style','margin'],
    answer: 1
  },
  {
    q: 'What does "DOM" stand for?',
    choices: ['Document Object Model','Display Object Model','Data Object Map','Digital Object Manager'],
    answer: 0
  },
  {
    q: 'Which method adds an element at the end of an array in JavaScript?',
    choices: ['push()','pop()','shift()','unshift()'],
    answer: 0
  }
];

let current = 0;
let score = 0;

const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const progressEl = document.getElementById('progress');
const resultText = document.getElementById('result-text');
const retryBtn = document.getElementById('retryBtn');

function startQuiz(){
  current = 0;
  score = 0;
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion(){
  const item = questions[current];
  questionEl.textContent = item.q;
  choicesEl.innerHTML = '';
  item.choices.forEach((c,i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.innerText = c;
    btn.onclick = () => select(i, btn);
    choicesEl.appendChild(btn);
  });
  progressEl.textContent = `${current+1} / ${questions.length}`;
  nextBtn.disabled = true;
}

function select(i, btn){
  const item = questions[current];
  // disable all choices
  Array.from(choicesEl.children).forEach(b => b.onclick = null);
  // mark correct/wrong
  if(i === item.answer){
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    // reveal correct
    const correctBtn = Array.from(choicesEl.children)[item.answer];
    correctBtn.classList.add('correct');
  }
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  current++;
  if(current >= questions.length){
    finish();
  } else {
    showQuestion();
  }
}

function finish(){
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  resultText.innerHTML = `You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.`;
}

retryBtn.onclick = () => startQuiz();
startBtn.onclick = () => startQuiz();
