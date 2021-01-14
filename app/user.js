const { roles } = require("./data");

class User {
  constructor(name) {
    this.name = name;
    this.role = roles[0];
    this.multiplier = 1;
    this.moviesReviewed = [];
  }

  getMovieReviewed() {
    return this.moviesReviewed;
  }

  getMoviesReviewedCount() {
    return this.moviesReviewed.length;
  }

  upgradeRole() {
    this.multiplier += 1;
    this.role = roles[this.multiplier - 1];
  }

  addMovieReviewed(movie) {
    this.moviesReviewed.push(movie);
  }
}

module.exports = User;
