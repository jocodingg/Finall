import { register } from '../../data/api';

const RegisterPresenter = {
  async handleRegister(name, email, password, view) {
    try {
      const res = await register(name, email, password);
      view.showMessage(res.message);
      view.navigateToLogin();
    } catch (error) {
      view.showMessage(error.message);
    }
  },
};

export default RegisterPresenter;
