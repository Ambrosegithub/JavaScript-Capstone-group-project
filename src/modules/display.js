import { getAllMovies, getAllLikes } from "./service.js"

export const Display = async () => {
  const shows = await getAllMovies();

  let htmlshow = "";

  shows.forEach((show) => {
    htmlshow += `
  <div class="show-cards">
    <img src="${show.show.image.medium}" alt="show Images">
        <div class="details">
            <h2>${show.show.name} 
              <button class="btn" id="btnLikes"><i class="bi bi-heart" data-showId="${
                show.show.id
              }"></i></button></h2>
              <p id="likeId" >Likes "${showLikes(show.show.id)}"</p>
        </div>
        <div class="button-modal">
          <button type="button" class="button" id="modal-comments" data-showId="${
            show.show.id
          }">Comments</button>
          <button type="button" class="button" id="reservations" data-showId="${
            show.show.id
          }">Reservations</button>
        </div>
        </div>
           <div class="modal">
              <div class="modal-box">
              <div class="detail-top">
                    <span class="close-button">X</span>
                </div>
                <div class="detail-img">
                  <img id="img-detail" alt="show Images">
                </div>
                <div class="comment-detais">
                  <p> Fuel: titanium   Lenght:100</p>
                  <p> Weight: titanium   Power:100</p>
                  <h2>Comments</h2>
                </div>
                <div class="form-comments">
                  <form>
                  <h2>Add a comment</h2>
                    <input type="text" id="fname" name="fname" value="John">
                    <textarea id="w3review" name="w3review" rows="4" cols="30"></textarea>
                    <input type="submit" value="Submit">
                  </form>
                </div>
              </div>
           </div>
`;
  });

  const cardshows = document.querySelector(".shows");
  cardshows.innerHTML = htmlshow;
};


const likes = await getAllLikes();

const showLikes = (showId) => {
  let totalLikes = "";

  const like = likes.filter((l) => l.item_id === showId);

  if (like[0]) {
    totalLikes = like[0].likes.toString();
  }
  return totalLikes;
};
