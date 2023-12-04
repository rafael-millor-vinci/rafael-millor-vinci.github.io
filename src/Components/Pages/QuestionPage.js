import { clearPage, renderPageTitle } from '../../utils/render';

const QuestionPage = () => {
  clearPage();
  renderPageTitle('Question');
  renderQuestionPage();
};

function renderQuestionPage() {

  const main = document.querySelector('main');

  const banniere = document.createElement('div');
  banniere.className = "banner"
  

  const textElement = document.createElement('span');
  textElement.className = "text-element";

  const startGame = document.createElement('button');
  startGame.className = "start-button";
  startGame.innerText = "Commencer";

  const questionDiv = document.createElement("div");
  questionDiv.className = "question-div";

  const titleDiv = document.createElement('div');
  titleDiv.className = "question-container";

  const answer1Div = document.createElement('div');
  answer1Div.className = "answer1-container";

  const answer2Div = document.createElement('div');
  answer2Div.className = "answer2-container";

  const answer3Div = document.createElement('div');
  answer3Div.className = "answer3-container";

  const answer4Div = document.createElement('div');
  answer4Div.className = "answer4-container";

  const titleQuestion = document.createElement('h1');
  titleQuestion.className = "question-title";

  titleQuestion.appendChild(textElement);
  titleDiv.appendChild(titleQuestion);
  questionDiv.appendChild(titleDiv);
  banniere.appendChild(questionDiv);
  main.appendChild(banniere);
  main.appendChild(answer1Div);
  main.appendChild(answer2Div);
  main.appendChild(answer3Div);
  main.appendChild(answer4Div);
  main.innerHTML = '<canvas />';

}

export default QuestionPage;
