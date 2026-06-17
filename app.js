const API_KEY = "a6b954e9";
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const formEl = document.querySelector(".movie-search-form");
const searchInputEl = document.querySelector(".search-input");

async function getMovie(title) {
  const res = await fetch(`${URL}&s=${title}`);
  const data = await res.json();
  return data.Search;
}

async function renderMovies(movies) {
  let moviesHtml = "";
  for (const movie of movies) {
    const movieDetails = await getMovieById(movie.imdbID);
    moviesHtml += `
    <div class="movie">
        <div class="movie-poster">
        <img src="${movieDetails.Poster}" />
        </div>
        <div class="movie-details">
          <h2 class="movie-title">${movieDetails.Title} <span class="rating">⭐${movieDetails.imdbRating}</span></h2>
          <div class="movie-stats">
            <span class="movie-duration">${movieDetails.Runtime}</span>
            <span class="movie-genre">${movieDetails.Genre}</span>
            <span class="add-watchlist"></span>
          </div>
          <p class="movie-plot">${movieDetails.Plot}</p>
          <i data-movie-id="${movieDetails.imdbID}" class="fa-solid fa-plus">Add to watchlist</i>
        </div>
        
      </div>
    `;
  }
  document.querySelector(".main").innerHTML = moviesHtml;
}

async function getMovieById(movieId) {
  const res = await fetch(`${URL}&i=${movieId}`);
  const data = await res.json();
  return data;
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movies = await getMovie(searchInputEl.value);
  renderMovies(movies);
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".fa-plus")) {
    if (localStorage.getItem("movies")) {
      const movieIds = JSON.parse(localStorage.getItem("movies"));
      movieIds.push(e.target.dataset.movieId);
      localStorage.setItem("movies", JSON.stringify(movieIds));
    } else {
      const movieIds = [];
      movieIds.push(e.target.dataset.movieId);
      localStorage.setItem("movies", JSON.stringify(movieIds));
    }
  }
});

export default getMovieById;
