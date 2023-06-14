// snake.js

// Constants
const container = document.getElementById('game-container');
const gridSize = 20;
const initialSnakeLength = 3;

// Game state
let snake = [{ x: 0, y: 0 }];
let food = generateFood();
let direction = 'right';

// Generate food at random position
function generateFood() {
    const foodX = Math.floor(Math.random() * gridSize);
    const foodY = Math.floor(Math.random() * gridSize);
    return { x: foodX, y: foodY };
}

// Update game state and render
function update() {
    // Clear previous frame
    container.innerHTML = '';

    // Move snake
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    snake.unshift(head);

    // Check collision with food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    // Render snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.classList.add('snake');
        container.appendChild(snakeElement);
    });

    // Render food
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.classList.add('food');
    container.appendChild(foodElement);

    // Schedule next frame
    setTimeout(update, 200);
}

// Listen for keypress events to control the snake's direction
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
});

// Start the game
update();
