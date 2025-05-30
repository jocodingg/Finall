import { getStories } from '../../data/api';
import db from '../../utils/db';

export default class HomePresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    this.view.init();
    try {
      const stories = await getStories();
      this.view.renderStories(stories);
      this.view.renderMap(stories);
      this.setupBookmarkButtons(stories);
    } catch (error) {
      this.view.showError(error);
    }
  }

  setupBookmarkButtons(stories) {
    stories.forEach(async (story) => {
      const card = document.getElementById(`story-${story.id}`);
      if (!card) return;

      const button = card.querySelector('.bookmark-btn');
      const isSaved = await db.get(story.id);
      button.innerHTML = isSaved ? 'Hapus' : 'Simpan';

      button.addEventListener('click', async () => {
        const saved = await db.get(story.id);
        if (saved) {
          await db.delete(story.id);
          button.innerHTML = 'Simpan';
        } else {
          await db.save(story);
          button.innerHTML = 'Hapus';
        }
      });
    });
  }
}
