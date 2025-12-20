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

## 🖼️ Screenshots

### Desktop View
![Desktop View](screenshots/desktop.png)

### Mobile View
![Mobile View](screenshots/mobile.png)

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

🧠 Key Implementation Details

Single Audio() instance for centralized playback

Playlist generation using Array.filter()

Dynamic DOM rendering for songs and artists

Time sync using timeupdate event

Manual seek support via progress bar

Mobile UX optimizations

---

⚠️ Limitations

No backend / authentication

No persistent user data

No shuffle or repeat modes

JSON-based data only

---

🔮 Future Enhancements

Backend integration (Node.js + Express)

User login & playlists

Database-driven songs

Shuffle / repeat functionality

---

👤 Author

Anirban Banerjee
Frontend Developer (JavaScript)

---

📜 Disclaimer

This project is built for educational and portfolio purposes only.
All audio content is streamed via public URLs and not owned by the author.
