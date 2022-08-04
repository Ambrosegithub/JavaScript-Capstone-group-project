/* eslint-disable quotes */
/* jshint camelcase: false */
/* eslint-disable camelcase */
import api_mock from '../__mock__/api_mock.json';
import movies from '../__mock__/countMovies';
import comments from '../__mock__/countComments'

const movieComments = [
  {
    username: "Jhon",
    comment: "Wowww...",
  },
  {
    username: "Maria",
    comment: "Cool",
  },
  {
    username: "Peter",
    comment: "Nice movie",
  },
];

describe("Test Number of movies and comments", () => {
  test("test number of movies", () => {
    expect(movies(api_mock)).toBe(10);
  });

  test("Test Number of comments", () => {
    expect(comments(movieComments)).toBe(3);
  });

});
