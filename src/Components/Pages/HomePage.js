import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import ArtImage from '../../img/9b9629cfd3d1e41c1866605b0dce0d4f.jpg'
import LitteratureImage from '../../img/great-literature-scaled.jpg'
import GeographieImage from '../../img/d9241ee4e7f0e89c54704904eac8b230.jpg'
import AstronomieImage from '../../img/69f71c1df7fde8069e91a52903ab9659.jpg'
import MathematicsImage from '../../img/b543ba9e98d55c4341a7f5e1a34101dc.jpg'
import TriviaImage from '../../img/istockphoto-1267191865-612x612.jpg'
// eslint-disable-next-line no-unused-vars
import { getAuthenticatedUser , isAuthenticated } from '../../utils/auth';


// eslint-disable-next-line no-unused-vars
const isConnected = isAuthenticated();
// eslint-disable-next-line no-unused-vars

const HomePage = () => {
  clearPage();
  renderPageTitle(' ');
  renderHomePage();

  const form = document.getElementById('form');
  if (form != null) {
    form.addEventListener('submit', onFormSubmit)
  }

};


function renderHomePage() {
  const main = document.querySelector('main');
  if (getAuthenticatedUser()) {
    main.innerHTML = `
    <div class="row d-flex align-items-center justify-content-center row2 firstC-Row">
    <span class="hpWelcome">Bonjour ${getAuthenticatedUser().username}! Content de vous revoir.</span>
    </div>
    `
  }
  main.innerHTML += `
  <div class="container text-center quizz-grid">
  <form id="form">
    <div class="row d-flex align-items-center justify-content-center row1 firstC-Row">
    <span class="hpWelcome">Vous pouvez sélectionner plusieurs catégories!</span>
      
      <div id="catDiv" class="col categorie col-6 Art" style="background-image: url(${ArtImage});">
      <input type="checkbox" value="Art" id="idArt" class="hiddenInput c-check">
        <label for="idArt" class="c-label">Art</label>
      </div>
    
      <div id="catDiv" class="col categorie col-6 Géographie" style="background-image: url(${GeographieImage});">
      <input type="checkbox" value="Géographie" id="idGéographie" class="hiddenInput c-check">
      <label for="idGéographie" class="c-label">Géographie</label>
      </div>
      
      <div id="catDiv" class="col categorie col-6 Trivia" style="background-image: url(${TriviaImage});">
      <input type="checkbox" value="Trivia" id="idTrivia" class="hiddenInput c-check">
        <label for="idTrivia" class="c-label">Trivia</label>
      </div>
    </div>


    <div class="row d-flex align-items-center justify-content-center">
      <div class="col categorie col-6" id="catDiv"style="background-image: url(${LitteratureImage});">
      <input type="checkbox" value="Littérature" id="idLittérature" class="hiddenInput c-check">
        </input><label for="idLittérature" class="c-label">Littérature</label>
      </div>

      <div class="col categorie col-6" id="catDiv" style="background-image: url(${MathematicsImage});">
      <input type="checkbox" value="Mathématique" id="idMathématique" class="hiddenInput c-check"></input>
        <label for="idMathématique" class="c-label">Mathématique</label>
      </div>

      <div class="col categorie col-6" id="catDiv" style="background-image: url(${AstronomieImage});">
      <input type="checkbox" value="Astronomie" id="idAstronomie" class="hiddenInput c-check">
      <label for="idAstronomie" class="c-label">Astronomie</label>
      </div>
      <div class="d-flex align-items-center justify-content-center" style="height: 25px;">
      <button type="submit" class = "p-2 m-2  startGame">Commencer la partie</button>
    </div>
    </div>
  </form>
</div>

 `;
};



function getParameters() {
  const queryParams = new URLSearchParams(window.location.search);
  console.log("URLLLLL ", queryParams);
  const parameterValues = [];

  queryParams.forEach((value) => {
    parameterValues.push(value);
    console.log("CHAQUE  PPARR", value);
  });

  return parameterValues;
}

const parameters = getParameters();
console.log('URL Parameters:', parameters);

async function onFormSubmit(e) {
  e.preventDefault();

  const Art = document.getElementById('idArt').checked;
  const Géographie = document.getElementById('idGéographie').checked;
  const Littérature = document.getElementById('idLittérature').checked;
  const Mathématiques = document.getElementById('idMathématique').checked;
  const Astronomie = document.getElementById('idAstronomie').checked;
  const Trivia = document.getElementById('idTrivia').checked;
  
  clearPage();

  console.log("Art = ", Art, "Géographie = ", Géographie, " Littérature = ", Littérature, "Mathématique = ", Mathématiques, "Astronomie = ", Astronomie,"Trivia = ",Trivia);

  // les multiples parametres du site
  const categories = [];
  if (Art) categories.push('Art');
  if (Géographie) categories.push('Géographie');
  if (Littérature) categories.push('Littérature');
  if (Mathématiques) categories.push('Mathématiques');
  if (Astronomie) categories.push('Astronomie');
  if (Trivia) categories.push('Trivia');

  const categoriesString = categories.join(',');

  // ecrit l'url du site
  const queryParams = new URLSearchParams();
  queryParams.append('categorie', categoriesString);

  console.log("Selected categories: ", categoriesString);

  Navigate("/quizz");
  const currentUrl = window.location.href.split('?')[0];
  const newUrl = `${currentUrl}?${queryParams.toString()}`;

  console.log("Current URL", currentUrl);

  console.log('New URL with parameters:', newUrl);

  window.location.href = newUrl;

}


export { HomePage, getParameters };