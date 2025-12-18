let currentSong = new Audio();

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
function playMusic(track) {
    // let audio = new audio(`/songs/${track}`);
    currentSong.src = `/songs/${track}`;
    currentSong.play();
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ");
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    document.querySelector("#play").src = "assests/play.svg";
}
async function fetchSongs() {
    try {
        let a = await fetch("http://127.0.0.1:5500/songs/")
        let response = await a.text();
        console.log("Response:", response);

        let div = document.createElement("div");
        div.innerHTML = response;

        let as = div.getElementsByTagName("a");
        let songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href.split("/songs/")[1]);
            }

        }
        console.log("Songs found:", songs);
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
    const playMusic = (track, pause = false) => {
        // let audio = new audio(`/songs/${track}`);
        currentSong.src = `/songs/${track}`;
        if (!pause) {
            currentSong.play();
            play.src = "assests/pause.svg";

        }
        document.querySelector(".songinfo").innerHTML = "track"
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    }
}

async function main() {


    let songs = await fetchSongs()
    console.log(songs);
    playMusic(songs[0], true);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    // songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <li class="songRow">
                            <img src="assests/music.svg" alt="musiclogo">
                            <div class="info">
                                <div class="name">${song.replaceAll("%20", " ")}</div>
                                <div class="artist">artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>

                                <img src="assests/play.svg" alt="playbtn">
                            </div>
                        </li></li>`;

    }
    // add event listener to playnow button
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())




        })
    })

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
        document.querySelector(".circle").style.left =(e.offsetX/e.getBoundingClientRect().width) * 100 + "%";
    })
}
main();