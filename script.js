let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', addLap);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

function startStop() {
    if (isRunning) {
        stop();
    } else {
        start();
    }
}

function start() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
    startStopBtn.textContent = 'Stop';
    lapBtn.disabled = false;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 1;
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    startStopBtn.textContent = 'Start';
    stopBtn.disabled = true;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();

    display.textContent = 
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}:` +
        `${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
}

function addLap() {
    const lapTime = display.textContent;
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    laps.appendChild(lapElement);
}
