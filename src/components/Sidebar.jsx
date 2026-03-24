import React from 'react';
import { getArtistImage } from '../utils';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, library, onPlayLibrarySong, favorites }) => {
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
                <img src={getArtistImage(song.artist)} alt="art" style={{borderRadius: '4px', objectFit: 'cover'}} />
                <div className="info">
                  <div className="name">{song.title}</div>
                  <div className="artist">{song.artist}</div>
                </div>
                <div className="playnow">
                  <span>Play now</span>
                  <img src="/assests/play.svg" alt="playbtn" />
                </div>
              </li>
            ))}
            {library.length === 0 && (
              <p className="empty-library">Select an artist to view songs</p>
            )}
          </ul>
        </div>
      </section>

      <section className="library" style={{ borderTop: '1px solid #282828', marginTop: '16px', paddingTop: '16px', flex: 1 }}>
        <h2>Your Favorites</h2>
        <div className="songlist">
          <ul>
            {favorites.map((song, index) => (
              <li 
                key={`fav-${index}`} 
                className="songRow" 
                onClick={() => {
                  onPlayLibrarySong(song);
                  setIsMobileMenuOpen(false);
                }}
              >
                <img src={getArtistImage(song.artist)} alt="art" style={{borderRadius: '4px', objectFit: 'cover'}} />
                <div className="info">
                  <div className="name">{song.title}</div>
                  <div className="artist">{song.artist}</div>
                </div>
                <div className="playnow">
                  <span>Play now</span>
                  <img src="/assests/play.svg" alt="playbtn" />
                </div>
              </li>
            ))}
            {favorites.length === 0 && (
              <p className="empty-library" style={{marginTop: '16px'}}>No favorites yet</p>
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
