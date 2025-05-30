import AddStoryView from './add-story-view';
import AddStoryPresenter from '../presenter/add-story-presenter';

export default class AddStoryPage {
  async render() {
    const view = new AddStoryView();
    return view.getTemplate();
  }

  async afterRender() {
    const view = new AddStoryView();
    view.initElements();

    const presenter = new AddStoryPresenter(view);
    presenter.bindEvents();
  }
}
