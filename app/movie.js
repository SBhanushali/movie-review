class Movie {
  constructor(movieName, year, genre) {
    this.name = movieName;
    this.year = year;
    this.genre = genre;
    this.ratedBy = {
      viewer: [],
      critic: [],
      expert: [],
      admin: [],
    };
    this.rating = {
      viewer: 0,
      critic: 0,
      expert: 0,
      admin: 0,
    };
  }

  incrementReviewBy(userName, userRole, multiplier, rating) {
    this.rating[userRole] += multiplier * rating;
    this.ratedBy[userRole].push(userName);
  }

  getTotalRating() {
    return (
      this.rating.viewer +
      this.rating.critic +
      this.rating.expert +
      this.rating.admin
    );
  }
  getTotalReviews() {
    return (
      this.ratedBy.viewer.length +
      this.ratedBy.critic.length +
      this.ratedBy.expert.length +
      this.ratedBy.admin.length
    );
  }
}

module.exports = Movie;
