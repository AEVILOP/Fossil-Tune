import React from 'react';
import { getArtistImage } from '../utils';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, library, onPlayLibrarySong }) => {
  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src="/assests/logo.svg" alt="logo" />
        </div>
        <button 
          className="close-btn" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img src="/assests/close.svg" alt="close" />
        </button>
      </div>

      <section className="library">
        <h2>Your Library</h2>
        <div className="songlist">
          <ul>
            {library.map((song, index) => (
              <li 
                key={index} 
                className="songRow" 
                onClick={() => {
                  onPlayLibrarySong(song);
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="track-index">{index + 1}</div>
                <img src={getArtistImage(song.artist)} alt="art" style={{borderRadius: '50%', objectFit: 'cover'}} />
                <div className="info">
                  <div className="name">{song.title}</div>
                  <div className="artist">{song.artist}</div>
                </div>
                <div className="playnow">
                  <button className="play-pause-btn">
                    <img src="/assests/play.svg" alt="playbtn" />
                  </button>
                </div>
              </li>
            ))}
            {library.length === 0 && (
              <p className="empty-library">Select an artist to view songs</p>
            )}
          </ul>
        </div>
      </section>


      <footer className="sidebar-footer">
        <div className="footer-content">
          <p>&copy; 2025 Fossiltune</p>
          <p>Created by Anirban Banerjee</p>
          <p>Joy rock</p>
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;
