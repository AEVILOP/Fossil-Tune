export const getArtistImage = (artistName) => {
  const map = {
    'Fossils': '/assests/fossils1.jpg',
    'Anjan Dutt': '/assests/Anjan_Dutt.jpg',
    'Anupam Roy': '/assests/Anupam_Roy_007_20250623084828_500x500.jpg',
    'Bhoomi': '/assests/bhoomi.jpg',
    'Chandrabindoo': '/assests/chandrabindoo.jpg',
    'James': '/assests/james.jpg',
    'Silajit': '/assests/silajit.jpg'
  };
  return map[artistName] || '/assests/music.svg';
};
