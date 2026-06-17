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
    if (localStorage.getItem("movieIds")) {
      const movieIds = JSON.parse(localStorage.getItem("movies"));
      movieIds.push(e.target.dataset.movieId);
      localStorage.setItem("movies", JSON.stringify(movieIds));
      console.log("AAA");
    } else {
      const movieIds = [];
      movieIds.push(e.target.dataset.movieId);
      localStorage.setItem("movies", JSON.stringify(movieIds));
    }
    console.log(JSON.parse(localStorage.getItem("movies")));
  }
});

// {
//   "Title": "Blade Runner 2049",
//   "Year": "2017",
//   "Rated": "R",
//   "Released": "06 Oct 2017",
//   "Runtime": "164 min",
//   "Genre": "Action, Drama, Mystery",
//   "Director": "Denis Villeneuve",
//   "Writer": "Hampton Fancher, Michael Green, Philip K. Dick",
//   "Actors": "Harrison Ford, Ryan Gosling, Ana de Armas",
//   "Plot": "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
//   "Language": "English",
//   "Country": "Spain, Canada, United States",
//   "Awards": "Won 2 Oscars. 100 wins & 164 nominations total",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_QL75_UX380_CR0,0,380,562_.jpg",
//   "Ratings": [
//     {
//       "Source": "Internet Movie Database",
//       "Value": "8.0/10"
//     },
//     {
//       "Source": "Rotten Tomatoes",
//       "Value": "88%"
//     },
//     {
//       "Source": "Metacritic",
//       "Value": "81/100"
//     }
//   ],
//   "Metascore": "81",
//   "imdbRating": "8.0",
//   "imdbVotes": "751,317",
//   "imdbID": "tt1856101",
//   "Type": "movie",
//   "DVD": "N/A",
//   "BoxOffice": "$92,071,675",
//   "Production": "N/A",
//   "Website": "N/A",
//   "Response": "True"
// }
export default getMovieById;
