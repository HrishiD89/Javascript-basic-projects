const toggleBtn = document.getElementById("togglebutton");
const resetBtn = document.getElementById("resetBtn");
const timer = document.getElementById("timer");
const title = document.querySelector("title");

let elapsedTime = 0;
let startTime = 0;
let timeInterval = null;
let isRunning = false;

toggleBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timeInterval);
    isRunning = false;
    toggleBtn.textContent = "Start";
    toggleBtn.style.backgroundColor = "#bea6e4";
  } else {
    startTime = Date.now() - elapsedTime;
    toggleBtn.textContent = "Stop";
    toggleBtn.style.backgroundColor = "#de7575";
    isRunning = true;
    timeInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      showTime(elapsedTime);
    }, 10);
  }
});

resetBtn.addEventListener("click", () => {
  isRunning = false;
  toggleBtn.textContent = "Start";
  toggleBtn.style.backgroundColor = "#bea6e4";
  elapsedTime = 0;
  startTime = 0;
  clearInterval(timeInterval);
  showTime(elapsedTime);
});

function showTime(time) {
  const ms = Math.floor((time % 1000) / 10);
  const s = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / (1000 * 60)) % 60);
  const hr = Math.floor((time / (1000 * 60 * 60)) % 24);

  timer.innerHTML =  `${hr.toString().padStart(2,"0")}h:${min
    .toString()
    .padStart(2,"0")}m:${s.toString().padStart(2,"0")}s:${ms
    .toString()
    .padStart(2,"0")}ms` + `<span id="next-clock"></span>`;
}
