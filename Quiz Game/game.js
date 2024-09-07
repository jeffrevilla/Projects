const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

let currentQuestion = {};
let accecptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which company developed the Python programming language?",
        choice1: "Microsoft",
        choice2: "Google",
        choice3: "Sun Microsystems",
        choice4: "Python Software Foundation",
        answer: 4
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choice1: "String",
        choice2: "Boolean",
        choice3: "Alert",
        choice4: "Number",
        answer: 3
    },
    {
        question: "Which CSS property controls the text size?",
        choice1: "font-style",
        choice2: "font-size",
        choice3: "text-size",
        choice4: "text-style",
        answer: 2
    }

]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
};

getNewQuestion = () => {
    
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign("/end.html")
    }

    questionCounter++;
    const quetionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[quetionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+ number];
    });

    availableQuestions.splice(quetionIndex, 1);

    accecptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!accecptingAnswers) return;

        accecptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer? "correct" : "incorrect";
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

        getNewQuestion();
    });
});

startGame();
