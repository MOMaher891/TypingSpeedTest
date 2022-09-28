//Array 
const words = [
    "Hello",
    "Programming",
    "Code",
    "JavaScript",
    "Town",
    "Cairo",
    "Youtube",
    "Facebook",
    "instgram",
    "Twitter",
    "Linkedin",
    "Giza",
    "Testing",
    "Coding",
    "Mohamed",
    "maher",
    "Grammer",
    "Playing",
    "Task",
    "Python"
];

//Setting Levels
const level = {
    "Easy": 10,
    "Normal": 5,
    "Hard": 3
};


//Catch Selectors
let startBtn = document.querySelector('.start');
let levels = document.querySelector('.message .level');
let seconds = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word');
let input = document.querySelector('.input');
let commingWords = document.querySelector('.upcoming-words');
let timeSpan = document.querySelector('.time');
let scoreGot = document.querySelector('.score .got');
let scoreTotal = document.querySelector('.score .total');
let finish = document.querySelector('.finish');
let lev = document.querySelectorAll('.levels button');


//Default Level
var defaultLevel = "Normal";
var defaultSecond = level[defaultLevel];

levels.innerHTML = defaultLevel;
seconds.innerHTML = defaultSecond;
timeSpan.innerHTML = defaultSecond;


lev.forEach(e => {
    e.addEventListener('click', () => {

        defaultLevel = e.innerHTML;
        var defaultSecond = level[defaultLevel];
        levels.innerHTML = defaultLevel;
        seconds.innerHTML = defaultSecond;
        timeSpan.innerHTML = defaultSecond;
    })
});

window.onload = reload();
function reload() {
    input.value = "";
}

scoreTotal.innerHTML = words.length;
input.onpaste = function () {
    return false;
}

startBtn.addEventListener('click', () => {
    startBtn.remove();
    input.focus();
    levels.innerHTML = defaultLevel;
    seconds.innerHTML = defaultSecond;


    //Calling Function to Generate Random Word
    generateWords();
})

//Function to Generate Random Word
function generateWords() {

    //Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //Get Word Index
    let wordIndex = words.indexOf(randomWord);
    //Remove Word From Array
    words.splice(wordIndex, 1);


    theWord.innerHTML = randomWord;


    startPlay();
}

for (let i = 0; i < words.length; i++) {
    let div = document.createElement('div');
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    commingWords.appendChild(div);
}

function startPlay() {
    console.log(defaultSecond);

    let start = setInterval(() => {

        timeSpan.innerHTML--;
        if (timeSpan.innerHTML === '0') {
            clearInterval(start);
            //compare with word
            if (theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()) {

                input.value = ""; //Empty Input
                scoreGot.innerHTML++; //Increase score
                //Reset Number of Seconds
                var defaultSecond = level[defaultLevel];
                seconds.innerHTML = defaultSecond;
                timeSpan.innerHTML = defaultSecond;
                console.log(defaultSecond);
                if (words.length > 0) {
                    generateWords();
                }
                else {

                    //Generate happy message
                    finish.style.display = 'block';
                    let span = document.createElement('span');
                    let spanText = document.createTextNode('Congratulation');
                    span.className = 'good';
                    span.appendChild(spanText);
                    finish.appendChild(span);
                }
            }

            else {
                //Generate sad message

                finish.style.display = 'block';
                let span = document.createElement('span');
                let spanText = document.createTextNode('GameOver');
                span.className = 'bad';
                span.appendChild(spanText);
                finish.appendChild(span);
            }
        }
    }, 1000);
}