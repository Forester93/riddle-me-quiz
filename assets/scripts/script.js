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

let startButton=document.getElementById('start-quiz');
let nextQuestionButton=document.getElementById('next-question');
let questionSection=document.getElementById('mcq');
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

function startQuiz(){
    //hide this
    this.style.display="none";
    // Make the quiz form visible
    questionSection.style.display='block';
    nextQuestion();
    //Start timer


}

startButton.addEventListener('click',startQuiz);
nextQuestionButton.addEventListener('click',function(event){
    event.preventDefault();
    if(this.textContent=='Next Question'){
        nextQuestion();
    } else{
        gradeMe();
    }

});
