
# The Archive

[cite_start]**The Archive** is a sophisticated, mood-based book discovery application designed to provide a personalized and immersive reading experience[cite: 1, 29]. [cite_start]Moving beyond traditional genre filtering, this platform allows users to explore literature based on their emotional state[cite: 29].

[cite_start]🔗 **[Live Demo]**([https://gautami6.github.io/PROJECT/](https://gautami6.github.io/PROJECT/)) [cite: 18, 19]

-----
 🌟 Key Features

 Mood-Based Filtering:** Discover books tailored to specific emotional states such as "Rainy," "Dark," or "Romantic"[cite: 6, 29].
 Quiz-Based Recommendations:** A built-in quiz mechanism to help users find their next great read[cite: 13, 14].
 Personalized Reading List:** Users can manage a reading list, rate books, and track favorites[cite: 11, 23].
 Dynamic Points & Stats:** The system tracks user progress, completed books, and points in real-time[cite: 23, 25].
 Persistence:** All user data (favorites, ratings, progress) is saved locally, ensuring session persistence without needing a backend database[cite: 24].

-----

## 🛠️ Technical Architecture

[cite_start]The application is built with a focus on clean separation of logic and scalability using a framework-less approach[cite: 21].

### Component-Based JavaScript

[cite_start]The core logic utilizes a modular **object-based structure (`app` object)** that centralizes the application state, methods, and DOM interactions[cite: 20].

### State Management & UI Rendering

  * [cite_start]**Dynamic State:** A structured state system manages user data, which is persisted using **localStorage** to support session persistence and multi-user simulation[cite: 23, 24].
  * [cite_start]**Real-Time Rendering:** The interface updates dynamically through functions like `renderGrid()` and `updateStats()` whenever the state changes[cite: 25].
  * [cite_start]**Event-Driven Programming:** Utilizes input, click, and drag-and-drop events to ensure a responsive, interactive experience with minimal page reloads[cite: 26].

-----

## 📂 Project Structure

```text
PRO1/
├── images/               # Book covers and assets (e.g., dune.jpg, road.jpg)
├── index.html            # Main entry point
├── script.js             # Core application logic and state management
└── style.css             # UI styling and responsive layouts
```

-----

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gautami6/PROJECT.git
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd PROJECT
    ```
3.  **Open the application:**
    Simply open `index.html` in your preferred web browser.

-----

## 💡 Challenges Overcome

[cite_start]A significant challenge during development was maintaining a synchronized UI state across multiple interactive features like favorites, ratings, and filters[cite: 30]. [cite_start]This was resolved by implementing **centralized state management** and dedicated re-rendering functions to ensure consistency across the entire interface[cite: 30, 31].

-----

## 👤 Author

[cite_start]**Gautami Mulay** [cite: 3]

  * [cite_start]Registration Number: 24BDS0380 [cite: 4]
  * [cite_start]GitHub: [Gautami6](https://www.google.com/search?q=https://github.com/Gautami6) [cite: 16]
