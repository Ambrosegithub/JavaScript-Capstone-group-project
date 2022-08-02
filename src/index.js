import './index.css';
// eslint-disable-next-line
import { Display } from './modules/display.js';
import { addLikes } from './modules/service.js';

await Display();
const btnLikes = document.querySelectorAll('#btnLikes');
btnLikes.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = parseInt(event.target.getAttribute('data-showid'), 10);
    addLikes(id);
  });
});
