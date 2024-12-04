const time = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const progressBar = document.getElementById("progress-bar");

var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
  setTimeout(() => {
    x.pause();
    resetBtn.click(); 
  }, 5000); 
}

function pauseAudio() {
  x.pause();
}

let totalTime = 0;
let interval = null;
let initialTime = 0; 

function updateProgressBar() {
  const progress = (totalTime / initialTime) * 100; 
  progressBar.style.width = `${progress}%`; 
  progressBar.innerHTML = `<h1 class="tm">${Math.floor(progress)}%</h1>`;
}

startBtn.addEventListener("click", () => {
  const h = parseInt(hours.value) || 0;
  const m = parseInt(minutes.value) || 0;
  const s = parseInt(seconds.value) || 0;

  totalTime = h * 3600 + m * 60 + s;
  console.log("Total time in seconds:", totalTime);

  initialTime = totalTime; 

  if (totalTime > 0) {
    interval = setInterval(() => {
      totalTime -= 1;
      showTime(totalTime);
      updateProgressBar(); 

      if (totalTime <= 0) {
        playAudio();
        clearInterval(interval);
      }
    }, 1000);
  } else {
    resetBtn.click(); 
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  pauseAudio();
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  totalTime = 0;
  initialTime = 0;
  pauseAudio();
  showTime(totalTime);
  progressBar.style.width = "0%"; 
});

function showTime(totalTime) {
  const h = Math.floor(totalTime / 3600);
  const m = Math.floor((totalTime / 60) % 60);
  const s = Math.floor(totalTime % 60);

  hours.value = `${h.toString().padStart(2, "0")}`;
  minutes.value = `${m.toString().padStart(2, "0")}`;
  seconds.value = `${s.toString().padStart(2, "0")}`;
}


const tms = document.querySelectorAll(".tm");
console.log(tms);