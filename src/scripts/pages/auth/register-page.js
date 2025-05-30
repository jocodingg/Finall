import RegisterView from './register-view';
import RegisterPresenter from '../presenter/register-presenter';

export default class RegisterPage {
  async render() {
    return RegisterView.render();
  }

  async afterRender() {
    RegisterView.bindRegisterHandler((name, email, password) => {
      RegisterPresenter.handleRegister(name, email, password, RegisterView);
    });
  }
}
