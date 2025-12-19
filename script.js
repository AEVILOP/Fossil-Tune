let currentSong = new Audio();

// Hamburger menu toggle
function setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close-btn");
    const leftSidebar = document.querySelector(".left");
    
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            leftSidebar.classList.add("active");
            hamburger.classList.add("hidden");
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            leftSidebar.classList.remove("active");
            hamburger.classList.remove("hidden");
        });
    }
    
    // Close sidebar when clicking on a song
    const songRows = document.querySelectorAll(".songRow");
    songRows.forEach(row => {
        row.addEventListener("click", () => {
            leftSidebar.classList.remove("active");
            hamburger.classList.remove("hidden");
        });
    });
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
function playMusic(track, pause = false) {
    currentSong.src = track.audioUrl;
    if (!pause) {
        currentSong.play();
        document.querySelector("#play").src = "assests/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = `${track.title} - ${track.artist}`;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}
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

async function main() {
    // Setup hamburger menu
    setupHamburgerMenu();

    let songs = await fetchSongs();
    console.log("All songs:", songs);
    
    if (songs.length === 0) {
        console.error("No songs found");
        return;
    }
    
    playMusic(songs[0], true);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    for (const song of songs) {
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
    
    // add event listener to playnow button
    Array.from(document.querySelectorAll(".songRow")).forEach((element, index) => {
        element.addEventListener("click", () => {
            if (index < songs.length) {
                playMusic(songs[index]);
            }
        });
    });

    //add event listener to play, next and prev buttons
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

    //listener for time updtate event
    currentSong.addEventListener("timeupdate", () => {
        console.log("Time update:", currentSong.currentTime, currentSong.duration);

        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        const percent = (currentSong.currentTime / currentSong.duration) * 100;
        document.querySelector(".circle").style.left = `${percent}%`;
    })
    // playbar setting
    document.querySelector(".soundbar").addEventListener("click", (e) => {
        let pos = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = pos + "%";
        currentSong.currentTime = (pos / 100) * currentSong.duration;
        // Play music from clicked position
        if (currentSong.paused) {
            currentSong.play();
            play.src = "assests/pause.svg";
        }
    })
    //add event listener to for prev button
    prev.addEventListener("click", () => {
        currentSong.pause();
        let currentSongTitle = document.querySelector(".songinfo").innerHTML.split(" - ")[0];
        let index = songs.findIndex(song => song.title === currentSongTitle);
        if(index - 1 >= 0){
            playMusic(songs[index - 1]);
        }
    });

    //add event listener to for next button
    next.addEventListener("click", () => {
        currentSong.pause();
        let currentSongTitle = document.querySelector(".songinfo").innerHTML.split(" - ")[0];
        let index = songs.findIndex(song => song.title === currentSongTitle);
        if(index + 1 < songs.length){
            playMusic(songs[index + 1]);
        }
    });

    // Volume control
    const volumeIcon = document.querySelector("#volume-icon");
    const volumeSlider = document.querySelector("#volumeSlider");
    const volumeBarWrapper = document.querySelector(".volume-bar-wrapper");

    volumeIcon.addEventListener("mouseenter", () => {
        volumeBarWrapper.classList.add("show");
    });

    volumeIcon.addEventListener("mouseleave", () => {
        // Delay hiding to allow moving to volume bar
        setTimeout(() => {
            if (!volumeBarWrapper.matches(":hover")) {
                volumeBarWrapper.classList.remove("show");
            }
        }, 100);
    });

    volumeBarWrapper.addEventListener("mouseenter", () => {
        volumeBarWrapper.classList.add("show");
    });

    volumeBarWrapper.addEventListener("mouseleave", () => {
        volumeBarWrapper.classList.remove("show");
    });

    volumeSlider.addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
    });

    // Initialize volume
    currentSong.volume = 1;
}
main();