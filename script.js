const movieTitleInput = document.getElementById('movieTitle');
const movieInfo = document.getElementById('movieInfo');

async function fetchMovieInfo(movieTitle) {
  const response = await fetch(
    `https://www.omdbapi.com/?t=${movieTitle}&apikey=258a2345`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    throw new Error('Error fetching movie data.');
  }
}

function formatMovieData(movie) {
  return `
    <h2>${movie.Title}</h2>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <img src="${movie.Poster}" alt="Movie Poster">
  `;
}

function displayMovieInfo(movieTitle) {
  movieInfo.innerHTML = 'Loading...';
  fetchMovieInfo(movieTitle)
    .then((movieData) => {
      const formattedMovieData = formatMovieData(movieData);
      movieInfo.innerHTML = formattedMovieData;
    })
    .catch((error) => {
      console.error('Error:', error);
      movieInfo.innerHTML = `<p>Error fetching movie data. Please try again later.</p>`;
    });
}

function getMovieInfo() {
  const movieTitle = movieTitleInput.value;
  displayMovieInfo(movieTitle);
}
