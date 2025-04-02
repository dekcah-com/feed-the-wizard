Feed the Wizard! Game

A simple browser-based game where the objective is to feed a wizard by clicking on food items before they disappear or time runs out.

Built with HTML, CSS, and vanilla JavaScript (using ES6 Modules). Includes a leaderboard feature (currently mocked, intended for Firebase integration).

## How to Run

1.  Clone or download the repository.
2.  Ensure you have a local web server capable of serving files over HTTP (required for ES6 modules). Opening `index.html` directly via `file:///` will likely cause CORS errors.
    * **Using WebStorm:** Right-click `index.html` and choose "Open in Browser".
    * **Using Node.js:** Navigate to the project root in your terminal and run `npx live-server .`
    * **Using Python 3:** Navigate to the project root and run `python -m http.server 8000`, then open `http://localhost:8000` in your browser.
3.  Click the "Start Game" button.
4.  Click on the food items before they disappear to score points.

## Licensing

The **code** in this repository (HTML, CSS, JavaScript files) is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

**IMPORTANT - Assets:** The image asset(s) located in the `/assets` directory (e.g., `wizard.png`) are **NOT** covered by the MIT License.
* **[Review This Section]** The wizard image was generated using Google Gemini. Its use is subject to the Google Terms of Service and the Generative AI Prohibited Use Policy (`https://policies.google.com/terms/generative-ai/use-policy`). Please refer to the official Google policies for specific details regarding usage rights and restrictions. The image is not licensed under the MIT license applied to the code.

## Project Status

Core game mechanics implemented (including food lifetime). Next steps involve integrating Firebase for the leaderboard.
