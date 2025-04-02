// js/main.js
import { startGame } from './gameLoop.js';
import { setupInputListeners } from './input.js';
import { fetchTopScores } from './firebaseService.js'; // Using REAL version now
import { showStartMessage, hideMessages, displayLeaderboard } from './ui.js'; // Added displayLeaderboard

/**
 * Main entry point for the Feed the Wizard game.
 */
async function initializeGame() { // Make async to await fetchTopScores
    console.log("Feed the Wizard game initializing...");

    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const leaderboardList = document.getElementById('leaderboard-list'); // Get leaderboard list element

    if (!gameArea || !startButton || !restartButton || !leaderboardList) {
        console.error("Essential game elements not found in the DOM!");
        return;
    }

    // Setup event listeners
    setupInputListeners(gameArea);

    startButton.addEventListener('click', () => {
        hideMessages();
        startGame();
    });

    restartButton.addEventListener('click', () => {
         hideMessages();
         startGame();
         // Re-fetch scores after restart? Optional.
         fetchAndDisplayScores(leaderboardList);
    });

    // Initial setup
    showStartMessage();
    // Fetch and display scores on initial load
    await fetchAndDisplayScores(leaderboardList);


    console.log("Game initialized. Waiting for user to start.");
}

// Helper function to fetch and display scores
async function fetchAndDisplayScores(listElement) {
     try {
        console.log("Fetching leaderboard scores...");
        listElement.innerHTML = '<li>Loading...</li>'; // Show loading state
        const scores = await fetchTopScores(10); // Fetch top 10
        console.log("Fetched scores:", scores);
        displayLeaderboard(scores, listElement); // Display them
     } catch (error) {
         console.error("Failed to fetch or display leaderboard:", error);
         listElement.innerHTML = '<li>Error loading scores</li>'; // Show error state
     }
}


// Wait for the DOM to be fully loaded before initializing the game
document.addEventListener('DOMContentLoaded', initializeGame);
