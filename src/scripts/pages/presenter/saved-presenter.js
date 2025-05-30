import db from "../../utils/db";

export default class SavedPresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    this.view.init();
    const stories = await db.getAll();

    if (!stories.length) {
      this.view.showEmptyMessage();
    } else {
      this.view.renderSavedStories(stories);
      this.view.bindDeleteHandlers(async (id) => {
        await db.delete(id);
        this.init();
      });
    }
  }
}
