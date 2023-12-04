import { clearPage,renderPageTitle  } from '../../utils/render';


const LeaderBoardPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderLeaderBoardPage();

  };

function renderLeaderBoardPage() {
    const main = document.querySelector('main');
    main.innerHTML = 'LeaderBoard Page';
  };

  export default LeaderBoardPage;