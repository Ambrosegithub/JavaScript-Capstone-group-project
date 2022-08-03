import './index.css';
/* eslint-disable import/prefer-default-export */
import { Display } from './modules/display.js';
import { addLikes, getAllLikes } from './modules/service.js';

await Display();

export const showLikes = async (showId) => {
  let totalLikes = '';
  const likes = await getAllLikes();

  const like = likes.filter((l) => l.item_id === showId);
  if (like[0]) {
    totalLikes = like[0].likes;
  }
  return totalLikes;
};

const total = document.querySelectorAll('.likeId');

const btnLikes = document.querySelectorAll('#btnLikes');

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
