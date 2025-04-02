// js/firebaseService.js - Add client-side checks

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit as firestoreLimit, getDocs, serverTimestamp } from "firebase/firestore";

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyBO0KgYSMTdjTbu3P7FL4svS5xJSIP64A4",
    authDomain: "feedthewizard-game.firebaseapp.com",
    projectId: "feedthewizard-game",
    storageBucket: "feedthewizard-game.appspot.com",
    messagingSenderId: "789007937333",
    appId: "1:789007937333:web:1a47d07797a3a5da00667c",
    measurementId: "G-9VN6HW5F2G"
};

// --- Initialize Firebase ---
let app;
let db;
const leaderboardCollectionName = "leaderboard"; // <-- CHECK THIS NAME

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully with Firestore.");
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

export { db };

// --- Firestore Functions ---

/**
 * Saves a player's score to the Firestore leaderboard collection.
 */
export async function saveScore(playerName, score) {
    console.log(`Attempting to save score: Player: ${playerName}, Score: ${score}`);
    // Check if db is initialized
    if (!db) {
        console.error("Firestore database is not initialized. Cannot save score.");
        return Promise.reject("Firestore not initialized");
    }
    // Basic validation
    if (!playerName || typeof playerName !== 'string' || playerName.trim() === '') {
        console.error("Invalid player name provided.");
        return Promise.reject("Invalid player name");
    }
    if (typeof score !== 'number' || isNaN(score)) {
        console.error("Invalid score provided.");
        return Promise.reject("Invalid score");
    }

    try {
        const leaderboardCol = collection(db, leaderboardCollectionName);
        const docRef = await addDoc(leaderboardCol, {
            name: playerName.trim(),
            score: score,
            createdAt: serverTimestamp()
        });
        console.log("Score saved successfully with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving score to Firestore: ", error);
        throw error;
    }
}

/**
 * Fetches the top N scores from the Firestore leaderboard collection.
 */
export async function fetchTopScores(scoresLimit = 10) {
    console.log(`Fetching top ${scoresLimit} scores from Firestore...`);
    // Check if db is initialized (ADDED THIS CHECK)
    if (!db) {
        console.error("Firestore database is not initialized. Cannot fetch scores.");
        return Promise.reject("Firestore not initialized");
    }

    try {
        // Verify this collection name matches your Firestore database exactly
        const leaderboardCol = collection(db, leaderboardCollectionName);
        // Create a query against the collection
        const q = query(leaderboardCol, orderBy("score", "desc"), firestoreLimit(scoresLimit));

        const querySnapshot = await getDocs(q);

        const scores = [];
        querySnapshot.forEach((doc) => {
            scores.push({ id: doc.id, ...doc.data() });
        });

        console.log("Fetched scores:", scores);
        return scores;

    } catch (error) {
        // Log the specific error from fetching
        console.error("Error fetching top scores from Firestore: ", error);
        // Displaying the error in the UI might be better later
        document.getElementById('leaderboard-list').innerHTML = '<li>Error loading scores</li>';
        throw error; // Re-throw error
    }
}
