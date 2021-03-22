//define question bank
let questionsBank=[
    {
        question: 'Which type of language is JavaScript?',
        choices: ['Object-oriented', 'Assembly Language','Object-based', 'High-level'],
        answerIndex:2
    },
    {
        question: 'When the interpreter encounters an empty statement, what will it do?',
        choices: ['Shows a warning', 'Prompts to complete the statement','Throws an error', 'Ignores the statement'],
        answerIndex:3
    },
    {
        question: 'The "function" and "var" are known as:',
        choices: ['Keywords', 'Data types','Declaration statements', 'Prototypes'],
        answerIndex:2
    },
    {
        question: 'Which of the following variables takes precedence over the others if the names are the same?',
        choices: ['Global variable', 'The local element','Both of the above', 'None of the above'],
        answerIndex:1
    },
    {
        question: 'In JavaScript, which one of the following is not considered as an error?',
        choices: ['Syntax error', 'Missing semicolons','Division by zero', 'Missing a bracket'],
        answerIndex:2
    }

];
//Initialise Scores & Initials
let scores=[];
let currentInitials='';
let currentScore=0;
let grade='';

// get buttons and form
let startButton=document.getElementById('start-quiz');
let nextQuestionButton=document.getElementById('next-question');
let saveScoreButton=document.getElementById('save-score');
let resetScoreButton=document.getElementById('reset-score');
let questionSection=document.getElementById('mcq');
let scoresTable=document.getElementById('high-scores');
//create objects for question and answer texts
let questionText=document.getElementById('question')
let textAnswer1=document.getElementById('answer1text');
let textAnswer2=document.getElementById('answer2text');
let textAnswer3=document.getElementById('answer3text');
let textAnswer4=document.getElementById('answer4text');
//////////////////////////////////////////////
// Global Variables
let questionIndex=-1;
let currentCorrectAnswer=-1;
let score=0;

// Move on to the next question function

function nextQuestion(){


    // are we out of questions
    if (questionIndex==questionsBank.length-1){return false;}

    // are we on the last question
    if (questionIndex==questionsBank.length-2){
        nextQuestionButton.textContent='Submit';
    }

    questionIndex++;

    // Update questions and answers on the form
    questionText.textContent=questionsBank[questionIndex].question;
    textAnswer1.textContent=questionsBank[questionIndex].choices[0];
    textAnswer2.textContent=questionsBank[questionIndex].choices[1];
    textAnswer3.textContent=questionsBank[questionIndex].choices[2];
    textAnswer4.textContent=questionsBank[questionIndex].choices[3];
    currentCorrectAnswer=questionsBank[questionIndex].answerIndex;
}

// Start Quiz function

function startQuiz(){
    //hide this
    this.style.display="none";
    // Make the quiz form visible
    questionSection.style.display='block';
    nextQuestion();
    //Start timer


}

// Get scores function

function getScores(){

    if(localStorage.getItem('riddleMeQuizScores')!=null){
    scores = JSON.parse(localStorage.getItem('riddleMeQuizScores'))
    }else{
        scores=[];
    }
    //Initialise table
    scoresTable.innerHTML="<tr><th>High Scores</th></tr><tr><th>Initials</th><th>Score</th><th>Date</th></tr>"

    // scores=[['MF','100%','21/12/2020'],['MF','80%','11/11/2020'],['MF','60%','10/10/2020']];
    if(scores!=[]){
        for(let item in scores){
            //display scores in the table
            let newTableRow=document.createElement('tr');
            let newTableCell1=document.createElement('td');
            let newTableCell2=document.createElement('td');
            let newTableCell3=document.createElement('td');
            newTableCell1.textContent=scores[item][0];
            newTableCell2.textContent=scores[item][1];
            newTableCell3.textContent=scores[item][2];
            newTableRow.append(newTableCell1,newTableCell2,newTableCell3);
            scoresTable.appendChild(newTableRow);
        }
    }

}

// Save scores to the local storage

function saveScores(event){
    event.preventDefault();
    event.stopPropagation();
    //Error handling on not entering anything inside the initials
    while(currentInitials.trim()==''||!isNaN(currentInitials.trim())){
        currentInitials=prompt('Please enter your initials:');
    }
    getScores();
    /*get date*/
    let currentDate = new Date();
    let today = currentDate.getDate() + '/' +(currentDate.getMonth() + 1)+'/'+currentDate.getFullYear();
    /*save everything in an array*/
    if(scores.length!=0){
    scores.unshift([currentInitials,grade,today]);
    }else{
        scores=[currentInitials,grade,today];
    }
    localStorage.setItem('riddleMeQuizScores',JSON.stringify(scores));
    getScores();
    scoresTable.style.display='block';
    saveScoreButton.style.display='none';
    resetScoreButton.style.display='block';
}

// Evaluate Question

function gradeQuestion(){
    let currentAnswerIndex=-1;
    let choiceAnswers=document.getElementsByName('choiceanswers');
    for (let i=0; i<4; i++){
        // alert(choiceAnswers[i].checked);
        if (choiceAnswers[i].checked){
            currentAnswerIndex=i;
            // alert (currentAnswerIndex+' is your answer');
        }
    }
    if (currentAnswerIndex==currentCorrectAnswer) {
        score++;
    } else {
        // reduceTime();
    }

}


// Evaluate Total Score
function gradeMe(){

    grade=score/questionsBank.length;
    grade=(grade*100)+'%'
    document.getElementById('score').textContent='Your grade is ' + grade;
    /*show score and save score button*/
    document.getElementById('score').style.display='block';
    document.getElementById('save-score').style.display='block';
    /*hide other quiz elements*/
    for (let element in document.getElementById('mcq').children){
        if (!(document.getElementById('mcq').children[element].id=='save-score'||document.getElementById('mcq').children[element].id=='score')){
            document.getElementById('mcq').children[element].style.display='none';

        }
    }

}

//Start Quiz

startButton.addEventListener('click',startQuiz);

//Next Question
nextQuestionButton.addEventListener('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.textContent=='Next Question'){
        //grade question and go onto the next
        gradeQuestion();
        nextQuestion();
    } else{
        //grade last question and finish quiz
        gradeQuestion();
        gradeMe();
    }

});


// Save Score

saveScoreButton.addEventListener('click', saveScores);


//Reset Score

resetScoreButton.addEventListener('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    scores=[];
    localStorage.setItem('riddleMeQuizScores',[]);
    getScores();
});