
import Swal from 'sweetalert2';
import { setAuthenticatedUser } from '../../utils/auth';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderLoginPage();
};

function renderLoginPage() {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="police-options">
  <h1 class="text-center">Connectes-toi pour sauvegarder ton score!</h1>
    <form>
    <div class="form-group w-50 p-3 d-grid gap-2 col-6 mx-auto">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" class="form-control" id="usernameLogin" aria-describedby="usernameHelp" placeholder="Enter username">
    </div>
    <div class="form-group w-50 p-3 d-grid gap-2 col-6 mx-auto">
      <label for="loginPassword">Mot de passe</label>
      <input type="password" class="form-control" id="passwordLogin" placeholder="Password">
      <small id="pswHelp">Nous ne partagerons jamais votre mot de passe avec qui que ce soit.</small>
    </div>
    <div class="form-group p-3 d-grid gap-2 col-6 mx-auto"><button type="submit" class="btn btn-primary " >Se connecter</button>
    </div>
  </form>
  </div>`;
  const form = main.querySelector('form');
  form.addEventListener('submit', onLogin);
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#usernameLogin').value;
  const password = document.querySelector('#passwordLogin').value;

  if (!username || !password) {
    popErrorEmpty('Sois pas idiot, comment tu veux qu\'on te connecte au site si t\'es pas capable de remplir toutes les cases du formulaire ?');
    return;
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({
    username,
    password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);

    if (!response.ok) {
      popErrorWrongInput('Le pseudo ou le mot de passe est incorrect. Bravo, tu as réussis à te tromper hors du quizz.');
      return;
    }
    const authenticatedUser = await response.json();

    console.log('Authenticated user : ', authenticatedUser);

    setAuthenticatedUser(authenticatedUser);

    Navbar();

    Navigate('/');
  } catch (err) {
    popError('Une erreur est survenue');
    console.error('Connexion Error:', err);
  }
}

function popError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    showConfirmButton: true,
  });
}

function popErrorEmpty(message) {
  Swal.fire({
    icon: 'question',
    title: 'Oops...',
    text: message,
    showConfirmButton: true,
    confirmButtonText: `
    Je serai moins idiot lors de la prochaine tentative
  `
  });
}

function popErrorWrongInput(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    showConfirmButton: true,
    confirmButtonText: `
    Désolé pour mon incompétence.
  `
  });
}

export default LoginPage;
