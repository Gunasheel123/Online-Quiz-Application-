const questions = [
  {q: "Which planet is known as the “Red Planet”?", options:["Venus","Mars","Jupiter","Mercury"], answer:1},
  {q: "Who wrote the famous play “Romeo and Juliet”?", options:["Charles Dickens","William Shakespeare","George Bernard Shaw","Oscar Wilde"], answer:1},
  {q: "Which gas is most abundant in the Earth’s atmosphere?", options:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], answer:1},
  {q: "Which element has the chemical symbol Fe?", options:["Fluorine","Iron","Francium","Feldspar"], answer:1},
  {q: "Which country gifted the Statue of Liberty to the United States?", options:["France","Italy","Germany","Spain"], answer:0},
  {q: "Who was the first person to walk on the Moon?", options:["Neil Armstrong","Yuri Gagarin","Buzz Aldrin","John Glenn"], answer:0},
  {q: "What is the hardest natural substance on Earth?", options:["Gold","Iron","Diamond","Quartz"], answer:2},
  {q: "Who invented the telephone?", options:["Guglielmo Marconi","Nikola Tesla","Thomas Edison","Alexander Graham Bell"], answer:3},
  {q: "Which continent has the most countries?", options:["Asia","Europe","Africa","South Africa"], answer:2},
  {q: "How many players are there in a cricket team?", options:["9","10","11","12"], answer:2}
];

let currentQ = 0, score = 0;
let answers = {};
let totalTime = 300; // 5 minutes
let totalTimer;

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const resultEl = document.getElementById("result");
const feedbackEl = document.getElementById("feedback");
const restartBtn = document.getElementById("restartBtn");
const confirmOverlay = document.getElementById("confirmOverlay");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function loadQuestion() {
  if (currentQ < questions.length) {
    let q = questions[currentQ];
    quizEl.innerHTML = `<div class='question'>${currentQ+1}. ${q.q}</div>`;
    let opts = "";
    q.options.forEach((opt,i)=>{
      let checked = answers[currentQ] === i ? "checked" : "";
      opts += `<label><input type='radio' name='option' value='${i}' ${checked}> ${opt}</label>`;
    });
    quizEl.innerHTML += `<div class='options'>${opts}</div>`;

    document.querySelectorAll("input[name='option']").forEach(opt => {
      opt.addEventListener("change", (e)=>{
        answers[currentQ] = parseInt(e.target.value);
      });
    });

  } else {
    showResult();
  }

  // manage button visibility
  backBtn.style.display = currentQ === 0 ? "none" : "inline-block";
  nextBtn.textContent = currentQ === questions.length-1 ? "Finish" : "Next";
}

function startTotalTimer() {
  totalTimer = setInterval(()=>{
    totalTime--;
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    document.getElementById("totalTime").innerText = 
      `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    if (totalTime <= 0) {
      clearInterval(totalTimer);
      showResult();
    }
  },1000);
}

// ✅ FIXED: single event listener for Next button
nextBtn.addEventListener("click", ()=>{
  if (currentQ < questions.length - 1) {
    currentQ++;
    loadQuestion();
  } else {
    // Show custom confirm overlay at the end only
    confirmOverlay.style.display = "flex";
  }
});

backBtn.addEventListener("click", ()=>{
  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
});

// ✅ Confirm overlay handlers
yesBtn.addEventListener("click", ()=>{
  confirmOverlay.style.display = "none";
  showResult();
});

noBtn.addEventListener("click", ()=>{
  confirmOverlay.style.display = "none"; // just close overlay
});

function showResult() {
  clearInterval(totalTimer);
  quizEl.style.display="none";
  nextBtn.style.display="none";
  backBtn.style.display="none";

  // calculate score
  score = 0;
  questions.forEach((q,i)=>{
    if (answers[i] === q.answer) score++;
  });

  let percent = (score/questions.length)*100;
  resultEl.innerHTML = `You scored ${score}/${questions.length} (${percent.toFixed(2)}%)`;
  feedbackEl.style.display="block";
}

document.getElementById("submitFeedback").addEventListener("click", ()=>{
  let fb = document.getElementById("feedbackText").value;
  alert("Thanks for your feedback!\nYour response: " + fb);
});

restartBtn.addEventListener("click", ()=>{
  location.reload();
});

// Start Quiz
loadQuestion();
startTotalTimer();
