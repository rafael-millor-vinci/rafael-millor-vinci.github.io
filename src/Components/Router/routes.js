import {HomePage}  from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import NewPage from '../Pages/NewPage';
import QuestionPage from '../Pages/QuestionPage';
import RegisterPage from '../Pages/RegisterPage';
import LeaderBoardPage from '../Pages/LeaderBoardPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/quizz': QuestionPage,
  '/login':LoginPage,
  '/register':RegisterPage,
  '/leaderboard':LeaderBoardPage,
  '/logout':Logout,
};

export default routes;
