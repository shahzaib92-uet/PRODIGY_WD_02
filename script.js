let startTime, updatedTime, difference, tInterval, running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTimer, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00.00";
    lapsList.innerHTML = "";
    lapCounter = 0;
}

function updateTimer() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 10);
    let seconds = parseInt((time / 1000) % 60);
    let minutes = parseInt((time / (1000 * 60)) % 60);
    let hours = parseInt((time / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function addLap() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(updatedTime);
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
