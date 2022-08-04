const showsBaseUrl = 'https://api.tvmaze.com/search/shows?q=girls';
const likesBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mAdM57hR4etqPKaNuiYY/likes/';
const commentsBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mAdM57hR4etqPKaNuiYY/comments/';

export const getAllMovies = async () => {
  const response = (await fetch(showsBaseUrl)).json();
  return response;
};
/*
export const numberOfMovies = async () =>{
  const movies = await getAllMovies();
  return movies ? movies.length: 0;
}
*/
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

export const getAllCommentsByItemId = async (itemId) => {
  const response = (await fetch(`${commentsBaseUrl}?item_id=${itemId}`)).json();
  return response;
};

export const addComment = async (comment) => {
  await fetch(commentsBaseUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: comment.id,
      username: comment.userName,
      comment: comment.userComment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
