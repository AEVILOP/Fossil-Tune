# 🎵 Fossiltune – Web Music Player

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://fossil-tune.netlify.app/)

Fossiltune is a **responsive web-based music player** built using **HTML, CSS, and Vanilla JavaScript**.  
It allows users to browse Bengali artists, load artist-wise playlists dynamically, and control audio playback without using any frontend frameworks.

This project demonstrates **core JavaScript fundamentals, DOM manipulation, and audio handling** — not UI cloning.

---

## 🚀 Features

- 🎧 Play / Pause music
- ⏮️ Previous & Next track navigation
- 🎼 Artist-based dynamic playlists
- 📂 Songs loaded dynamically from JSON
- 🔍 Real-time artist search
- 📱 Fully responsive layout
- 🍔 Mobile-friendly sidebar navigation
- 🔊 Volume control with slider
- ⏱️ Interactive progress bar with seeking

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3 (Responsive, Mobile-first)**
- **Vanilla JavaScript**
- **HTML Audio API**
- **JSON (Data source)**
- **Cloudinary (Audio hosting)**


---

## 📁 Project Structure

├── index.html
├── style.css
├── script.js
├── song.json
├── assests/
└── screenshots/

---

## 🧠 Key Implementation Details

* Single `Audio()` instance for centralized playback control
* Playlist generation using `Array.filter()` based on artist selection
* Dynamic DOM rendering for songs and artist cards
* Playback time synchronization using the `timeupdate` event
* Manual seek support via interactive progress bar
* Mobile-first UX optimizations (hamburger menu, auto sidebar close)

---

## ⚠️ Limitations

* No backend or authentication system
* No persistent user data (state resets on refresh)
* No shuffle or repeat playback modes
* JSON-based data source only (no database)

---

## 🔮 Future Enhancements

* Backend integration using **Node.js & Express**
* User authentication and personalized playlists
* Database-driven song and artist management
* Shuffle and repeat playback functionality

---

## 👤 Author

**Anirban Banerjee**
Frontend Developer (JavaScript)

---

## 📜 Disclaimer

* This project is built for **educational and portfolio purposes only**
* All audio content is streamed via public URLs and is **not owned** by the author

---
