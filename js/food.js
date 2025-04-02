// js/food.js
import { addFoodItem } from './gameState.js';

let foodIdCounter = 0;

export function spawnFood(gameAreaElement) {
    if (!gameAreaElement) {
        console.error("Game area element not provided for spawning food.");
        return;
    }

    const gameWidth = gameAreaElement.clientWidth;
    const gameHeight = gameAreaElement.clientHeight;
    const foodSize = 30;

    const maxX = gameWidth > foodSize ? gameWidth - foodSize : 0;
    const maxY = gameHeight > foodSize ? gameHeight - foodSize : 0;

    const wizardHeightEstimate = 100;
    const bottomBuffer = 20;
    const safeMaxY = maxY > (wizardHeightEstimate + bottomBuffer) ? maxY - (wizardHeightEstimate + bottomBuffer) : 0;

    let spawnY = 0;
    if (safeMaxY <= 0 && maxY > 0) {
         console.warn("Game area too small vertically to spawn food safely above wizard. Spawning anywhere.");
         spawnY = Math.random() * maxY;
    } else if (maxX <= 0 || maxY <= 0) {
        console.error("Game area has zero width or height. Cannot spawn food.");
        return;
    } else {
         spawnY = Math.random() * safeMaxY;
    }

    const food = {
        id: `food-${foodIdCounter++}`,
        x: Math.random() * maxX,
        y: spawnY,
        size: foodSize,
        createdAt: performance.now() // Record the creation time
    };

    addFoodItem(food);
}
