# 🎵 Fossiltune – React Music Player

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://fossil-tune.netlify.app/)

Fossiltune is a **modern, responsive web-based music player** rebuilt from the ground up using **React and Vite**.
It features a premium **Dark Glassmorphism** aesthetic, dynamic state management, and an interactive audio playback experience. 

---

## 🚀 Features

- 🎧 **Play / Pause & Navigation:** Seamless audio playback with previous/next track controls.
- 🎼 **Dynamic Artist Imagery:** Dynamically renders artist-specific thumbnails across the player and library.
- ❤️ **Favorites System:** Functional "Like/Favorite" system with persistent UI state to keep track of your top tracks.
- 📂 **Component-Based Architecture:** Clean, modular structure using React components.
- 📱 **Fully Responsive Layout:** Optimized for both desktop and mobile viewing with a collapsible sidebar menu.
- 🔊 **Interactive Controls:** Volume slider, interactive progress bar with manual seeking, and real-time playback synchronization.
- 🎨 **Dark Luxury Glassmorphism:** Sleek, modern UI featuring subtle gradients, translucent panels, and smooth micro-animations.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite** (Next-generation frontend tooling)
- **Vanilla CSS3** (Custom design system, CSS Variables, Glassmorphism)
- **HTML Audio API**

---

## 📁 Project Structure

```text
Fossiltune/
├── frontend/
│   ├── public/              # Static assets (images, icons)
│   ├── src/
│   │   ├── components/      # React functional components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MainContent.jsx
│   │   │   └── Playbar.jsx
│   │   ├── App.jsx          # Root component managing global state
│   │   ├── index.css        # Global styles and CSS variables
│   │   └── utils.js         # Helper functions (e.g., dynamic image fetching)
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🧠 Key Implementation Details

* **Global State Management:** `App.jsx` handles the core audio state (`currentSong`, `isPlaying`, `progress`, `volume`, `favorites`) and distributes it via props.
* **Component Modularity:** Reusable UI elements (`Sidebar`, `MainContent`, `Playbar`) ensure maintainability and separation of concerns.
* **Real-time Synchronization:** Built-in React `useEffect` hooks and native event listeners tie the `<audio>` reference seamlessly to the React state.
* **Dynamic Styling:** Utilizes CSS variables for quick thematic changes, unified color palettes (`--accent`, `--bg-highlight`), and responsive grid layouts.

---

## 🏃‍♂️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Fossiltune.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd Fossiltune/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 👤 Author

**Anirban Banerjee**  
Frontend Developer

---

## 📜 Disclaimer

* This project is built for **educational and portfolio purposes only.**
* Audio content streamed via public URLs is **not owned** by the author.
