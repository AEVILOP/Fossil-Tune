import React from 'react';
import { getArtistImage } from '../utils';

const Playbar = ({ 
  currentSong, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev,
  progress,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isFavorite,
  onToggleFavorite
}) => {
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  const handleSeekClick = (e) => {
    const bar = e.currentTarget;
    const clickX = e.clientX - bar.getBoundingClientRect().left;
    const newProgress = (clickX / bar.offsetWidth) * duration;
    onSeek(newProgress);
  };

  return (
    <div className="playbar">
      <div className="playbar-content">
        <div className="song-info-panel">
          {currentSong && (
            <>
              <img src={getArtistImage(currentSong.artist)} alt="cover" className="now-playing-img" style={{objectFit: 'cover', padding: 0}} />
              <div className="now-playing-text">
                <div className="title">{currentSong.title}</div>
                <div className="artist">{currentSong.artist}</div>
              </div>
              <button className="control-btn" onClick={onToggleFavorite} style={{ marginLeft: '16px', opacity: 1, display: 'flex' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill={isFavorite ? "var(--accent)" : "none"} stroke={isFavorite ? "var(--accent)" : "var(--text-subdued)"} strokeWidth="2" style={{ transition: 'all 0.2s' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button className="control-btn" onClick={onPrev}>
              <img src="/assests/prev.svg" alt="prev" />
            </button>
            <button className="play-pause-btn" onClick={onTogglePlay}>
              <img src={isPlaying ? "/assests/pause.svg" : "/assests/play.svg"} alt="play loop" />
            </button>
            <button className="control-btn" onClick={onNext}>
              <img src="/assests/next.svg" alt="next" />
            </button>
          </div>
          
          <div className="playback-bar">
            <span className="time">{formatTime(progress)}</span>
            <div className="progress-bar-bg" onClick={handleSeekClick}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              />
              <div 
                className="progress-thumb"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume-controls">
          <img src="/assests/volume.svg" alt="volume" className="volume-icon" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            style={{ background: `linear-gradient(to right, var(--accent) ${volume * 100}%, var(--bg-card-hover) ${volume * 100}%)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Playbar;
