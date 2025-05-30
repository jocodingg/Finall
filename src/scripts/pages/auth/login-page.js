import LoginView from './login-view';
import LoginPresenter from '../presenter/login-presenter'

export default class LoginPage {
  async render() {
    return LoginView.render();
  }

  async afterRender() {
    LoginView.bindLoginHandler((email, password) => {
      LoginPresenter.handleLogin(email, password, LoginView);
    });
  }
}
