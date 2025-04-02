// js/gameLoop.js
import { getGameState, resetGameState, setGameStatus, decreaseTime, setGameTimerIntervalId, updateFoodSpawnTimer, resetFoodSpawnTimer, getFoodSpawnInterval, removeFoodItem } from './gameState.js';
import { spawnFood } from './food.js';
import { renderGame, clearFoodDisplay, removeFoodElement } from './rendering.js';
import { showGameOverMessage, updateTimerDisplay, displayLeaderboard } from './ui.js'; // Added displayLeaderboard
import { fetchTopScores } from './firebaseService.js'; // Needed for game over

let lastTimestamp = 0;
let animationFrameId = null;
const FOOD_LIFETIME_MS = 3000; // Food disappears after 3 seconds

/**
 * The main game loop function. Runs every frame.
 * @param {number} timestamp - The current time provided by requestAnimationFrame.
 */
function gameLoop(timestamp) {
    const state = getGameState();
    if (state.gameStatus !== 'playing') {
        animationFrameId = null;
        return;
    }

    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    const now = timestamp;

    // --- Update Game State ---

    // 1. Check for expired food
    const expiredFoodIds = [];
    // Iterate backwards for safe removal while iterating (or collect IDs like this)
    state.foodItems.forEach(food => {
        if (now - food.createdAt > FOOD_LIFETIME_MS) {
            expiredFoodIds.push(food.id);
        }
    });

    // Remove expired food from state and DOM
    expiredFoodIds.forEach(id => {
        removeFoodItem(id);
        removeFoodElement(id);
    });


    // 2. Update food spawn timer and spawn new food if needed
    updateFoodSpawnTimer(deltaTime);
    if (state.foodSpawnTimer >= getFoodSpawnInterval()) {
        spawnFood(document.getElementById('game-area'));
        resetFoodSpawnTimer();
    }

    // --- Render Game State ---
    renderGame();

    // Request the next frame
    animationFrameId = requestAnimationFrame(gameLoop);
}

/**
 * Starts the game timer interval.
 */
function startGameTimer() {
    const state = getGameState();
    if (state.gameTimerIntervalId) {
        clearInterval(state.gameTimerIntervalId);
    }

    updateTimerDisplay(state.timeLeft);

    const timerId = setInterval(async () => { // Make async to await fetchTopScores
        decreaseTime();
        const currentState = getGameState(); // Get current state after decrease
        updateTimerDisplay(currentState.timeLeft);

        if (currentState.timeLeft <= 0) {
             stopGame(); // Stop game logic first
             // Fetch scores again for game over screen
             const leaderboardListElement = document.getElementById('leaderboard-list');
             try {
                 const scores = await fetchTopScores(10);
                 displayLeaderboard(scores, leaderboardListElement); // Update leaderboard display
             } catch (error) {
                 console.error("Failed to fetch scores for game over screen:", error);
                 if(leaderboardListElement) leaderboardListElement.innerHTML = '<li>Error loading scores</li>';
             }
             showGameOverMessage(currentState.score); // Show game over AFTER stopping and fetching
        }
    }, 1000);
    setGameTimerIntervalId(timerId);
}

/**
 * Starts the game.
 */
export function startGame() {
    console.log("Starting game...");
    resetGameState();
    clearFoodDisplay();
    setGameStatus('playing');
    lastTimestamp = performance.now();
    startGameTimer();
    if (animationFrameId) {
         cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}

/**
 * Stops the game.
 */
export function stopGame() {
     console.log("Stopping game...");
     const state = getGameState();
     if (state.gameTimerIntervalId) {
        clearInterval(state.gameTimerIntervalId);
        setGameTimerIntervalId(null);
     }
     setGameStatus('gameOver');
     if (animationFrameId) {
         cancelAnimationFrame(animationFrameId);
         animationFrameId = null;
     }
     clearFoodDisplay();
}
