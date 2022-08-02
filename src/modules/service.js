const showsBaseUrl = 'https://api.tvmaze.com/search/shows?q=girls';
const likesBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dJUZAxNGSAzuOwOz1Flo/likes/';

export const getAllMovies = async () => {
  const response = (await fetch(showsBaseUrl)).json();
  return response;
};

export const getAllLikes = async () => {
  const response = (await fetch(likesBaseUrl)).json();
  return response;
};

export const addLikes = async (id) => {
  await fetch(likesBaseUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
