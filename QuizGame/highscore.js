const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML = highScores
	.map((score) => {
		return `<li class="high-score">Name: ${score.name} - Points: ${score.score}</li>`
	})
	.join('')