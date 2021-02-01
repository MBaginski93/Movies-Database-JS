const addModal = document.querySelector("div#add-modal");
const startAddMovieBtn = document.querySelector("header").lastElementChild;
const cancelBtn = document.querySelector("div.modal__actions").firstElementChild;
const addConfirmBtn = cancelBtn.nextElementSibling;
const backdrop = document.getElementById("backdrop");
const userInputs = document.querySelectorAll("input");
const welcomeCard = document.getElementById("entry-text");
const movieListRoot = document.getElementById("movie-list");
const deleteModal = document.getElementById("delete-modal");
const moviesDatabase = [];

const showModalVisibility = () => {
  addModal.classList.add("visible");
  toggleBackdrop();
  clearUserInputs();
};

const removeModalVisibility = () => {
  addModal.classList.remove("visible");
  deleteModal.classList.remove("visible");
  toggleBackdrop();
  clearUserInputs();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const addInput = () => {
  if (userInputs[0].value === "" || userInputs[1].value === "") {
    alert("Podaj poprawny tytuł lub link do obrazu");
  } else if (userInputs[2].value > 5 || userInputs[2].value <= 0) {
    alert("Podaj ocenę od 1 do 5");
  } else {
    const newMovie = {
      title: userInputs[0].value,
      image: userInputs[1].value,
      rating: userInputs[2].value,
    };

    moviesDatabase.push(newMovie);
    clearUserInputs();
    updateUI();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
    removeModalVisibility();
    console.log(moviesDatabase);
  }
};

const clearUserInputs = () => {
  for (const inputs of userInputs) {
    inputs.value = "";
  }
};

const updateUI = () => {
  if (moviesDatabase != []) {
    welcomeCard.style.display = "none";
  } else {
    welcomeCard.style.display = "block";
  }
};

const renderNewMovieElement = (title, url, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class = "movie-element__image">
    <img src = "${url}" alt ="${title}"></img>
  </div>
  <div class = "movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5</p>
  </div>`;

  movieListRoot.appendChild(newMovieElement);

  newMovieElement.addEventListener("click", deleteMovie.bind(null, url));
};

const deleteMovie = (movieId) => {
  const negationBtn = deleteModal.querySelector(".btn--passive");
  const confirmationBtn = deleteModal.querySelector(".btn--danger");

  deleteModal.classList.add("visible");
  toggleBackdrop();

  confirmationBtn.addEventListener("click", confirmationHandler.bind(null, movieId));
  negationBtn.addEventListener("click", removeModalVisibility);
};

const confirmationHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of moviesDatabase) {
    if (movie.image === movieId) {
      break;
    }
    movieIndex++;
  }
  deleteModal.classList.remove("visible");
  toggleBackdrop();
  movieListRoot.children[movieIndex].remove();
  moviesDatabase.splice(movieIndex, 1);
  updateUI();
};

startAddMovieBtn.addEventListener("click", showModalVisibility);
cancelBtn.addEventListener("click", removeModalVisibility);
backdrop.addEventListener("click", removeModalVisibility);
addConfirmBtn.addEventListener("click", addInput);
