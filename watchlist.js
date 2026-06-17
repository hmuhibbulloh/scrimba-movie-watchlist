import getMovieById from "./app.js";

document.addEventListener("DOMContentLoaded", async (e) => {
  renderMoviesFromLocalStorage();
});

async function renderMoviesFromLocalStorage() {
  const movieIdsLS = JSON.parse(localStorage.getItem("movies"));
  let moviesHtml = "";
  for (const movieId of movieIdsLS) {
    const movieDetails = await getMovieById(movieId);
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
          <i data-movie-id="${movieDetails.imdbID}" class="fa-solid fa-remove">Remove from watchlist</i>
        </div>
        
      </div>
    `;
  }
  document.querySelector(".watchlist-main").innerHTML = moviesHtml;
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".fa-remove")) {
    if (localStorage.getItem("movies")) {
      const movieIds = JSON.parse(localStorage.getItem("movies"));
      const newMovieIds = movieIds.filter(
        (id) => id != e.target.dataset.movieId,
      );
      localStorage.setItem("movies", JSON.stringify(newMovieIds));
    } else {
      const movieIds = [];
      movieIds.push(e.target.dataset.movieId);
      localStorage.setItem("movies", JSON.stringify(movieIds));
    }
    renderMoviesFromLocalStorage();
  }
});
