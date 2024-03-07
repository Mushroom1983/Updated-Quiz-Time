document.addEventListener("DOMContentLoaded", function () {

    const time = document.getElementById("time");
    
    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start");
    
    const questionsContainer = document.getElementById("questions");
    const questionTitle = document.getElementById("question-title");
    const choices = document.getElementById("choices");
    
    const endScreen = document.getElementById("endScreen");
    const finalScore = document.getElementById("finalScore");
    const initials = document.getElementById("initials");
    const submit = document.getElementById("submit");
    
    const feedback = document.getElementById("feedback");
    
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    
        return array;
    };
    
    const getRandomQuestions = (length, questions) => {
        const shuffledQuestions = shuffle(questions);
        return shuffledQuestions.slice(0, length);
    };
    
    const randomQuestions = getRandomQuestions(10, questions);
    
    // check to see if questions is an array
    console.log(randomQuestions);
    
    let timeLeft = 0;
    
    let score = 0;
    let currentQuestionIndex = 0;
    let currentQuestion = {};
    let questionNum = 0;
    let correctAnswer = "";
    
    
    function startQuiz() {
    
        startScreen.classList.add("hide");
        questionsContainer.classList.remove("hide");
        
        timeLeft = 120;
        updateTimerDisplay();
        
        timerInterval = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
    
            if (timeLeft <= 0) {
                endQuiz();
                
             }
            
    
        }, 1000);
    
        loadQuestion();
    
    
    }
    
    function loadQuestion() {
    
        const currentQuestion = questions[currentQuestionIndex];
        const choicesContainer = document.getElementById("choices");
    
        document.getElementById("question-title").textContent = currentQuestion.title;
    
        choicesContainer.innerHTML = "";
    
        currentQuestion.choices.forEach(function(choice) {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", function() {
                handleChoice(choice);
            });
            choicesContainer.appendChild(button);
        });
    }
    
    function handleChoice(choice) {
        const currentQuestion = randomQuestions[currentQuestionIndex];
        if (choice === currentQuestion.answer) {
            score += 1
            showFeedback("correct");
        } else {
            timeLeft -= 10;
            showFeedback("incorrect");
        }
        
        feedback.classList.remove("hide");
    
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            endQuiz();
        }
    }
    
    function endQuiz() {
        clearInterval(timerInterval);
        questionsContainer.classList.add("hide");
        end-screen.classList.remove("hide");
        finalScore.textContent = score;
    }
    
    document.getElementById("start").addEventListener("click", startQuiz);
    
    document.getElementById("submit").addEventListener("click", function() {
        const initialsInput = initials.value.trim();
        if (initials === "") {
            alert("Please enter your initials");
            return;
        }
        
    })
    
    const userScore = {
        initials: initials,
        score: score
    };
    
    // const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // highScores.push(userScore);
    // localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // window.location.href = "highscores.html";
    })