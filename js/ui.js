// js/ui.js
import { saveScore } from './firebaseService.js'; // Import REAL saveScore
import { getGameState } from './gameState.js'; // Needed for final score

// Cache DOM elements
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const gameOverMessage = document.getElementById('game-over-message');
const finalScoreDisplay = document.getElementById('final-score');
const startMessage = document.getElementById('start-message');
const leaderboardList = document.getElementById('leaderboard-list');

export function updateScoreDisplay(score) {
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

export function updateTimerDisplay(timeLeft) {
    if (timerDisplay) {
        timerDisplay.textContent = `Time: ${timeLeft}`;
    }
}

export function showGameOverMessage(finalScore) {
    if (gameOverMessage && finalScoreDisplay) {
        finalScoreDisplay.textContent = finalScore;
        gameOverMessage.style.display = 'flex';

        // Prompt for name and save score
        // Using a simple prompt, could be replaced with a proper input field later
        setTimeout(() => { // Timeout allows message to render before prompt blocks
            const playerName = prompt(`Game Over! Final Score: ${finalScore}\nEnter your name for the leaderboard:`, "Wizard");
            if (playerName && playerName.trim() !== "") {
                saveScore(playerName.trim(), finalScore)
                    .then(() => console.log("Score submission attempted."))
                    .catch(err => console.error("Failed to save score:", err));
            } else {
                console.log("No name entered, score not saved.");
            }
        }, 100); // Small delay

    } else {
        console.warn("Game over message elements not found.");
    }
}

export function showStartMessage() {
    if (startMessage) {
        startMessage.style.display = 'flex';
    }
    if (gameOverMessage) {
         gameOverMessage.style.display = 'none';
    }
}

export function hideMessages() {
     if (startMessage) {
         startMessage.style.display = 'none';
     }
     if (gameOverMessage) {
         gameOverMessage.style.display = 'none';
     }
}

/**
 * Displays the fetched leaderboard scores in the list element.
 * @param {Array<object>} scores - Array of score objects (e.g., {name: string, score: number})
 * @param {HTMLElement} listElement - The <ol> element to display scores in.
 */
export function displayLeaderboard(scores, listElement) {
    if (!listElement) {
        console.error("Leaderboard list element not provided.");
        return;
    }
    if (!scores || scores.length === 0) {
        listElement.innerHTML = '<li>No scores yet!</li>';
        return;
    }

    // Sort just in case they aren't already (fetch should handle this)
    scores.sort((a, b) => b.score - a.score);

    listElement.innerHTML = scores
        .map(scoreItem => `<li>${scoreItem.name}: ${scoreItem.score}</li>`)
        .join('');
}
