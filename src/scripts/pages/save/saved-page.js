import SavedView from './saved-view';
import SavedPresenter from '../presenter/saved-presenter';

export default class SavedPage {
  constructor() {
    this.view = new SavedView();
    this.presenter = new SavedPresenter(this.view);
  }

  async render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    await this.presenter.init();
  }
}