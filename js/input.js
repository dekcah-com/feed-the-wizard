// js/input.js
import { getGameState, updateScore, removeFoodItem } from './gameState.js';
// import { checkCollision } from './collision.js'; // Collision check not used in simple click mode
import { removeFoodElement } from './rendering.js';

const pointsPerFood = 10;

export function setupInputListeners(gameAreaElement) {
    if (!gameAreaElement) {
        console.error("Game area element not provided for input listeners.");
        return;
    }

    gameAreaElement.addEventListener('click', (event) => {
        const state = getGameState();
        if (state.gameStatus !== 'playing') return;

        if (event.target.classList.contains('food-item')) {
            const foodElement = event.target;
            const foodId = foodElement.dataset.id;

            if (!foodId) return;

            // Direct Click Logic: Clicking food = feeding the wizard
            console.log(`Food item clicked: ${foodId}`);
            removeFoodItem(foodId);
            removeFoodElement(foodId);
            updateScore(pointsPerFood);
            // Score display update is handled by renderGame loop via ui.js
        }
    });
}
