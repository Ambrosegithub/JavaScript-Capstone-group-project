import './index.css';
import { Display } from './modules/display';
import { addLikes} from './modules/service.js'
//import { getAllMovies } from './modules/service';

Display();
//const shows =  await getAllMovies();
const btnLikes = document.querySelectorAll('#btnLikes');

btnLikes.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = parseInt(event.target.getAttribute('data-showid'), 10);
    addLikes(id);
  });
});
