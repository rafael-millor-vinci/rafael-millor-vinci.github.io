import anime from 'animejs';
import { clearPage, renderPageTitle } from '../../utils/render';



const QuizzPage = () => {
  clearPage();
  renderPageTitle('Quizz');
  renderQuizzPage();
};

function renderQuizzPage() {
  const main = document.querySelector('main');

  main.innerHTML = `<div class="animTest">
  <div class="p-5 anime-test-1">
  <input type="button" value="Bouton cliquer" />
  </div>
  <div class="p-5 anime-test-2">
  <input type="button" value="Bouton cliquer" />
  </div>
  <div class="p-5 anime-test-2">
  <input type="button" value="Bouton cliquer" />
  </div>
 </div>
 `;

 anime({
  targets: [".anime-test-1",".anime-test-2"],
  translateX: 70,
  translateY: 170,
  delay: anime.stagger(200) // increase delay by 200ms for each elements.
});

}

export default QuizzPage;
