import { login } from '../../data/api';

const LoginPresenter = {
  async handleLogin(email, password, view) {
    try {
      await login(email, password);
      view.showSuccess();
    } catch (err) {
      view.showError(err.message);
    }
  },
};

export default LoginPresenter;
