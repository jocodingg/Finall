import { postStory } from '../../data/api';

export default class AddStoryPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleFormSubmit(data) {
    try {
      await postStory(data);
      alert('Cerita berhasil dikirim!');
      window.location.hash = '#/';
    } catch (err) {
      alert('Gagal mengirim cerita: ' + err.message);
    }
  }

  bindEvents() {
    this.view.onSubmit(this.handleFormSubmit.bind(this));
  }
}
