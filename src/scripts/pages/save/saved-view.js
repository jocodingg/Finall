export default class SavedView {
  constructor() {
    this.listContainer = null;
    this.mapContainer = null;
  }

  getTemplate() {
    return `
      <section class="saved-container">
        <h1>Daftar Cerita Tersimpan</h1>
        <div id="saved-story-list" class="story-list"></div>
      </section>
    `;
  }

  init() {
    this.listContainer = document.getElementById('saved-story-list');
    this.mapContainer = document.getElementById('map');
  }

  renderSavedStories(stories) {
    this.listContainer.innerHTML = stories.map(story => `
      <div id="saved-${story.id}" class="story-card" style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
        <img src="${story.photoUrl}" alt="${story.name}" width="200" />
        <p><strong>${story.name}</strong></p>
        <p>${story.description}</p>
        <p>${new Date(story.createdAt).toLocaleString()}</p>
        <button class="remove-btn">Hapus</button>
      </div>
    `).join('');
  }

  bindDeleteHandlers(onDelete) {
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.parentElement.id.replace('saved-', '');
        onDelete(id);
      });
    });
  }

  showEmptyMessage() {
    this.listContainer.innerHTML = '<p>Tidak ada cerita tersimpan.</p>';
  }
}
