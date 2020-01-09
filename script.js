// DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS 
// DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS 
// DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS DISPLAYS FUNCTIONS 
function transformTime (timeInMinutes) {
    let date = new Date(null);
    date.setMilliseconds(timeInMinutes*60*1000);
    displayTime = date.toISOString().substring(11,13) == 0 ? date.toISOString().substring(14,19) : date.toISOString().substring(11,19);
    return displayTime;
}

function fromClocktoMilliseconds (timeString) {
    let arr = timeString.split(":").reverse();
    s = Number(arr[0])*1000;
    m = (Number(arr[1])*60*1000) || 0;
    h = (Number(arr[2])*60*60*1000) || 0;
    return s + m + h;
}

function downArrow (e) {
    e.target.id == "minus_session" ? minusDisplaySession() : minusDisplayBreak();
}

function minusDisplaySession () {
    if (displaySession.innerHTML > 1 && timerOn == 0 ) {
        displaySession.innerHTML = Number(displaySession.innerHTML)-1;
        clock.innerHTML = transformTime(Number(displaySession.innerHTML));
    }
}

function minusDisplayBreak () {
    if (displayBreak.innerHTML > 1 && timerOn == 0 ) {
        displayBreak.innerHTML = Number(displayBreak.innerHTML)-1;
    }
}


function upArrow (e) {
    e.target.id == "plus_session" ? plusDisplaySession() : plusDisplayBreak();
}

function plusDisplaySession () {
    if ( timerOn == 0 ) {
        displaySession.innerHTML = Number(displaySession.innerHTML)+1;
        clock.innerHTML = transformTime(displaySession.innerHTML);
    }
}

function plusDisplayBreak () {
    if (timerOn == 0) {
        displayBreak.innerHTML = Number(displayBreak.innerHTML)+1;
    }
}

// END DISPLAYS END DISPLAYSEND DISPLAYS
// END DISPLAYS END DISPLAYSEND DISPLAYS
// END DISPLAYS END DISPLAYSEND DISPLAYS

function playClock() {
    if ( !timerOn ) {
        if (!timerOn) {
            timerOn = 1;
        }        
        let interval = 1000;
        let time = fromClocktoMilliseconds(clock.innerHTML)
        let expected = Date.now() + time + interval;
        timeID = setInterval(step,1000,expected,time);
    }
}

function step (expected,time) {
    let delta = (expected - Date.now())/1000/60;
    clock.innerHTML = transformTime(delta);
    if (delta*60*1000 < 1 ) {
        clearInterval(timeID);
        switchClock();
    }
}

function switchClock() {
    sessionClockFlag == 1 ? sessionClockFlag = 0 : sessionClockFlag = 1;
    let chooseClock = sessionClockFlag == 1 ? displaySession : displayBreak;
    let textChoice = sessionClockFlag == 1 ? "Session" : "Break"
    console.log(chooseClock);
    timerOn = 0;
    clock.innerHTML = transformTime(chooseClock.innerHTML);
    textDisplay.innerHTML = textChoice;
    playClock();
}

function stopClock () {
    pauseClock();
    clock.innerHTML = transformTime(displaySession.innerHTML);
    timerOn = 0;
}

function pauseClock () {
    clearInterval(timeID);
    timerOn = 0;
}

function reset () {
    if (timeID) clearInterval(timeID);
    timerOn = 0;
    clock.innerHTML = "25:00";
    displayBreak.innerHTML = "5";
    displaySession.innerHTML = "25";
}

let timerOn = 0;
let timeID = false;
let sessionClockFlag = 1;

const textDisplay = document.getElementById("session_break_display");
const clock = document.getElementById("clock");

const displaySession = document.getElementById("display_session");
document.getElementById("minus_session").addEventListener("click", downArrow);
document.getElementById("plus_session").addEventListener("click", upArrow);

const displayBreak = document.getElementById("display_break");
document.getElementById("minus_break").addEventListener("click", downArrow);
document.getElementById("plus_break").addEventListener("click", upArrow);

document.getElementById("play").addEventListener("click", playClock);
document.getElementById("stop").addEventListener("click", stopClock);
document.getElementById("pause").addEventListener("click", pauseClock);
document.getElementById("reset").addEventListener("click", reset);