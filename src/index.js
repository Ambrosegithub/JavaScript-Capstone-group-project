import './index.css';
/* eslint-disable import/prefer-default-export */
import { Display } from './modules/display.js';
import {
  addLikes, getAllLikes, getAllMovies, addComment, getAllCommentsByItemId,
} from './modules/service.js';
import Comment from './modules/comment';

await Display();

const shows = await getAllMovies();
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const image = document.getElementById('img-detail');
const btnModalComments = document.querySelectorAll('#modal-comments');
const btnLikes = document.querySelectorAll('#btnLikes');
const formComments = document.querySelectorAll('.formComment');
const totalAddedComments = document.querySelector('#totalComments');
const showComments = document.querySelector('#showComments');
const itemDetails = document.querySelector('#itemDetails');
let formId = 0;

// START LIKES SECTION

// START LIKES SECTION

export const showLikes = async (showId) => {
  let totalLikes = '';
  let like = [];
  const likes = await getAllLikes();

  like = likes.filter((l) => l.item_id === showId);

  if (like[0]) {
    totalLikes = like[0].likes;
  }
  return totalLikes;
};

const showTotalComments = (event, id) => {
  showLikes(id).then((totalLikes) => {
    console.log(event.path[3].childNodes[3]);
    if (event.path[3].childNodes[3].childNodes[3]) {
      event.path[3].childNodes[3].childNodes[3].innerHTML = `(${totalLikes})`;
    } else {
      event.path[3].childNodes[3].innerHTML = `(${totalLikes})`;
    }
  });
};

btnLikes.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = parseInt(event.target.getAttribute('data-showid'), 10);
    addLikes(id);

    showTotalComments(event, id);
  });
});

// END LIKES SECTION
// END LIKES SECTION

// START COMMENT MODAL SECTION

const toggleModal = (showId) => {
  const show = shows.filter((s) => s.show.id === showId);

  if (show.length > 0) {
    image.src = show[0].show.image.medium;
  }

  modal.classList.toggle('show-modal');
};

// ADD COMMENT
export const totalComments = async (itemId) => {
  const totalComments = await getAllCommentsByItemId(itemId);
  return totalComments;
};

const showItemComments = (itemId) => {
  totalComments(itemId).then((total) => {
    showComments.innerHTML = '';
    if (total) {
      total.forEach((comment) => {
        const comentDetails = `${comment.creation_date}  ${comment.username}:  ${comment.comment}<br>`;
        showComments.innerHTML += comentDetails;
      });
    }
  });
};
export const getllAllComments = (itemId) => {
  totalComments(itemId).then((totalComments) => {
    if (totalComments.length) {
      totalAddedComments.innerHTML = `Comments(${totalComments.length})`;
      showItemComments(itemId);
    } else {
      totalAddedComments.innerHTML = `Comments(${('')})`;
    }
  });
};

formComments.forEach((formComment) => {
  formComment.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userName = formData.get('name');
    const userComment = formData.get('comment');
    const comment = new Comment(formId, userName, userComment);
    addComment(comment);
    getllAllComments(formId);
    showItemComments(formId);
    formComment.reset();
  });
});

btnModalComments.forEach((Modalcomment) => {
  Modalcomment.addEventListener('click', (event) => {
    event.preventDefault();
    const id = parseInt(event.target.getAttribute('data-showid'), 10);
    toggleModal(id);
    getllAllComments(id);
    formId = id;

    shows.forEach((item) => {
      if (item.show.id === id) {
        itemDetails.innerHTML = '';
        const details = ` Lang:${item.show.language}. &nbsp; Genres:  ${item.show.genres}<br><br> weight: ${item.show.weight}.  Type of movie: ${item.show.type}`;
        itemDetails.innerHTML += details;
      }
    });
  });
});

closeButton.addEventListener('click', toggleModal);

// END COMMENT MODAL SECTION
