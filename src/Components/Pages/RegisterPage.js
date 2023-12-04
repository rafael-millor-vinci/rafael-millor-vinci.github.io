import { clearPage,renderPageTitle  } from '../../utils/render';


const RegisterPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderRegisterPage();

  };

function renderRegisterPage() {
    const main = document.querySelector('main');
    main.innerHTML = 'Register Page';
  };

  export default RegisterPage;