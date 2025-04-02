// js/rendering.js
import { getGameState } from './gameState.js';
import { updateScoreDisplay } from './ui.js';

const gameArea = document.getElementById('game-area');

if (!gameArea) {
    console.error("Required DOM element #game-area not found!");
}

let foodElementCache = {};

/**
 * Renders the current game state to the DOM.
 */
export function renderGame() {
    const state = getGameState();
    updateScoreDisplay(state.score);
    renderFoodItems(state.foodItems);
}

/**
 * Efficiently updates food items in the DOM.
 */
function renderFoodItems(foodItems) {
    if (!gameArea) return;

    const currentFoodIds = new Set(foodItems.map(food => food.id));
    const cachedFoodIds = new Set(Object.keys(foodElementCache));

    // Remove elements no longer in state
    cachedFoodIds.forEach(id => {
        if (!currentFoodIds.has(id)) {
            foodElementCache[id]?.remove();
            delete foodElementCache[id];
        }
    });

    // Add or update elements
    foodItems.forEach(food => {
        if (!cachedFoodIds.has(food.id)) {
            // Add new food item
            const foodElement = document.createElement('div');
            foodElement.classList.add('food-item');
            foodElement.style.left = `${food.x}px`;
            foodElement.style.top = `${food.y}px`;
            foodElement.dataset.id = food.id;
            gameArea.appendChild(foodElement);
            foodElementCache[food.id] = foodElement;
        }
        // No updates needed for static food yet
    });
}

/**
* Removes a specific food item element from the DOM and cache.
*/
export function removeFoodElement(foodId) {
    if (foodElementCache[foodId]) {
        foodElementCache[foodId].remove();
        delete foodElementCache[foodId];
    }
}

/**
 * Clears all food item elements from the display and cache.
 */
export function clearFoodDisplay() {
    if (!gameArea) return;
     Object.values(foodElementCache).forEach(el => el.remove());
     foodElementCache = {};
     console.log("Cleared food display and cache.");
}
