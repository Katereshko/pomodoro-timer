# pomodoro-timer

My individual coding project.  
Currently hosted on Netlify:  
https://pomodoro-timer-for-studying.netlify.app/

## File structure
script.js - the main logic file  
index.html - main html file - to use the app, open this file on browser window  
style.css - main styling file  
definition.html - a minor html file
assets folder - contains all pictures and other media

## About the app
Created by Ekaterina Tereshko as an individual project during the coding program, it has the following features:

### User side
- pick an option for each of three drop-down lists: amount of time for studying, amount of time for rest and amount of such rounds accordingly
- to test the app, select the "test" option in each list, it will set the minimal amount of time so that you can just try how it works
- to strart a session, press the "Start session" button
- after that, a countdown block and the "WORK" or "REST" alert will appear on the page
- when it is 10 seconds before the end of a countdown block, a sound signal will be played
- at the end of the seccion a sound signal will be played

### Logic side  

On click, the **timer()** function is called. It uses the values selected by the uder: _pomodoroTime_, _breakTime_, _roundsAmount_.  
It converts the amounts of studying time and rest time into seconds (_studyTime_ and _restTime_ accordingly).  
The _setInterval_ is used in order to call the **startStudyCountdown()** function which launches the first countdown.  
The **startStudyCountdown()** function also:  
- converts minutes and secondds from the overall amount of time, taken from the _studyTime_ variable;
- plays a sound signal, if _studyTimer_ value is < 10;
- indicates the correct time remained on the page, updates it each second, using _textContent_;
- reduces the _studyTime_ value for 1 sec each second;
- if _studyTime_ value < 0, the **stopStudyCountdown()** function is called, which stops the countdown;
- the **restTimer()** function is called, which does all the same as described above, but for the "REST" countdown.

The **restTimer()** function counts the rounds of "WORK" and checks if it matches with the amount, selected by the user.


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


**Thanks for your time exploring my project!**

**EKATERINA TERESHKO
ekaterina.tereshko.me@gmail.com**
