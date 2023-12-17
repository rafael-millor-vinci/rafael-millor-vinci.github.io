import Swal from 'sweetalert2';
import { setAuthenticatedUser } from '../../utils/auth';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterPage();
};

function renderRegisterPage() {
  const main = document.querySelector('main');

  main.innerHTML = `<div class="police-options">
  <h1 class="text-center">Inscrivez-vous pour tenter de vous placer en haut du tableau d'affichage !</h1>
  <div class="center-form"><form>
    <div class="form-group w-50 p-3 d-grid gap-2 col-6 mx-auto">
      <label for="usernameRegister">Nom d'utilisateur</label>
      <input type="text" class="form-control" id="usernameRegister" aria-describedby="usernameHelp" placeholder="Enter username">
    </div>
    <div class="form-group w-50 p-3 d-grid gap-2 col-6 mx-auto">
      <label for="passwordRegister">Mot de passe</label>
      <input type="password" class="form-control" id="passwordRegister" placeholder="Password" minlength="8">
      <small id="passwordHelp">Nous ne partagerons jamais votre mot de passe avec qui que ce soit. De plus, votre mot de passe doit comporter au moins 8 caractères.</small>
    </div>
    <div class="form-group p-3 d-grid gap-2 col-6 mx-auto"><button type="submit" class="btn btn-primary" value="Register">S'inscrire</button></div>
  </form></div>`;
  // eslint-disable-next-line no-unused-vars
  const form = main.querySelector('form');
  form.addEventListener('submit', onRegister);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#usernameRegister').value;
  const password = document.querySelector('#passwordRegister').value;

  if (!username || !password) {
    popErrorEmpty('Sois pas idiot, comment tu veux qu\'on t\'inscrive au site si t\'es pas capable de remplir toutes les cases du formulaire ?');
    return;
  }
  try {
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

    const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);

    if (!response.ok) {
      popErrorUsernameTaken('Sois plus original pour ton pseudo, quelqu\'un l\'a déjà pris.');
      return;
    }

    const authenticatedUser = await response.json();

    console.log('Newly registered & authenticated user : ', authenticatedUser);

    setAuthenticatedUser(authenticatedUser);

    Navbar();

    Navigate('/');
  } catch (err) {
    popError('Une erreur est survenue');
    console.error('Register Error:', err);
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
    title: 'Abruti détecté',
    text: message,
    showConfirmButton: true,
    confirmButtonText: `
    Je serai moins idiot lors de la prochaine tentative
  `
  });
}

function popErrorUsernameTaken(message) {
  Swal.fire({
    icon: 'info',
    title: 'Pseudo indisponible',
    text: message,
    showConfirmButton: true,
    confirmButtonText: `
    Je serai plus créatif.
  `
  });
}

export default RegisterPage;
