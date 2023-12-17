/* eslint-disable spaced-comment */
// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logo from '../../img/logo.png';
import { getAuthenticatedUser } from '../../utils/auth';
/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  let navbar = '';
  if (getAuthenticatedUser()) {
    //User Connecté
    navbar = `<nav class="navbar navbar-expand p-4" style="background: linear-gradient(to right, #430A58, #06082B); color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex;">
  <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style="color: white;"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link active mr-3 logoAsset" aria-current="page" href="#" data-uri="/" ><img src= "${logo}" class ="logoAsset"  data-uri="/"></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active mr-3" aria-current="page" href="#" data-uri="/logout" style="color: white; font-size: 3rem;">Logout</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#" data-uri="/leaderboard" style="color: white; font-size: 3rem;">Leaderboard</a>
              </li>
              <li class="nav-item">
                  <div>Bonjour,${getAuthenticatedUser().username} </div>
              </li>
          </ul>
      </div>
  </div>
</nav>
`;
  } else {
    //User NON Connecté
    navbar = `<nav class="navbar navbar-expand p-4" style="background: linear-gradient(to right, #430A58, #06082B); color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex;">
  <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style="color: white;"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link active mr-3 logoAsset" aria-current="page" href="#" data-uri="/" ><img src= "${logo}" class ="logoAsset"  data-uri="/"></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active mr-3" aria-current="page" href="#" data-uri="/login" style="color: white; font-size: 3rem;">Login</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active mr-3" aria-current="page" href="#" data-uri="/register" style="color: white; font-size: 3rem;">Register</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#" data-uri="/leaderboard" style="color: white; font-size: 3rem;">Leaderboard</a>
              </li>
          </ul>
      </div>
  </div>
</nav>
`;
  }
  /*
  /*`
  <nav class="navbar navbar-expand p-5 fs-3" style="background-color: #9055ee;">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/quizz">Quizz</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/register">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/leaderboard">Leaderboard</a>
            </li>
        </div>
      </div>
    </nav>`;*/
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
