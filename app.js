// =======================
// APP STATE
// =======================

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true
}

let questions = []

// =======================
// Main DOM Elements
// =======================

const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")

// =======================
// Functions
// =======================

const chooseAnswer = (event, question) => {
    if(event.target.innerText === question.answer){
        if (state.which){
            state.player1++
            state.which = !state.which
        
        }else{
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    } else {
        setBoard(questions)
        state.which = !state.which
    }
}


// Getting a random question
const setBoard = (q) => {
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
// Updating Question
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d) 
// Update Player Scores
$p1score.text(state.player1)
$p2score.text(state.player2)
$("li").off()
$("li").on("click", (event) => {
    chooseAnswer(event, randomQuestion)
})
}

// =======================
// Main App Logic
// =======================

const URL = "https://cdn.contentful.com/spaces/hyevf3isj5bf/environments/master/entries?access_token=hLQEMgj7HoGUFUn0PItwLGQQCsP6KKAIcyATFn9qpZA&content_type=triviaq"
$.ajax(URL)
.then((data) => {
    questions = data.items.map((q) => q.fields)


    setBoard(questions)

})
