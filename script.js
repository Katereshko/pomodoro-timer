let timerIdStudy = 0;
let timerIdRest = 0;
let studyTime = 0;
let restTime = 0;
let rounds = 0;
//надо как-то учитывать какой сейчас раунд и когда они должны закончиться

//Что происходит
//1) по клику запускается функция timer
//1.1) она записывает заданные пользователем value:
//pomodoroTime, breakTime, roundsAmount
//1.2) она считает общее время, которое мы возьмем за основу расчетов времени учебы
// studyTime = pomodoroTime * 60
//1.2) она считает общее время, которое мы возьмем за основу расчетов времени отдыха
//  restTime = breakTime * 60
//1.3) она устанавливает setInterval с выполнением  функции startStudyCountdown (1000)
//2) Функция startStudyCountdown делает следующее:
//2.1) вычисляет минуты и секунды для текущего отображения (из studyTime)
//2.2) если минуты или секунды < 10, дорисовывает нужный 0
//2.3) если studyTimer < 10, включает звуковой сигнал
//2.4) выводит полученные минуты и секугды на экран (textContent)
//2.5) уменьшает общее время studyTime на 1 секунду
//2.6) если уменьшенное время studyTime НЕ < 0, оно попадает в следующий цикл
//2.6) если уменьшенное время < 0, его нужно не пустить в следующий цикл
// поэтому если studyTime < 0, то:
// - оно приравнивается к 0: studyTime = 0
// - вызывается функция stopStudyCountdown() - она останавливает startStudyCountdown
// - вызывается функция restTimer -  это как timer, но уже для перерыва
//3) выполняется restTimer
//3.1) внутри restTimer идет подсчет раундов учебы rounds++
//3.2) проверяется, не достаточно ли еще раундов пройдено:
// if(rounds === roundsAmount) {countdown.textContent = `00:00:00`;
//description.textContent = 'SESSION IS COMPLETE! 🎉'; complete.play();
//return false;
// если здесь функция не остановилась, она идет дальше 
// вызывается startRestCountdown()
//4) startRestCountdown выполняется
//4.1)  на основе restTime считаются текущие restMinutes и restSeconds
//4.2) если минуты или секунды < 10, дорисовывает нужный 0
//4.3) если studyTimer < 10, включает звуковой сигнал
//4.4) выводит полученные минуты и секугды на экран (textContent)
//4.5) уменьшает общее время studyTime на 1 секунду
//4.6) если уменьшенное время < 0, его нужно не пустить в следующий цикл
// поэтому если restTime < 0, то:
// - оно приравнивается к 0: restTime = 0
// - вызывается функция stopRestCountdown() - она останавливает startRestCountdown
// - вызывается функция timer, чтобы начать следующую помидорку
//3) выполняется timer, все повторяется



const startButton = document.querySelector('#start');
const countdown = document.querySelector('#countdown');
const description = document.querySelector('#description');
const signal = document.querySelector('#signal');
const complete = document.querySelector('#complete');

startButton.addEventListener('click', timer);

function timer(){
    //сколько минут в 1 помидорке
    //сколько минут в одном отдыхе
    //сколько раундов в одном сете 
    const pomodoroTime =  Number(document.querySelector('#pomodoro_time').value);
    const breakTime = Number(document.querySelector('#rest_time').value);
    const roundsAmount = Number(document.querySelector('#pomodoro_rounds').value);
    
//для тестов
    console.log(pomodoroTime, breakTime, roundsAmount);
//для тестов

    studyTime = pomodoroTime * 60;//перевели в секунды
    console.log(studyTime);
    //это задаст изначальное время, но затем не будет использоваться
    //в каждом цикле функции countdown
    //оно должно быть задано вне функции, которая отвечает за countdown
    restTime = breakTime * 60;//перевели в секунды
    console.log(restTime);
    //запускаем саму функцию с обратным отсчетом первой помидорки
    //а функцию с обратным отсчетом отдыха здесь не запускаем
    //она запустится сама ниже, когда придет ее очередь
    timerIdStudy = setInterval(startStudyCountdown, 1000);

    function startStudyCountdown(){
        //рассчитаем в минутах и секундах для конкретного прохождения цикла
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

        //для тестов
        console.log(studyMinutes);
        console.log(studySeconds);
        console.log(rounds);
        //для тестов

        countdown.textContent = `00:${studyMinutes}:${studySeconds}`;
        description.textContent = 'WORK';

        studyTime--;

        if(studyTime < 0){
            studyTime = 0;
            stopStudyCountdown();//заканчиваем помидорку
            restTimer();
            //timerIdRest = setInterval(startRestCountdown, 1000);//начинаем отдых
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
        }//сначала посчитаем раунды, если их уже достаточно,
        //может нам не нужно начинать перерыв и нужно 
        //выйти из цикла
        //нам нужно 3 помидорки и только 2 перерыва

        timerIdRest = setInterval(startRestCountdown, 1000);//начинаем отдых
    }

    //описание функции внутри функции
    //начало
    function startRestCountdown(){
        //рассчитаем в минутах и секундах для конкретного прохождения цикла
        
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

        //для тестов
        console.log(restMinutes);
        console.log(restSeconds);
        console.log(rounds);
        //для тестов

        countdown.textContent = `00:${restMinutes}:${restSeconds}`;
        description.textContent = 'REST';

        restTime--;

        if(restTime < 0){
            restTime = 0;
            stopRestCountdown();//заканчиваем отдых
            timer();//начинаем помидорку
        }
    }

    function stopRestCountdown(){
        clearInterval(timerIdRest);
    }
    //описание функции внутри функции
    //конец

}































/*window.addEventListener('click', function (event) {
    console.log('Клик!')
}, { once: true })*/