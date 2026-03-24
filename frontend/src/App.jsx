import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Playbar from './components/Playbar';
import './index.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [library, setLibrary] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (song) => {
    setFavorites(prev => {
      if (prev.some(s => s.title === song.title)) {
        return prev.filter(s => s.title !== song.title);
      }
      return [...prev, song];
    });
  };
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Fetch songs on mount
    const fetchSongs = async () => {
      try {
        const response = await fetch('/song.json');
        if (response.ok) {
          const songs = await response.json();
          setAllSongs(songs);
          
          // Default to Fossils
          const defaultSongs = songs.filter(song => song.artist === "Fossils");
          setLibrary(defaultSongs);
          if (defaultSongs.length > 0) {
            setCurrentSong(defaultSongs[0]);
            audioRef.current.src = defaultSongs[0].audioUrl;
            // Preload metadata to get duration
            audioRef.current.load();
          }
        }
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };
    
    fetchSongs();

    // Audio event listeners
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.pause();
    };
  }, []);

  const handleArtistSelect = (artistName) => {
    const artistSongs = allSongs.filter(song => song.artist === artistName);
    setLibrary(artistSongs);
    if (artistSongs.length > 0) {
      handlePlaySong(artistSongs[0]);
    }
  };

  const handlePlaySong = (song) => {
    if (currentSong?.title === song.title && currentSong?.artist === song.artist) {
      // Toggle play/pause if same song
      handleTogglePlay();
      return;
    }
    
    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  function handleNext() {
    if (library.length === 0 || !currentSong) return;
    const currentIndex = library.findIndex(s => s.title === currentSong.title);
    const nextIndex = (currentIndex + 1) % library.length;
    handlePlaySong(library[nextIndex]);
  }

  const handlePrev = () => {
    if (library.length === 0 || !currentSong) return;
    
    // If progress is more than 3 sec, restart song
    if (progress > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    
    const currentIndex = library.findIndex(s => s.title === currentSong.title);
    const prevIndex = (currentIndex - 1 + library.length) % library.length;
    handlePlaySong(library[prevIndex]);
  };

  const handleSeek = (newTime) => {
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleNextRef = useRef();
  useEffect(() => {
    handleNextRef.current = handleNext;
  });

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      if (handleNextRef.current) handleNextRef.current();
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  // Sync volume state to audio element
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div className="app-container">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        library={library}
        onPlayLibrarySong={handlePlaySong}
        favorites={favorites}
      />
      
      <MainContent 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onArtistSelect={handleArtistSelect}
      />
      
      <Playbar 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        progress={progress}
        duration={duration || 0}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={setVolume}
        isFavorite={currentSong ? favorites.some(s => s.title === currentSong.title) : false}
        onToggleFavorite={() => currentSong && handleToggleFavorite(currentSong)}
      />
    </div>
  );
}

export default App;
