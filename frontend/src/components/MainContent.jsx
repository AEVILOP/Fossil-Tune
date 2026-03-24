import React, { useState } from 'react';

const Card = ({ artist, image, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="play-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
          <circle cx="12" cy="12" r="10" fill="#1DB954" />
          <path
            d="M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 11.8639 16.0182 12.1361 15.9453 12.3948Z"
            fill="#000000" />
        </svg>
      </div>
      <img src={image} alt={`${artist} playlist`} />
      <h2>{artist}</h2>
      <p>{description}</p>
    </div>
  );
};

const MainContent = ({ setIsMobileMenuOpen, onArtistSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const artists = [
    { name: 'Fossils', image: '/assests/fossils1.jpg', description: 'Rupam Islam, fossils' },
    { name: 'Anjan Dutt', image: '/assests/Anjan_Dutt.jpg', description: 'Anjan Dutt, band' },
    { name: 'Anupam Roy', image: '/assests/Anupam_Roy_007_20250623084828_500x500.jpg', description: 'Anupam Roy, band' },
    { name: 'Bhoomi', image: '/assests/bhoomi.jpg', description: 'Bhoomi, band' },
    { name: 'Chandrabindoo', image: '/assests/chandrabindoo.jpg', description: 'Chandrabindoo, band' },
    { name: 'James', image: '/assests/james.jpg', description: 'James, band' },
    { name: 'Silajit', image: '/assests/silajit.jpg', description: 'Silajit, band' }
  ];

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <header className="topbar">
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(true)}>
          <img src="/assests/hamburger.svg" alt="menu" />
        </div>
        
        <div className="search-wrapper">
          <button className="search-btn">
            <img src="/assests/search.svg" alt="search" />
          </button>
          <input 
            type="text" 
            className="search-input" 
            placeholder="What do you want to listen to?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="playlists-container">
        <h1>Fossiltune Playlists</h1>
        
        <div className="card-grid">
          {filteredArtists.map((artist, index) => (
            <Card 
              key={index}
              artist={artist.name}
              image={artist.image}
              description={artist.description}
              onClick={() => onArtistSelect(artist.name)}
            />
          ))}
          {filteredArtists.length === 0 && (
            <p className="no-results">No artists found matching "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
