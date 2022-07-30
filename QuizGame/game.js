const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
	{
		question: 'What is 5 + "3" ?',
		choice1: '53',
		choice2: '4',
		choice3: '8',
		choice4: '10',
		answer: 1,
	},
	{
		question: 'Inside which HTML element do we put the JavaScript?',
		choice1: '<p>',
		choice2: '<script></script>',
		choice3: '<body>',
		choice4: 'html',
		answer: 2,
	},
	{
		question: '1REM = ?',
		choice1: '12px',
		choice2: '14px',
		choice3: '16px',
		choice4: '18px',
		answer: 3,
	},

	{
		question: 'HTML stand for ?',
		choice1: 'Heuristic Text Modelling Language',
		choice2: 'SwitchHeuristic Text Markup Language',
		choice3: 'Hyper Text Modelling Language',
		choice4: 'Hyper Text Markup Language',
		answer: 4,
	},
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
	questionCounter = 0
	score = 0
	//console.log([...questions])
	availableQuestions = [...questions]
	getNewQuestion()
}

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score)

		return window.location.assign('./end.html')
	}

	questionCounter++
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

	const questionIndex = Math.floor(Math.random() * availableQuestions.length)

	console.log(`Index of Question: ${questionIndex}`)

	currentQuestion = availableQuestions[questionIndex]

	console.log(currentQuestion)

	question.innerText = currentQuestion.question

	choices.forEach((choice) => {
		//console.log(choice)
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	console.log(availableQuestions.splice(questionIndex, 1))
	availableQuestions.splice(questionIndex, 1)

	acceptingAnswers = true
}

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return

		acceptingAnswers = false
		const selectedChoice = e.target
		console.log(selectedChoice)
		const selectedAnswer = selectedChoice.dataset['number']

		let classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

		if (classToApply === 'correct') {
			incrementScore(SCORE_POINTS)
		}

		selectedChoice.parentElement.classList.add(classToApply)

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply)
			getNewQuestion()
		}, 1000)
	})
})

incrementScore = (num) => {
	score += num
	scoreText.innerText = score
}

startGame()
