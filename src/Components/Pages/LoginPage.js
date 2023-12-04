import { clearPage,renderPageTitle  } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderLoginPage();

  };

function renderLoginPage() {
    const main = document.querySelector('main');
    main.innerHTML = 'Login Page';
  };

  export default LoginPage;