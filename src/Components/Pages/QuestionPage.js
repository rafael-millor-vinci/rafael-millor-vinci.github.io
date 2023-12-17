/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
// eslint-disable-next-line no-unused-vars
import Swal from 'sweetalert2';
import { clearPage, renderPageTitle } from '../../utils/render';
// eslint-disable-next-line spaced-comment
//import Navigate from '../Router/Navigate';
// eslint-disable-next-line spaced-comment
//import anime from 'animejs';
// eslint-disable-next-line spaced-comment
//import { start } from '@popperjs/core';
import CorrectAudio from '../../assets/audio/collect-ring-15982.mp3';
import IncorrectAudio1 from '../../assets/audio/fart-with-reverb-39675(1).mp3'; /* '../../assets/audio/fart-with-reverb-39675(1).mp3'; */
import IncorrectAudio2 from '../../assets/audio/wet-fart-6139(1).mp3';
import TimerAudio from '../../assets/audio/tickingbuzzer-75859.mp3';
import BackgroundMusic from '../../assets/audio/185_full_hustle-and-flow_0141_preview.mp3';
import ThreeWinningStreak from '../../assets/audio/Recording (3).mp3';
import SixWinningStreak from '../../assets/audio/Recording (9).mp3';
import NineWinningStreak from '../../assets/audio/Recording (14).mp3';
import TwelveWinningStreak from '../../assets/audio/Recording-_20_.mp3';
import FifteenWinningStreak from '../../assets/audio/Recording-_21_.mp3';
import LosingStreak from '../../assets/audio/Recording (4)(1).mp3';
import TimeOver from '../../assets/audio/Recording (6).mp3';
import Navigate from '../Router/Navigate';
import RestartPicture from '../../img/fondButton.jpg'
import StartPicture from '../../img/fondButton3.jpg'
import { getParameters } from './HomePage';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auth';

const questions = [
  {
    id: 0,
    title: 'Quelle couleur est le ciel ?',
    answers: [
      { text: 'bleu', isCorrect: true },
      { text: 'vert', isCorrect: false },
      { text: 'rouge', isCorrect: false },
      { text: 'orange', isCorrect: false },
    ],
  },
];

let questionsArray = null;
let currentQuestionIndex = 0;
let score = 0;
let startGame = null;
let main = null;
let questionAnswered = false;
let titleStartButton = 'Commencer';
let timerInterval = null;
let remainingTime;
let countdownElement = null;
let timeUp = false;
let questionRendered = false;
let streak = 0;
let lossStreak = 0;
let streakElement;
let streakBonusScore;
let endDiv;
let pitchSelector = 2;
let malusScore;
let isMuted = false;

// audio elements
const correctAudio = new Audio(CorrectAudio);
const incorrectAudio1 = new Audio(IncorrectAudio1);
const timerAudio = new Audio(TimerAudio);
const backgroundAudio = new Audio(BackgroundMusic);
const threeWinStreak = new Audio(ThreeWinningStreak);
const sixWinStreak = new Audio(SixWinningStreak);
const nineWinStreak = new Audio(NineWinningStreak);
const twelveWinStreak = new Audio(TwelveWinningStreak);
const fifteenWinStreak = new Audio(FifteenWinningStreak);
const losingStreakAudio = new Audio(LosingStreak);
const timeOverAudio = new Audio(TimeOver);
const incorrectAudio2 = new Audio(IncorrectAudio2);

timerAudio.volume = 0.2;
losingStreakAudio.volume = 1;
correctAudio.volume = 0.1;
backgroundAudio.volume = 0.03;
threeWinStreak.playbackRate = 1.6;
threeWinStreak.preservesPitch = false;
sixWinStreak.playbackRate = 1.6;
sixWinStreak.preservesPitch = false;
nineWinStreak.playbackRate = 1.6;
nineWinStreak.preservesPitch = false;
twelveWinStreak.playbackRate = 1.6;
twelveWinStreak.preservesPitch = false;
fifteenWinStreak.playbackRate = 1.6;
fifteenWinStreak.preservesPitch = false;
losingStreakAudio.playbackRate = 0.8;
losingStreakAudio.preservesPitch = false;
timeOverAudio.playbackRate = 1.6;
timeOverAudio.preservesPitch = false;

function playBackgroundMusic() {
  backgroundAudio.loop = true;
  backgroundAudio.play();
  backgroundAudio.playbackRate = 1.1;
}

const QuestionPage = () => {
  console.log('debut du quizz');
  clearPage();
  stopTimerAudio();
  main = document.querySelector('main');

  startGame = document.createElement('button');
  startGame.className = 'start-button';
  
  startGame.innerText = `${titleStartButton}`;
  startGame.style.backgroundImage = `url('${StartPicture}')`;

  main.appendChild(startGame);

  startGame.addEventListener('click', playBackgroundMusic);
  startGame.addEventListener('click', startQuizz);
  startGame.addEventListener('mouseover', () => {
    startGame.innerText = 'Bon jeu =)';
  });
  startGame.addEventListener('mouseout', () => {
    startGame.innerText = 'Commencer';
  });
};

function changeVolume() {
  if (!isMuted) {
    backgroundAudio.volume = 0;
    isMuted = true;
  } else {
    backgroundAudio.volume = 0.03;
    isMuted = false;
  }
}

function startCountdown(secondes) {
  remainingTime = secondes;
  playTimerAudio();
  countdownElement = document.createElement('div');
  countdownElement.id = 'countdownElement';
  countdownElement.className = 'countdown-number';
  main.appendChild(countdownElement);

  timerInterval = setInterval(() => {
    if (window.location.pathname !== '/quizz') {
      backgroundAudio.pause();
      clearTimer();
      stopTimerAudio();
      return;
    }

    countdownElement.innerText = remainingTime;
    main.appendChild(countdownElement);

    remainingTime -= 1;

    if (remainingTime <= -1) {
      clearTimer();
      stopTimerAudio();
      handleTimeUp();
      timeUp = false;
    }
  }, 1000);
}

function clearTimer() {
  clearInterval(timerInterval);
  if (countdownElement && document.body.contains(countdownElement)) {
    main.removeChild(countdownElement);
    countdownElement = null;
  }
}

function playAudio(isCorrect) {
  incorrectAudio2.pause();
  if (isCorrect) {
    correctAudio.play();
    console.log('BON AUDIO');
  } else {
    if (lossStreak === 1) {
      incorrectAudio2.play();
      incorrectAudio2.playbackRate = 1.5;
    } else if (lossStreak === 2) {
      incorrectAudio2.play();
      incorrectAudio2.playbackRate = 0.8;
    } else if (lossStreak === 4) {
      incorrectAudio2.play();
      incorrectAudio2.playbackRate = 0.6;
    } else if (lossStreak >= 5 && lossStreak !== 3) {
      incorrectAudio2.play();
      incorrectAudio2.playbackRate = 0.4;
    }
    console.log('MAUVAIS AUDIO');
  }
}

function playTimerAudio() {
  timerAudio.play();
}

function stopTimerAudio() {
  timerAudio.pause();
  timerAudio.currentTime = 0;
}

function handleTimeUp() {
  console.log('Temps écoulé');
  streak = 0;
  lossStreak = 0;
  stopTimerAudio();
  timeOverAudio.play();

  const timeoutElement = document.createElement('div');
  timeoutElement.id = 'timeoutElement';
  timeoutElement.innerText = 'Temps écoulé';
  document.body.appendChild(timeoutElement);

  // Appeler la fonction pour passer à la prochaine question après 2 secondes
  setTimeout(() => {
    if (timeoutElement) {
      document.body.removeChild(timeoutElement);
    }
    renderNextQuestion();
    timeUp = false;
  }, 3000);
}

async function fetchQuestions() {
  const param = getParameters();

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/quizz/20?categorie=${param}`,
    );
    console.log(response);
    if (!response.ok) {
      popError('Pas assez de categories selectionne')
      throw new Error('Network response was not ok, pas assez de question');
    }

    const data = await response.json();
    console.log('Tableau de 20 questions:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
  return [];
}

function popError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    showConfirmButton: true,
  });
}

async function startQuizz() {
  console.log('début du quizz');
  startGame.removeEventListener('click', startQuizz);
  questionsArray = await fetchQuestions();
  console.log(questionsArray);
  titleStartButton = `Continuer`;

  //startCountdown(10);
  renderNextQuestion();
  console.log();
}

async function renderQuestion(question) {
  // suppression de la question précédente
  clearPage();
  console.log('render de la question');
  try {
    const answersHTML = `
  <button class="answer-button" id="answer${question.id}_0">${question.answers[0].text}</button>
  <button class="answer-button" id="answer${question.id}_1">${question.answers[1].text}</button>
  <button class="answer-button" id="answer${question.id}_2">${question.answers[2].text}</button>
  <button class="answer-button" id="answer${question.id}_3">${question.answers[3].text}</button>
`;

    // Création du conteneur
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';

    // Ajout des boutons au conteneur
    answersContainer.innerHTML = answersHTML;

    // index de la bonne réponse
    const correctAnswerIndex = question.answers.findIndex((answer) => answer.isCorrect);

    //ajout de la variable dans le main
    main.innerHTML = `
       <div class="score" id="score2">
         <p> ${score} </p>
       </div>
      <div class="titleDiv">
        <p>${question.question}</p>
      </div>
      <container>
        ${answersHTML}
      </container>
    `;

    for (let i = -1; i <= 2; i += 1) {
      const answerButton = document.getElementById(`answer${question.id}_${i + 1}`);
      answerButton.addEventListener('click', () =>
        handleAnswerClick(question.id, correctAnswerIndex, i + 1),
      );
    }
  } catch (error) {
    // si question pas trouvée
    console.error('Render de la question échoué', error);
  }
}

function renderNextQuestion() {
  console.log('envoie de la question');
  clearInterval(timerInterval);
  if (!questionRendered) {
    if (currentQuestionIndex < questionsArray.length) {
      const nextQuestion = questionsArray[currentQuestionIndex];
      currentQuestionIndex += 1;
      renderQuestion(nextQuestion);
      startCountdown(10);
      questionRendered = false;
      return;
    }

    console.log('No more questions.');
    endQuizz();
  }
}


function handleAnswerClick(questionid, correctAnswerIndex, selectedAnswerIndex) {
  if (questionAnswered) return;

  clearTimer();
  questionAnswered = true;
  timeUp = false;
  stopTimerAudio();
  console.log(`réponse choisie : ${selectedAnswerIndex} bonne réponse : ${correctAnswerIndex}`);
  console.log(`Question ${correctAnswerIndex} : Réponse choisie : ${selectedAnswerIndex}`);

  if (remainingTime >= 0 && countdownElement) {
    // reset timer lorsque la réponse est donnée avant la fin du temps imparti
    document.body.removeChild(countdownElement);
  }

  if (correctAnswerIndex === selectedAnswerIndex) {
    resetStreak(false);
    streak += 1;

    const bonusScore = 10 + Math.floor(remainingTime * 2.5);
    score += bonusScore;
    console.log('bonne réponse!');
    // Animation pour le score
    const scoreElement = document.getElementById('score2');
    scoreElement.classList.add('right');
    scoreElement.innerHTML = `<span class="score-change">+${bonusScore}</span>`;

  } else {
    console.log('mauvaise reponse');
    console.log('streak = 0');
    console.log(lossStreak);

    resetStreak(true);
    lossStreak += 1;
    pitchSelector -= lossStreak / 10;

    if (score >= 0.1) {
      malusScore = Math.ceil(score * 0.15);
      score -= malusScore;
      const scoreElement = document.getElementById('score2');
      scoreElement.classList.add('wrong');
      scoreElement.innerHTML = `<span class="score-change">-${malusScore}</span>`;
    }
    const answerButton = document.getElementById(`answer${questionid}_${selectedAnswerIndex}`);
    answerButton.classList.add('wrong-reply');
    console.log(`CLASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS LISTTT`);

  }

  if (streak === 3) {
    const bonusScore = Math.floor(score * 0.1);
    score += bonusScore;
    console.log('streak de 3');

    threeWinStreak.play();

    streakBonusScore = document.createElement('div');
    streakBonusScore.className = 'bonus';
    streakBonusScore.innerText = `BONUS +${bonusScore}`;
    document.body.appendChild(streakBonusScore);

    streakElement = document.createElement('div');
    streakElement.className = 'streak';
    streakElement.innerText = 'Winning Streak';
    document.body.appendChild(streakElement);
  }

  if (lossStreak === 3) {
    streakElement = document.createElement('div');
    streakElement.className = 'streak';
    streakElement.innerText = 'Losing Streak';
    streakElement.style.backgroundColor = '#6d7a05';
    document.body.appendChild(streakElement);

    losingStreakAudio.play();
  }

  if (streak === 6) {
    const bonusScore = Math.floor(score * 0.15);
    score += bonusScore;
    sixWinStreak.play();

    streakBonusScore = document.createElement('div');
    streakBonusScore.className = 'bonus';
    streakBonusScore.innerText = `BONUS +${bonusScore}`;
    document.body.appendChild(streakBonusScore);

    streakElement = document.createElement('div');
    streakElement.className = 'streak';
    streakElement.innerText = 'On Fire !';
    streakElement.style.backgroundColor = '#bd7e1a';
    document.body.appendChild(streakElement);
  }

  if (streak === 9) {
    const bonusScore = Math.floor(score * 0.2);
    score += bonusScore;

    streakBonusScore = document.createElement('div');
    streakBonusScore.className = 'bonus';
    streakBonusScore.innerText = `BONUS +${bonusScore}`;
    document.body.appendChild(streakBonusScore);

    streakElement = document.createElement('div');
    streakElement.className = 'streak';
    streakElement.innerText = 'Invicible !';
    streakElement.style.backgroundColor = '#a83b0f';
    document.body.appendChild(streakElement);

    nineWinStreak.play();
  }

  if (streak === 12) {
    const bonusScore = Math.floor(score * 0.25);
    score += bonusScore;

    streakBonusScore = document.createElement('div');
    streakBonusScore.className = 'bonus';
    streakBonusScore.innerText = `BONUS +${bonusScore}`;
    document.body.appendChild(streakBonusScore);

    streakElement = document.createElement('div');
    streakElement.className = 'streak';
    streakElement.innerText = 'Unstoppable !';
    streakElement.style.backgroundColor = '#e30b21';
    document.body.appendChild(streakElement);

    twelveWinStreak.play();
  }

  if (streak === 15) {
    const bonusScore = Math.floor(score * 0.3);
    score += bonusScore;

    streakBonusScore = document.createElement('div');
    streakBonusScore.className = 'bonus';
    streakBonusScore.innerText = `BONUS +${bonusScore}`;
    document.body.appendChild(streakBonusScore);

    streakElement = document.createElement('div');
    streakElement.className = 'streak';
    streakElement.innerText = 'Legendary !';
    streakElement.style.backgroundColor = '#e30b21';
    document.body.appendChild(streakElement);

    fifteenWinStreak.play();
  }

  for (let i = 0; i <= 3; i += 1) {
    const answerButton = document.getElementById(`answer${questionid}_${i}`);
    if (i !== correctAnswerIndex) {
      answerButton.classList.add('wrong-answer');
      console.log(answerButton.classList);
    } else if (i === correctAnswerIndex) {
      answerButton.classList.add('correct-answer');
      console.log(answerButton.classList);
    }
  }
  playAudio(correctAnswerIndex === selectedAnswerIndex);

  setTimeout(() => {
    if (streakElement && document.body.contains(streakElement))
      document.body.removeChild(streakElement);
    if (streakBonusScore && document.body.contains(streakBonusScore))
      document.body.removeChild(streakBonusScore);
    resetAnswerStyles();
    renderNextQuestion();
    timeUp = false;
    questionAnswered = false;
    
  }, 2000); 
}

function resetAnswerStyles() {
  const scoreDiv = document.getElementById('score2');
  if (scoreDiv) scoreDiv.classList.remove('pulse3');
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach((button) => {
    button.classList.remove('correct-answer', 'wrong-answer', 'wrong-reply');
  });
}

async function endQuizz() {
  clearPage();
  questionsArray = null;
  backgroundAudio.volume = 0.1;

  const endContainer = document.createElement('container');
  endContainer.className = 'end-container';

  if (getAuthenticatedUser()) {
    endDiv = document.createElement('div');
    endDiv.className = 'end';
    endDiv.innerText = `Fin de la partie\n Score : ${score}`;
    endDiv.innerText += `\n ${getAuthenticatedUser().username}`;

    const result = await getBestScoreByUsername(getAuthenticatedUser().username);

    if (result < score) {
      updateBestScore(getAuthenticatedUser().username, score);
      endDiv.innerText += `\nNOUVEAU Meilleur  score ${score}`;
    } else {
      endDiv.innerText += `\nMeilleur  score ${result}`;
    }
    endContainer.appendChild(endDiv);
    //main.appendChild(endDiv);        refonte avec le container
  } else {
    endDiv = document.createElement('div');
    endDiv.className = 'end';
    endDiv.innerText = `Fin de la partie\n Score : ${score}`;

    endContainer.appendChild(endDiv);
    //main.appendChild(endDiv);         //   //
  }
  const restartButton = document.createElement('button');
  restartButton.className = 'restart-button';
  restartButton.innerText = `Rejouer`;
  restartButton.addEventListener('click', resetGame);

  restartButton.style.backgroundImage = `url('${RestartPicture}')`;
  restartButton.style.backgroundSize = 'cover'; 

  endContainer.appendChild(restartButton);
  main.appendChild(endContainer);
}

function resetGame(){
  backgroundAudio.pause();
  Navigate('/');
}

function resetStreak(resetStreakOrNot) {
  if (resetStreakOrNot) {
    streak = 0;
    console.log('Fin de streak');
  } else {
    lossStreak = 0;
  }
}

async function updateBestScore(username, nouveauScore) {
  try {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        username,
        nouveauScore,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users/updateBestScore`, options);

    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Réponse du serveur :', data);

    return data;
  } catch (error) {
    console.error('Erreur lors de la requête PATCH :', error);
    throw error;
  }
}
async function getBestScoreByUsername(username) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users/getScore?username=${username}`);

    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Réponse du serveur :', data);

    return data;
  } catch (error) {
    console.error('Erreur lors de la requête GET :', error);
    throw error;
  }
}

export default QuestionPage;
