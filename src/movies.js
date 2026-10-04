const POSTER_BASE = 'https://upload.wikimedia.org/wikipedia/en/';

const movies = [
  { title: 'The Shawshank Redemption', poster: '8/81/ShawshankRedemptionMoviePoster.jpg', year: 1994, genre: 'Drama', rating: 9.3, emoji: '🔒', description: 'Two imprisoned men bond over years, finding solace and redemption through acts of decency.' },
  { title: 'The Godfather', poster: '1/1c/Godfather_ver1.jpg', year: 1972, genre: 'Crime', rating: 9.2, emoji: '🌹', description: 'The aging patriarch of a crime dynasty hands control to his reluctant son.' },
  { title: 'The Dark Knight', poster: '1/1c/The_Dark_Knight_%282008_film%29.jpg', year: 2008, genre: 'Action', rating: 9.0, emoji: '🦇', description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.' },
  { title: 'Pulp Fiction', poster: '3/3b/Pulp_Fiction_%281994%29_poster.jpg', year: 1994, genre: 'Crime', rating: 8.9, emoji: '🍔', description: 'Interlocking stories of mobsters, a boxer, and small-time criminals in Los Angeles.' },
  { title: 'Inception', poster: '2/2e/Inception_%282010%29_theatrical_poster.jpg', year: 2010, genre: 'Sci-Fi', rating: 8.8, emoji: '🌀', description: 'A thief who steals secrets through dreams is tasked with planting an idea instead.' },
  { title: 'Forrest Gump', poster: '6/67/Forrest_Gump_poster.jpg', year: 1994, genre: 'Drama', rating: 8.8, emoji: '🏃', description: 'A kind-hearted man witnesses and shapes decades of American history.' },
  { title: 'The Matrix', poster: 'd/db/The_Matrix.png', year: 1999, genre: 'Sci-Fi', rating: 8.7, emoji: '💊', description: 'A hacker learns reality is a simulation and joins the rebellion against its controllers.' },
  { title: 'Spirited Away', poster: 'd/db/Spirited_Away_Japanese_poster.png', year: 2001, genre: 'Animation', rating: 8.6, emoji: '🐉', description: 'A girl wanders into a world of spirits and must free her parents from a witch’s spell.' },
  { title: 'Interstellar', poster: 'b/bc/Interstellar_film_poster.jpg', year: 2014, genre: 'Sci-Fi', rating: 8.7, emoji: '🪐', description: 'Explorers travel through a wormhole in search of a new home for humanity.' },
  { title: 'Parasite', poster: '5/53/Parasite_%282019_film%29.png', year: 2019, genre: 'Thriller', rating: 8.5, emoji: '🪨', description: 'A poor family schemes its way into the lives of a wealthy household.' },
  { title: 'Back to the Future', poster: 'd/d2/Back_to_the_Future.jpg', year: 1985, genre: 'Adventure', rating: 8.5, emoji: '⏰', description: 'A teenager is sent 30 years into the past in a time-traveling DeLorean.' },
  { title: 'The Lion King', poster: '3/3d/The_Lion_King_poster.jpg', year: 1994, genre: 'Animation', rating: 8.5, emoji: '🦁', description: 'A young lion prince flees his kingdom and must return to reclaim his place.' },
  { title: 'Gladiator', poster: 'f/fb/Gladiator_%282000_film_poster%29.png', year: 2000, genre: 'Action', rating: 8.5, emoji: '⚔️', description: 'A betrayed Roman general fights as a gladiator to avenge his family.' },
  { title: 'Jurassic Park', poster: 'e/e7/Jurassic_Park_poster.jpg', year: 1993, genre: 'Adventure', rating: 8.2, emoji: '🦖', description: 'Cloned dinosaurs escape their enclosures at a remote island theme park.' },
  { title: 'Toy Story', poster: '1/13/Toy_Story.jpg', year: 1995, genre: 'Animation', rating: 8.3, emoji: '🤠', description: 'A cowboy doll feels threatened when a flashy space ranger becomes the favorite toy.' },
  { title: 'Get Out', poster: 'a/a3/Get_Out_poster.png', year: 2017, genre: 'Horror', rating: 7.8, emoji: '☕', description: 'A young man uncovers a disturbing secret while visiting his girlfriend’s family.' },
  { title: 'Mad Max: Fury Road', poster: '6/6e/Mad_Max_Fury_Road.jpg', year: 2015, genre: 'Action', rating: 8.1, emoji: '🔥', description: 'In a desert wasteland, a drifter and a rebel warrior flee a tyrant across the sands.' },
  { title: 'Superbad', poster: '8/8b/Superbad_Poster.png', year: 2007, genre: 'Comedy', rating: 7.6, emoji: '🍻', description: 'Two co-dependent high schoolers try to make the most of their last weeks before graduation.' },
  { title: 'La La Land', poster: 'a/ab/La_La_Land_%28film%29.png', year: 2016, genre: 'Romance', rating: 8.0, emoji: '🎹', description: 'A jazz pianist and an aspiring actress fall in love while chasing their dreams in LA.' },
  { title: 'Everything Everywhere All at Once', poster: '1/1e/Everything_Everywhere_All_at_Once.jpg', year: 2022, genre: 'Sci-Fi', rating: 7.8, emoji: '🥯', description: 'A laundromat owner must connect with parallel-universe versions of herself to save existence.' },
  { title: 'The Grand Budapest Hotel', poster: '1/1c/The_Grand_Budapest_Hotel.png', year: 2014, genre: 'Comedy', rating: 8.1, emoji: '🏨', description: 'A legendary concierge and his lobby boy get caught up in the theft of a priceless painting.' },
  { title: 'Alien', poster: 'c/c3/Alien_movie_poster.jpg', year: 1979, genre: 'Horror', rating: 8.5, emoji: '👽', description: 'The crew of a commercial spaceship is hunted by a deadly extraterrestrial.' },
  { title: 'Spider-Man: Into the Spider-Verse', poster: 'f/fa/Spider-Man_Into_the_Spider-Verse_poster.png', year: 2018, genre: 'Animation', rating: 8.4, emoji: '🕷️', description: 'Teen Miles Morales becomes Spider-Man and meets heroes from other dimensions.' },
  { title: 'Titanic', poster: '1/18/Titanic_%281997_film%29_poster.png', year: 1997, genre: 'Romance', rating: 7.9, emoji: '🚢', description: 'An aristocrat falls for a poor artist aboard the ill-fated R.M.S. Titanic.' },
];

for (const movie of movies) movie.poster = POSTER_BASE + movie.poster;

export default movies;
