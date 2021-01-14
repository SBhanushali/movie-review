const {
  extractData,
  addMovie,
  addUser,
  addReview,
  topMovieInYear,
  topMovieInYearByUser,
  topMovieInYearByGenre,
  topMovieInYearByUserAndGenre,
  topMovieByAvgReviewScore,
} = require("./functions");

addMovie('"Don" released in Year 2006 for Genres "Action" & "Comedy"');
addMovie('"Tiger" released in Year 2008 for Genre "Drama"');
addMovie('"Padmaavat" released in Year 2006 for Genre "Comedy"');
addMovie('"Lunchbox" released in Year 2021 for Genre "Drama"');
addMovie('"Guru" released in Year 2006 for Genre "Drama"');
addMovie('"Metro" released in Year 2006 for Genre "Romance"');

addUser("SRK");
addUser("Salman");
addUser("Deepika");

addReview("SRK", "Don", 2);
addReview("SRK", "Padmaavat", 8);
addReview("Salman", "Don", 5);
addReview("Deepika", "Don", 9);
addReview("Deepika", "Guru", 6);
// addReview("SRK", "Don", 10);
// addReview("Deepika", "Lunchbox", 5);
addReview("SRK", "Tiger", 5);
addReview("SRK", "Metro", 7);

console.log(topMovieInYear(2006));
console.log(topMovieInYearByUserAndGenre(2006, "viewer", "Drama"));
console.log(topMovieInYearByUser(2006, "critic"));
console.log(topMovieInYearByGenre(2006, "Drama"));
topMovieByAvgReviewScore(2006);
