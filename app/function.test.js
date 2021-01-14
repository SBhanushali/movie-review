const { movies, users } = require("./data");

const User = require("./user");
const Movie = require("./movie");

const {
  addMovie,
  addUser,
  addReview,
  topNMovieInYear,
  topNMovieInYearByUser,
  topNMovieByGenre,
  topNMovieByUserAndGenre,
  avgReviewScoreInYear,
  avgReviewScoreInGenre,
  avgReviewScoreInMovie,
} = require("./functions");

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

test("Adding Movie Don", () => {
  addMovie('"Don" released in Year 2006 for Genres "Action" & "Comedy"');
  expect(movies).toContainObject({
    name: "Don",
    year: 2006,
    genre: ["Action", "Comedy"],
  });
});

test("Adding movie Tiger", () => {
  addMovie('"Tiger" released in Year 2008 for Genre "Drama"');
  expect(movies).toContainObject({
    name: "Tiger",
    year: 2008,
    genre: ["Drama"],
  });
});

test("Adding movie Padmaavat", () => {
  addMovie('"Padmaavat" released in Year 2006 for Genre "Comedy"');
  expect(movies).toContainObject({
    name: "Padmaavat",
    year: 2006,
    genre: ["Comedy"],
  });
});

test("Adding movie Lunchbox", () => {
  addMovie('"Lunchbox" released in Year 2021 for Genre "Drama"');
  expect(movies).toContainObject({
    name: "Lunchbox",
    year: 2021,
    genre: ["Drama"],
  });
});

test("Adding movie Guru", () => {
  addMovie('"Guru" released in Year 2006 for Genre "Drama"');
  expect(movies).toContainObject({
    name: "Guru",
    year: 2006,
    genre: ["Drama"],
  });
});

test("Adding movie Metro", () => {
  addMovie('"Metro" released in Year 2006 for Genre "Romance"');
  expect(movies).toContainObject({
    name: "Metro",
    year: 2006,
    genre: ["Romance"],
  });
});

test("Adding user SRK", () => {
  addUser("SRK");
  expect(users).toContainObject({
    name: "SRK",
  });
});

test("Adding user Salman", () => {
  addUser("Salman");
  expect(users).toContainObject({
    name: "Salman",
  });
});

test("Adding user Deepika", () => {
  addUser("Deepika");
  expect(users).toContainObject({
    name: "Deepika",
  });
});

test("Add review 2 for Don by SRK", () => {
  addReview("SRK", "Don", 2);
  expect(movies).toContainObject({
    name: "Don",
    year: 2006,
    genre: ["Action", "Comedy"],
    ratedBy: {
      viewer: ["SRK"],
      critic: [],
      expert: [],
      admin: [],
    },
    rating: { viewer: 2, critic: 0, expert: 0, admin: 0 },
  });
});

test("Add review 8 for Padmaavat by SRK", () => {
  addReview("SRK", "Padmaavat", 8);
  expect(movies).toContainObject({
    name: "Padmaavat",
    year: 2006,
    genre: ["Comedy"],
    ratedBy: { viewer: ["SRK"], critic: [], expert: [], admin: [] },
    rating: { viewer: 8, critic: 0, expert: 0, admin: 0 },
  });
});

test("Add review 5 for Don by Salman", () => {
  addReview("Salman", "Don", 5);
  expect(movies).toContainObject({
    name: "Don",
    year: 2006,
    genre: ["Action", "Comedy"],
    ratedBy: {
      viewer: ["SRK", "Salman"],
      critic: [],
      expert: [],
      admin: [],
    },
    rating: { viewer: 7, critic: 0, expert: 0, admin: 0 },
  });
});

test("Add review 9 for Don by Deepika", () => {
  addReview("Deepika", "Don", 9);
  expect(movies).toContainObject({
    name: "Don",
    year: 2006,
    genre: ["Action", "Comedy"],
    ratedBy: {
      viewer: ["SRK", "Salman", "Deepika"],
      critic: [],
      expert: [],
      admin: [],
    },
    rating: { viewer: 16, critic: 0, expert: 0, admin: 0 },
  });
});

test("Add review 6 for Guru by Deepika", () => {
  addReview("Deepika", "Guru", 6);
  expect(movies).toContainObject({
    name: "Guru",
    year: 2006,
    genre: ["Drama"],
    ratedBy: { viewer: ["Deepika"], critic: [], expert: [], admin: [] },
    rating: { viewer: 6, critic: 0, expert: 0, admin: 0 },
  });
});

test("Add multiple review for Don by SRK", () => {
  let thrownError;
  try {
    addReview("SRK", "Don", 10);
  } catch (error) {
    thrownError = error;
  }
  expect(thrownError).toBe("Exception multiple reviews not allowed");
});

test("Add review for unreleased movie", () => {
  let thrownError;
  try {
    addReview("Deepika", "Lunchbox", 5);
  } catch (error) {
    thrownError = error;
  }
  expect(thrownError).toBe("Exception movie yet to be released");
});

test("Add review 5 for Tiger by SRK", () => {
  addReview("SRK", "Tiger", 5);
  expect(movies).toContainObject({
    name: "Tiger",
    year: 2008,
    genre: ["Drama"],
    ratedBy: { viewer: ["SRK"], critic: [], expert: [], admin: [] },
    rating: { viewer: 5, critic: 0, expert: 0, admin: 0 },
  });
});

test("Add review 7 for Metro by SRK", () => {
  addReview("SRK", "Metro", 7);
  expect(movies).toContainObject({
    name: "Metro",
    year: 2006,
    genre: ["Romance"],
    ratedBy: { viewer: [], critic: ["SRK"], expert: [], admin: [] },
    rating: { viewer: 0, critic: 14, expert: 0, admin: 0 },
  });
});

test("List top 0 movie by review score in '2006' year", () => {
  let thrownError;
  try {
    topNMovieInYear(2006, 0);
  } catch (error) {
    thrownError = error;
  }

  expect(thrownError).toBe("Exception N should be greater than 0");
});

test("List top 2 movie by review score in '2006' year", () => {
  expect(topNMovieInYear(2006, 2)).toEqual(
    expect.arrayContaining([
      {
        name: "Don",
        year: 2006,
        genre: ["Action", "Comedy"],
        ratedBy: {
          viewer: ["SRK", "Salman", "Deepika"],
          critic: [],
          expert: [],
          admin: [],
        },
        rating: { viewer: 16, critic: 0, expert: 0, admin: 0 },
      },
      {
        name: "Metro",
        year: 2006,
        genre: ["Romance"],
        ratedBy: { viewer: [], critic: ["SRK"], expert: [], admin: [] },
        rating: { viewer: 0, critic: 14, expert: 0, admin: 0 },
      },
    ])
  );
});

test("List top 1 movies by total review score by ‘viewer’ in a particular year of release 2006", () => {
  expect(topNMovieInYearByUser(2006, "viewer", 1)).toEqual(
    expect.arrayContaining([
      {
        name: "Don",
        year: 2006,
        genre: ["Action", "Comedy"],
        ratedBy: {
          viewer: ["SRK", "Salman", "Deepika"],
          critic: [],
          expert: [],
          admin: [],
        },
        rating: { viewer: 16, critic: 0, expert: 0, admin: 0 },
      },
    ])
  );
});

test("List top 2 movies by total review score by ‘viewer’ in a particular genre Drama", () => {
  expect(topNMovieByUserAndGenre("viewer", "Drama", 2)).toEqual(
    expect.arrayContaining([
      {
        name: "Guru",
        year: 2006,
        genre: ["Drama"],
        ratedBy: { viewer: ["Deepika"], critic: [], expert: [], admin: [] },
        rating: { viewer: 6, critic: 0, expert: 0, admin: 0 },
      },
      {
        name: "Tiger",
        year: 2008,
        genre: ["Drama"],
        ratedBy: { viewer: ["SRK"], critic: [], expert: [], admin: [] },
        rating: { viewer: 5, critic: 0, expert: 0, admin: 0 },
      },
    ])
  );
});

test("List top 1 movies by total review score by ‘critics’ in a particular year of release 2006", () => {
  expect(topNMovieInYearByUser(2006, "critic", 1)).toEqual(
    expect.arrayContaining([
      {
        name: "Metro",
        year: 2006,
        genre: ["Romance"],
        ratedBy: { viewer: [], critic: ["SRK"], expert: [], admin: [] },
        rating: { viewer: 0, critic: 14, expert: 0, admin: 0 },
      },
    ])
  );
});

test("List top 2 movies by total review score by ‘critic’ in a particular genre Drama", () => {
  expect(topNMovieByUserAndGenre("critic", "Drama", 2)).toEqual([]);
});

test("Average review score in particular year of release 2006", () => {
  expect(avgReviewScoreInYear(2006)).toBe("7.33");
});

test("Average review score in a particular genre Comedy", () => {
  expect(avgReviewScoreInGenre("Comedy")).toBe("12.00");
});

test("Average review score for a particular movie Don", () => {
  expect(avgReviewScoreInMovie("Don")).toBe("5.33");
});
