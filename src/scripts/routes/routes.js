import HomePage from '../pages/home/home-page';
import LoginPage from '../pages/auth/login-page';
import RegisterPage from '../pages/auth/register-page';
import AddStoryPage from '../pages/story/add-story-page';
import SavedPage from '../pages/save/saved-page';
import NotFoundPage from '../pages/notfound/not-found';

const routes = {
  '/': new HomePage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/add': new AddStoryPage(),
  '/save': new SavedPage(),
  '*': new NotFoundPage(),

};

export default routes;
