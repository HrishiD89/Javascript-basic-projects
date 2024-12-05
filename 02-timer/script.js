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
  progressBar.innerHTML = `<h1 class="tm">Timer</h1>`;
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
  hours.value = "";
  minutes.value = "";
  seconds.value = "";
  seconds.focus();
  seconds.setSelectionRange(seconds.value.length, seconds.value.length);
  progressBar.style.width = "100%"; 
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

document.addEventListener('DOMContentLoaded', function(e) {
  // Set focus to the seconds input and move the cursor to the end
  seconds.focus();
  seconds.setSelectionRange(seconds.value.length, seconds.value.length);
}, true);

// Loop through all tm inputs
tms.forEach(input => {
  input.addEventListener("input", function() {
    handleInputChange(this);
  });

  input.addEventListener("keydown", function(event) {
    handleKeyDown(event, this);
  });
});

// Handle input changes
function handleInputChange(input) {
  let value = input.value;

  // Allow only numbers and strip out any non-digit characters
  value = value.replace(/\D/g, '');

  // If the value is less than 60, update the input; otherwise, show an alert
    input.value = value; // Update input value

  // Focus change when the input length reaches max (2 digits)
  if (value.length === input.maxLength) {
    moveToNextInput(input);
  }
}


// Handle backspace and focus change
function handleKeyDown(event, input) {
  // If the user presses Backspace and the input is empty, move to the previous input
  if (event.key === "Backspace" && input.value === "") {
    moveToPreviousInput(input);
  }
}

// Move focus to the next input
function moveToNextInput(currentInput) {
  const nextInput = getNextInput(currentInput);
  if (nextInput) {
    nextInput.focus();
    // nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
  }
}

// Move focus to the previous input
function moveToPreviousInput(currentInput) {
  const previousInput = getPreviousInput(currentInput);
  if (previousInput) {
    previousInput.focus();
  }
}

// Get the next input element
function getNextInput(currentInput) {
  const index = Array.from(tms).indexOf(currentInput);
  if (index > 0) {
    return tms[index - 1] || null; // Return the next input or null if none
  }
}

// Get the previous input element
function getPreviousInput(currentInput) {
  const index = Array.from(tms).indexOf(currentInput);
  if (index < tms.length - 1) {
    return tms[index + 1] || null; // Return the previous input or null if none
  }
}