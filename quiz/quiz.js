// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "1.What should come in place of a question mark? ATTRIBUTION,TTRIBUTIO,RIBUTIO,IBUTI,?", 
        choiceA : "BUT",
        choiceB : "UTI",
        choiceC : "UT",
        choiceD : "IBU",
        correct : "B"
    },{
        question : "2.No of handshakes in a party of 20 people is ___",
         choiceA : "190",
         choiceB : "198",
         choiceC : "180",
         choiceD : "200",
         correct : "A"
    },{
        question : "3.SI unit of magnetic field is ____",
         choiceA : "Weber",
         choiceB : "Weber-m",
         choiceC : "Tesla",
         choiceD : "Tesla-m",
         correct : "C"
    },{
        question : "4.Nikhil is the Father-in-law of Tara.Tara is the wife of Rahul.How is Rahul's brother related to Nikhil?  ",
         choiceA : "Brother",
         choiceB : "Father",
         choiceC : "Son",
         choiceD : "Son-in-law",
         correct : "C"
    },{
        question : "5.Which of the following is a renewable source of energy?",
         choiceA : "Wood",
         choiceB : "Petrol",
         choiceC : "LPG",
         choiceD : "None of these",
         correct : "A"
    },{
        question : "6.Atomic number,mass number and valency of Carbon atoms are respectively,",
         choiceA : "6,12,6",
         choiceB : "6,13,4",
         choiceC : "5,12,8",
         choiceD : "6,12,4",
         correct : "D"
    },{
        question : "7.Calcium hydroxide is commonly known as ____",
         choiceA : "Limestone",
         choiceB : "Slaked-lime",
         choiceC : "Quick-lime",
         choiceD : "Bleaching-powder",
         correct : "B"
    },{
        question : "8.Area of triangle formed by lines y=x,x=6 and y=0 is __ sq.units.",
         choiceA : "36",
         choiceB : "18",
         choiceC : "9",
         choiceD : "72",
         correct : "B"
    },{
        question : "9.Carbohydrates in plants are stored in the form of ___",
         choiceA : "Glycogen",
         choiceB : "Starch",
         choiceC : "Maltose",
         choiceD : "Glucose",
         correct : "B"
    },{
        question : "10.Bile juice is secreted by ___",
         choiceA : "Stomach",
         choiceB : "Pancreas",
         choiceC : "Small intestine",
         choiceD : "Liver",
         correct : "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++ ;
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";//we keep it green as the score is displayed at the end
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    let txt = (scorePerCent == 100) ? "MASTERPIECE!!" :
              (scorePerCent >= 80) ? "Awesome!!" :
              (scorePerCent >= 40) ? "Good.." :
              (scorePerCent >= 20) ? "Work hard" :
              "Try hard";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    

    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%.</br>" +"  "+ txt +"</p>";
}





















