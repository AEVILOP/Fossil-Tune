// ====================================
// GLOBAL VARIABLES
// ====================================

// Audio element for playing songs
let currentSong = new Audio();

// Array to store songs of currently selected artist
let currentSongs = [];


// ====================================
// UTILITY FUNCTIONS
// ====================================

/**
 * Format seconds into MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Setup hamburger menu for mobile sidebar
 * Handles opening and closing of sidebar on mobile devices
 */
function setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close-btn");
    const leftSidebar = document.querySelector(".left");
    
    // Open sidebar when hamburger menu is clicked
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            leftSidebar.classList.add("active");
            hamburger.classList.add("hidden");
        });
    }
    
    // Close sidebar when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            leftSidebar.classList.remove("active");
            hamburger.classList.remove("hidden");
        });
    }
    
    // Close sidebar when a song is clicked (mobile UX improvement)
    const songRows = document.querySelectorAll(".songRow");
    songRows.forEach(row => {
        row.addEventListener("click", () => {
            leftSidebar.classList.remove("active");
            hamburger.classList.remove("hidden");
        });
    });
}



// ====================================
// AUDIO CONTROL FUNCTIONS
// ====================================

/**
 * Play or load a music track
 * @param {object} track - Track object with title, artist, and audioUrl
 * @param {boolean} pause - If true, only load song without playing
 */
function playMusic(track, pause = false) {
    currentSong.src = track.audioUrl;
    
    if (!pause) {
        // Play the song and show pause icon
        currentSong.play();
        document.querySelector("#play").src = "assests/pause.svg";
    } else {
        // Just load the song without playing, show play icon
        document.querySelector("#play").src = "assests/play.svg";
    }
    
    // Update song info display
    document.querySelector(".songinfo").innerHTML = `${track.title} - ${track.artist}`;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


// ====================================
// DATA FETCHING FUNCTIONS
// ====================================

/**
 * Fetch all songs from song.json
 * @returns {array} - Array of song objects
 */
async function fetchSongs() {
    try {
        const response = await fetch("song.json");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const songs = await response.json();
        console.log("Songs fetched:", songs);
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}



// ====================================
// UI MANIPULATION FUNCTIONS
// ====================================

/**
 * Load songs into the library sidebar for a specific artist
 * Also sets up click listeners for each song
 * @param {array} songsToLoad - Array of song objects to display
 */
function loadSongsInLibrary(songsToLoad) {
    // Update global currentSongs array
    currentSongs = songsToLoad;
    
    // Get the song list container
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    
    // Clear existing songs
    songUL.innerHTML = "";

    // Add each song to the library list
    for (const song of songsToLoad) {
        songUL.innerHTML = songUL.innerHTML + `<li class="songRow">
                            <img src="assests/music.svg" alt="musiclogo">
                            <div class="info">
                                <div class="name">${song.title}</div>
                                <div class="artist">${song.artist}</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img src="assests/play.svg" alt="playbtn">
                            </div>
                        </li>`;
    }
    
    // Add click event listeners to each song row
    Array.from(document.querySelectorAll(".songRow")).forEach((element, index) => {
        element.addEventListener("click", () => {
            if (index < songsToLoad.length) {
                playMusic(songsToLoad[index]);
            }
        });
    });
}


// ====================================
// MAIN APPLICATION FUNCTION
// ====================================

/**
 * Main application initialization
 * Sets up all event listeners and initializes the player
 */
async function main() {
    // ---- 1. Initialize Mobile Menu ----
    setupHamburgerMenu();

    // ---- 2. Fetch All Songs ----
    let allSongs = await fetchSongs();
    console.log("All songs:", allSongs);
    
    if (allSongs.length === 0) {
        console.error("No songs found");
        return;
    }
    
    // ---- 3. Load Default Playlist (Fossils) ----
    let defaultSongs = allSongs.filter(song => song.artist === "Fossils");
    playMusic(defaultSongs[0], true);
    loadSongsInLibrary(defaultSongs);

    // ---- 4. Setup Card Click Listeners ----
    /**
     * Attach click listeners to all artist cards
     * Clicking a card loads that artist's songs
     */
    function setupCardListeners() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const artistName = card.querySelector("h2").textContent;
                const artistSongs = allSongs.filter(song => song.artist === artistName);
                
                if (artistSongs.length > 0) {
                    // Play first song of selected artist
                    playMusic(artistSongs[0]);
                    
                    // Load all songs of artist in library
                    loadSongsInLibrary(artistSongs);
                    
                    // Close sidebar on mobile devices
                    const leftSidebar = document.querySelector(".left");
                    const hamburger = document.querySelector(".hamburger");
                    if (leftSidebar.classList.contains("active")) {
                        leftSidebar.classList.remove("active");
                        hamburger.classList.remove("hidden");
                    }
                }
            });
        });
    }

    // Initial card listeners setup
    setupCardListeners();

    // ---- 5. Setup Search Functionality ----
    const searchBtn = document.querySelector(".search-btn");
    const searchInput = document.querySelector(".search-input");
    const cardContainer = document.querySelector(".cardContainer");

    // Open search input when search button is clicked
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            searchInput.classList.add("active");
            searchInput.focus();
        });
    }

    // Filter cards based on search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll(".card");
            
            cards.forEach(card => {
                const artistName = card.querySelector("h2").textContent.toLowerCase();
                
                if (searchTerm === "") {
                    // Show all cards if search is empty
                    card.style.display = "flex";
                } else if (artistName.includes(searchTerm)) {
                    // Show card if artist name matches search term
                    card.style.display = "flex";
                } else {
                    // Hide card if it doesn't match
                    card.style.display = "none";
                }
            });
        });

        // Close search when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".search-wrapper")) {
                if (searchInput.value === "") {
                    searchInput.classList.remove("active");
                }
            }
        });

        // Clear search on escape key
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                searchInput.value = "";
                searchInput.classList.remove("active");
                const cards = document.querySelectorAll(".card");
                cards.forEach(card => {
                    card.style.display = "flex";
                });
            }
        });
    }

    // ---- 6. Setup Play Button Control ----
    // Toggle play/pause when play button is clicked
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "assests/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "assests/play.svg";
        }
    })

    // ---- 7. Setup Progress Bar and Time Display ----
    // Update progress bar and time display as song plays
    currentSong.addEventListener("timeupdate", () => {
        console.log("Time update:", currentSong.currentTime, currentSong.duration);

        // Update time display
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        
        // Update progress circle position
        const percent = (currentSong.currentTime / currentSong.duration) * 100;
        document.querySelector(".circle").style.left = `${percent}%`;
    })
    
    // ---- 8. Setup Seek Bar (Progress Bar Click) ----
    // Allow user to click on progress bar to seek
    document.querySelector(".soundbar").addEventListener("click", (e) => {
        let pos = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = pos + "%";
        currentSong.currentTime = (pos / 100) * currentSong.duration;
        
        // Auto-play from clicked position
        if (currentSong.paused) {
            currentSong.play();
            play.src = "assests/play.svg";
        }
    })
    
    // ---- 9. Setup Previous Button ----
    // Play previous song in current playlist
    prev.addEventListener("click", () => {
        currentSong.pause();
        let currentSongTitle = document.querySelector(".songinfo").innerHTML.split(" - ")[0];
        let index = currentSongs.findIndex(song => song.title === currentSongTitle);
        
        if(index - 1 >= 0){
            playMusic(currentSongs[index - 1]);
        }
    });

    // ---- 10. Setup Next Button ----
    // Play next song in current playlist
    next.addEventListener("click", () => {
        currentSong.pause();
        let currentSongTitle = document.querySelector(".songinfo").innerHTML.split(" - ")[0];
        let index = currentSongs.findIndex(song => song.title === currentSongTitle);
        
        if(index + 1 < currentSongs.length){
            playMusic(currentSongs[index + 1]);
        }
    });

    // ---- 11. Setup Volume Control ----
    const volumeIcon = document.querySelector("#volume-icon");
    const volumeSlider = document.querySelector("#volumeSlider");
    const volumeBarWrapper = document.querySelector(".volume-bar-wrapper");

    // Show volume slider on hover of volume icon
    volumeIcon.addEventListener("mouseenter", () => {
        volumeBarWrapper.classList.add("show");
    });

    // Hide volume slider when leaving volume icon
    volumeIcon.addEventListener("mouseleave", () => {
        // Delay hiding to allow moving to volume bar
        setTimeout(() => {
            if (!volumeBarWrapper.matches(":hover")) {
                volumeBarWrapper.classList.remove("show");
            }
        }, 100);
    });

    // Keep volume slider visible on hover
    volumeBarWrapper.addEventListener("mouseenter", () => {
        volumeBarWrapper.classList.add("show");
    });

    volumeBarWrapper.addEventListener("mouseleave", () => {
        volumeBarWrapper.classList.remove("show");
    });

    // Update volume when slider is changed
    volumeSlider.addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
    });

    // Initialize volume to maximum
    currentSong.volume = 1;
}

// ====================================
// INITIALIZE THE APPLICATION
// ====================================
main();