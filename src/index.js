import './index.css';
/* eslint-disable import/prefer-default-export */
import { Display } from './modules/display.js';
import {
  addLikes, getAllLikes, getAllMovies, addComment,
} from './modules/service.js';
import Comment from './modules/comment.js';

await Display();

const shows = await getAllMovies();
const likes = await getAllLikes();
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const image = document.getElementById('img-detail');
const btnModalComments = document.querySelectorAll('#modal-comments');
const total = document.querySelectorAll('.likeId');
const btnLikes = document.querySelectorAll('#btnLikes');
const formComments = document.querySelectorAll('.formComment');

let formId = 0;

// START LIKES SECTION

export const showLikes = async (showId) => {
  let totalLikes = '';

  const like = likes.filter((l) => l.item_id === showId);
  if (like[0]) {
    totalLikes = like[0].likes;
  }
  return totalLikes;
};

btnLikes.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = parseInt(event.target.getAttribute('data-showid'), 10);
    addLikes(id);
    total.forEach((el) => {
      showLikes(id).then((totalLikes) => {
        el.innerHTML = `<br><br><span class="likes_count">Likes(${totalLikes})`;
      });
    });
  });
});

// END LIKES SECTION

// START COMMENT MODAL SECTION

const toggleModal = (showId) => {
  const show = shows.filter((s) => s.show.id === showId);

  if (show.length > 0) {
    image.src = show[0].show.image.medium;
  }

  modal.classList.toggle('show-modal');
};

btnModalComments.forEach((Modalcomment) => {
  Modalcomment.addEventListener('click', (event) => {
    event.preventDefault();
    const id = parseInt(event.target.getAttribute('data-showid'), 10);
    toggleModal(id);
    formId = id;
  });
});

closeButton.addEventListener('click', toggleModal);

// ADD COMMENT

formComments.forEach((formComment) => {
  formComment.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userName = formData.get('name');
    const userComment = formData.get('comment');
    const comment = new Comment(formId, userName, userComment);
    addComment(comment);
    formComment.reset();
  });
});

// END COMMENT MODAL SECTION
