/* eslint-disable quotes */
/* jshint camelcase: false */
/* eslint-disable camelcase */
import api_mock from '../__mock__/api_mock.json';
import movies from '../__mock__/countMovies';

describe("Test Number of movies and comments", () => {
  test("test number of movies", () => {
    expect(movies(api_mock)).toBe(10);
  });
});
