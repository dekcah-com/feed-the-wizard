// js/gameState.js

const INITIAL_TIME = 60;
const FOOD_SPAWN_INTERVAL_MS = 1000;

const gameState = {
    score: 0,
    timeLeft: INITIAL_TIME,
    gameStatus: 'initial', // 'initial', 'playing', 'gameOver'
    foodItems: [],
    foodSpawnTimer: 0,
    gameTimerIntervalId: null,
};

export function resetGameState() {
    gameState.score = 0;
    gameState.timeLeft = INITIAL_TIME;
    gameState.gameStatus = 'initial';
    gameState.foodItems = [];
    gameState.foodSpawnTimer = 0;
    if (gameState.gameTimerIntervalId) {
        clearInterval(gameState.gameTimerIntervalId);
        gameState.gameTimerIntervalId = null;
    }
    console.log("Game state reset.");
}

export function getGameState() {
    return gameState;
}

export function updateScore(points) {
    gameState.score += points;
}

export function setGameStatus(newStatus) {
    if (['initial', 'playing', 'gameOver'].includes(newStatus)) {
        gameState.gameStatus = newStatus;
        console.log(`Game status changed to: ${newStatus}`);
    } else {
        console.error(`Invalid game status: ${newStatus}`);
    }
}

export function decreaseTime() {
    if (gameState.timeLeft > 0) {
        gameState.timeLeft--;
    }
}

export function setGameTimerIntervalId(id) {
    gameState.gameTimerIntervalId = id;
}

export function updateFoodSpawnTimer(deltaTime) {
    gameState.foodSpawnTimer += deltaTime;
}
export function resetFoodSpawnTimer() {
    gameState.foodSpawnTimer = 0;
}
 export function getFoodSpawnInterval() {
    // Could potentially make this dynamic later for difficulty
    return FOOD_SPAWN_INTERVAL_MS;
}

export function addFoodItem(food) {
    gameState.foodItems.push(food);
}

export function removeFoodItem(foodId) {
     gameState.foodItems = gameState.foodItems.filter(item => item.id !== foodId);
}
