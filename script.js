let timerIdStudy = 0;
let timerIdRest = 0;
let studyTime = 0;
let restTime = 0;
let rounds = 0;

const startButton = document.querySelector('#start');
const countdown = document.querySelector('#countdown');
const description = document.querySelector('#description');
const signal = document.querySelector('#signal');
const complete = document.querySelector('#complete');

startButton.addEventListener('click', timer);

function timer(){
    const pomodoroTime =  Number(document.querySelector('#pomodoro_time').value);
    const breakTime = Number(document.querySelector('#rest_time').value);
    const roundsAmount = Number(document.querySelector('#pomodoro_rounds').value);

    studyTime = pomodoroTime * 60;
    console.log(studyTime);
    restTime = breakTime * 60;
    console.log(restTime);
    timerIdStudy = setInterval(startStudyCountdown, 1000);

    function startStudyCountdown(){

        let studyMinutes = Math.floor(studyTime / 60);
        let studySeconds = studyTime%60;

        if(studyMinutes < 10){
            studyMinutes = "0"+studyMinutes;
        }
        if(studySeconds < 10){
            studySeconds = "0"+studySeconds;
        }

        if(studyTime < 10){
            signal.play();
        }

        countdown.textContent = `00:${studyMinutes}:${studySeconds}`;
        description.textContent = 'WORK';

        studyTime--;

        if(studyTime < 0){
            studyTime = 0;
            stopStudyCountdown();
            restTimer();
        }
    }

    function stopStudyCountdown(){
        clearInterval(timerIdStudy);
    }

    function restTimer(){
        rounds++;

        if(rounds === roundsAmount) {
            countdown.textContent = `00:00:00`;
            description.textContent = 'SESSION IS COMPLETE! 🎉';
            complete.play();
            return false;
        }

        timerIdRest = setInterval(startRestCountdown, 1000);
    }

    function startRestCountdown(){
        
        let restMinutes = Math.floor(restTime / 60);
        let restSeconds = restTime%60;

        if(restMinutes < 10){
            restMinutes = "0"+restMinutes;
        }
        if(restSeconds < 10){
            restSeconds = "0"+restSeconds;
        }

        if(restTime < 10){
            signal.play();
        }

        countdown.textContent = `00:${restMinutes}:${restSeconds}`;
        description.textContent = 'REST';

        restTime--;

        if(restTime < 0){
            restTime = 0;
            stopRestCountdown();
            timer();
        }
    }

    function stopRestCountdown(){
        clearInterval(timerIdRest);
    }

}































/*window.addEventListener('click', function (event) {
    console.log('Клик!')
}, { once: true })*/