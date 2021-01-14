const { movies, users } = require("./data");

const User = require("./user");
const Movie = require("./movie");
/**
 * Extract name, release year, genre from input string
 * @param  {String} movieString
 * @returns {Array} movieName, year, genre
 */
const extractData = (movieString) => {
  let arr = [];
  let pattern = /"(.*?)"/g;
  const year = parseInt(/\Year (.+?)\s/.exec(movieString)[1]);
  while ((current = pattern.exec(movieString))) {
    arr.push(current[1]);
  }

  let [movieName, ...genre] = arr;

  return [movieName, year, genre];
};
/**
 * Pushes movie object to movies array
 * @param  {Array} movieDetail having movieName, year, genre
 * @return {void}
 */
const addMovie = (movieDetail) => {
  const [movieName, year, genre] = extractData(movieDetail);
  let movie = new Movie(movieName, year, genre);
  movies.push(movie);
};
/**
 * Pushes user object to users array
 * @param  {String} name
 * @returns {void}
 */
const addUser = (name) => {
  let user = new User(name);
  users.push(user);
};
/**
 * To Calculate current year
 * @returns {} current Year
 */
const getCurrentYear = () => {
  let date = new Date();
  return date.getFullYear();
};
/**
 * Adds review for a particular movie
 * @param  {String} name Name of user
 * @param  {String} movieName Name of movie for review
 * @param  {Number} rating Score by user
 */
const addReview = (name, movieName, rating) => {
  if (rating < 1 && rating > 10) {
    throw "out of rating bounds";
  }
  const movie = movies.find((mov) => mov.name === movieName);
  if (movie.year > getCurrentYear() - 1) {
    throw "Exception movie yet to be released";
  }
  const user = users.find((u) => u.name === name);
  if (user.getMovieReviewed().includes(movieName)) {
    throw "Exception multiple reviews not allowed";
  }

  if (
    user.getMoviesReviewedCount() > 0 &&
    (user.getMoviesReviewedCount() % 3) + 1 === 1
  ) {
    user.upgradeRole();
  }

  movie.incrementReviewBy(user.name, user.role, user.multiplier, rating);
  user.addMovieReviewed(movieName);
};
/**
 * Get top N movies in a particular year
 * @param  {Number} year Movie released in particular year
 * @param  {Number} n Number of movies
 * @returns {Array<Object>} Top N movies by particular year
 */
const topNMovieInYear = (year, n) => {
  if (n > 0) {
    let topMovies = [];
    movies.forEach((movie) => {
      if (movie.year === year) {
        topMovies.push(movie);
      }
    });

    return topMovies
      .sort(
        (movie1, movie2) => movie2.getTotalRating() - movie1.getTotalRating()
      )
      .slice(0, n);
  } else {
    throw "Exception N should be greater than 0";
  }
};
/**
 * Get top N movies in a particular year by certain type of user
 * @param  {Number} year Movie released in particular year
 * @param  {String} userType Current role of user
 * @param  {Number} n Number of movies
 * @returns {Array<Object>} Top N movies by particular year by certain type of user
 */
const topNMovieInYearByUser = (year, userType, n) => {
  if (n > 0) {
    let topMovies = [];
    movies.forEach((movie) => {
      if (movie.year === year && movie.rating[userType] > 0) {
        topMovies.push(movie);
      }
    });
    return topMovies
      .sort(
        (movie1, movie2) => movie2.rating[userType] - movie1.rating[userType]
      )
      .slice(0, n);
  } else {
    throw "Exception N should be greater than 0";
  }
};
/**
 * Top N movies in particular genre
 * @param  {String} genre Genre of movie
 * @param  {Number} n Number of movies
 * @returns {Array<Object>} Top N movies in particular genre
 */
const topNMovieByGenre = (genre, n) => {
  if (n > 0) {
    let topMovies = [];
    movies.forEach((movie) => {
      if (movie.genre.includes(genre)) {
        topMovies.push(movie);
      }
    });
    return topMovies
      .sort(
        (movie1, movie2) => movie2.getTotalRating() - movie1.getTotalRating()
      )
      .slice(0, n);
  } else {
    throw "Exception N should be greater than 0";
  }
};
/**
 * Top N movies in particular user in selected genre
 * @param  {String} userType Current role of user
 * @param  {String} genre Genre of movie
 * @param  {Number} n Number of movies
 * @returns {Array<Object>} Top N movies in particular user in selected genre
 */
const topNMovieByUserAndGenre = (userType, genre, n) => {
  if (n > 0) {
    let topMovies = [];
    movies.forEach((movie) => {
      if (movie.rating[userType] > 0 && movie.genre.includes(genre)) {
        topMovies.push(movie);
      }
    });
    return topMovies
      .sort(
        (movie1, movie2) => movie2.rating[userType] - movie1.rating[userType]
      )
      .slice(0, n);
  } else {
    throw "Exception N should be greater than 0";
  }
};
/**
 * Calculate average review in particular year
 * @param  {Number} year Movie released in particular year
 * @returns {String} Average score review by year
 */
const avgReviewScoreInYear = (year) => {
  let avgRatingScore = 0;
  let avgReviews = 0;
  movies.forEach((movie) => {
    if (movie.year === year) {
      avgRatingScore += movie.getTotalRating();
      avgReviews += movie.getTotalReviews();
    }
  });
  let average = avgRatingScore / avgReviews;
  return average.toFixed(2);
};
/**
 * Calculate average review in selected genre
 * @param  {String} genre Selected genre
 * @returns {String} Average review score by genre
 */
const avgReviewScoreInGenre = (genre) => {
  let tempMovies = [];
  let score = 0;
  movies.forEach((movie) => {
    if (movie.genre.includes(genre)) {
      tempMovies.push(movie);
      score += movie.getTotalRating();
    }
  });
  return (score / tempMovies.length).toFixed(2);
};
/**
 * Calculate average review by movie name
 * @param  {String} movieName Name of movie
 * @returns {String} Average review score of movie
 */
const avgReviewScoreInMovie = (movieName) => {
  let [movieForAvg] = movies.filter((movie) => {
    return movie.name === movieName;
  });
  return (movieForAvg.getTotalRating() / movieForAvg.getTotalReviews()).toFixed(
    2
  );
};

module.exports = {
  extractData,
  addMovie,
  addUser,
  getCurrentYear,
  addReview,
  topNMovieInYear,
  topNMovieInYearByUser,
  topNMovieByGenre,
  topNMovieByUserAndGenre,
  avgReviewScoreInYear,
  avgReviewScoreInGenre,
  avgReviewScoreInMovie,
};
