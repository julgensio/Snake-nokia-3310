// Fix score

document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div');
	const scoreDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start');

	const width = 10;
	let currentIndex = 0; // First div in grid
	let appleIndex = 0; // First div in grid
	let currentSnake = [2, 1, 0]; // Div in grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the body for now on)

	let direction = 1;
	let score = 0;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	// Start and restart The game
	function startGame() {
		// Remove class name where the snake is currently in from the div's within the Grid
		currentSnake.forEach((index) => squares[index].classList.remove('snake'));

		// Remove the apple class from the div's within the Grid
		squares[appleIndex].classList.remove('apple');

		// Reset the time
		clearInterval(interval);
		// Reset score
		score = 0;

		randomApple();

		direction = 1;
		// Display reset score
		scoreDisplay.innerText = score;

		intervalTime = 1000;

		// Reset snake and divine snake position
		currentSnake = [2, 1, 0];
		// Start position
		currentIndex = 0;

		// Start position and class me where the snake is currently in
		currentSnake.forEach((index) => squares[index].classList.add('snake'));

		// Pass interval time
		interval = setInterval(moveOutcomes, intervalTime);
	}

	// Deals with outcomes of the snake
	function moveOutcomes() {
		// Deals with snake hitting border and snake hitting it self
		// Check in the gris the current snake head is

		//
		if (
			// If the current snake is at the bottom indicated by the parallel lines or on the right site of the grid
			(currentSnake[0] + width >= width * width && direction === width) || // If snake hits bottom
			(currentSnake[0] % width === width - 1 && direction === 1) || // If snake hits right wall
			(currentSnake[0] % width === 0 && direction === -1) || // If snake hits left wall
			(currentSnake[0] - width < 0 && direction === -width) || // If snake hits the top
			squares[currentSnake[0] + direction].classList.contains('snake')
		) {
			return clearInterval(interval); // This wil Clear the interval if any of the above happens
		}

		const tail = currentSnake.pop(); // Removes last index of the array ans shows it
		squares[tail].classList.remove('snake'); // Removes class of snake of the TAIL

		currentSnake.unshift(currentSnake[0] + direction); // Gives direction to the head of the array

		// Deals with snake hitting the apples

		// If the snakes head enter the apple
		if (squares[currentSnake[0]].classList.contains('apple')) {
			// Remove the class of the apple
			squares[currentSnake[0]].classList.remove('apple');

			// Add newly tail to the snake to grow longer
			squares[tail].classList.add('snake');
			currentSnake.push(tail);

			// Generate not location for apple when it the snake ate it
			randomApple();

			// Add 1 to the score
			score++;
			scoreDisplay.textContent = score;

			// Clear the time
			clearInterval(interval);

			// Multiply interval time by speed
			intervalTime = intervalTime * speed;

			// Decrease interval time each time the tail is updated
			interval = setInterval(moveOutcomes, intervalTime);
		}
		// Add class name of snake at the end of the move outcomes function
		squares[currentSnake[0]].classList.add('snake');
	}

	// Generate new apple is eaten
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while (squares[appleIndex].classList.contains('snake'));
		squares[appleIndex].classList.add('apple');
	}

	// Assign function to keyCodes
	function control(e) {
		// Remove the snake class from all squares
		squares[currentIndex].classList.remove('snake');

		if (e.keyCode === 39) {
			// Press the right arrow on out keyboard, the snake will go right one direction
			direction = 1;
		} else if (e.keyCode === 38) {
			// Press arrow up, the snake wil go back to the ten div's, appearing to to go up
			direction = -width;
		} else if (e.keyCode === 37) {
			// Press Arrow left, the snake will go left one div
			direction = -1;
		} else if (e.keyCode === 40) {
			// Press Arrow Down, the snake head will instantly appear in the div ten div's from where you are now
			direction = +width;
		}
	}

	document.addEventListener('keyup', control);
	startBtn.addEventListener('click', startGame);
});
