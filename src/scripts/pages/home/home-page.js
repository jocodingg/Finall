import HomeView from './home-view';
import HomePresenter from '../presenter/home-presenter';

export default class HomePage {
  constructor() {
    this.view = new HomeView();
    this.presenter = new HomePresenter(this.view);
  }

  async render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    await this.presenter.init();
  }
}
