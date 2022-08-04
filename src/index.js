import './index.css';
/* eslint-disable import/prefer-default-export */
import { Display } from './modules/display.js';
import {
  addLikes, getAllLikes, getAllMovies, addComment, getAllCommentsByItemId,
} from './modules/service.js';
import Comment from './modules/comment';

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
const totalAddedComments = document.querySelector('#totalComments');
const showComments = document.querySelector('#showComments');
const itemDetails = document.querySelector('#itemDetails');

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
    getllAllComments(id);
    formId = id;

    shows.forEach((item)=> {
      if(item.show.id === id){
        console.log(item)
        itemDetails.innerHTML = "";
        let details = ` Lang:${item.show.language}. &nbsp; Genres:  ${item.show.genres}<br><br> weight: ${item.show.weight}.  Type of movie: ${item.show.type}`
        itemDetails.innerHTML += details;
      }
    })





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
    getllAllComments(formId);
    showItemComments(formId);
    formComment.reset();
  });
});

export const totalComments = async (item_id) => {
  let totalComments = await getAllCommentsByItemId (item_id);
  return totalComments;
};

export const getllAllComments = (item_id) => {

  totalComments(item_id).then((totalComments) => {

    if(totalComments.length){
      totalAddedComments.innerHTML = `Comments(${totalComments.length})`;
      showItemComments(item_id);
    } else {
      totalAddedComments.innerHTML = `Comments(${("")})`;
    }

        
  });
}

const showItemComments = (item_id) => {

  totalComments(item_id).then((total) => {
    showComments.innerHTML = "";
    total.forEach((comment)=> {
      let comentDetails = `${comment.creation_date}  ${comment.username}:  ${comment.comment}<br>`
      showComments.innerHTML += comentDetails;
    })
        
  })
}



// END COMMENT MODAL SECTION
