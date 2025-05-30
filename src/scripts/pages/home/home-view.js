export default class HomeView {
  constructor() {
    this.listContainer = null;
    this.mapContainer = null;
  }

  getTemplate() {
    return `
      <section class="home-container">
        <h1>Daftar Cerita</h1>
        <div id="story-list" class="story-list"></div>
        <div id="map" style="height: 400px; margin-top: 2rem;"></div>
      </section>
    `;
  }

  init() {
    this.listContainer = document.getElementById('story-list');
    this.mapContainer = document.getElementById('map');
  }

  renderStories(stories) {
    this.listContainer.innerHTML = stories.map(story => `
      <div id="story-${story.id}" class="story-card" style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
        <img src="${story.photoUrl}" alt="${story.name}" width="200" />
        <p><strong>${story.name}</strong></p>
        <p>${story.description}</p>
        <p>${new Date(story.createdAt).toLocaleString()}</p>
        <button class="bookmark-btn">Simpan</button>
      </div>
    `).join('');
  }

  renderMap(stories) {
    const map = L.map(this.mapContainer).setView([-2.5, 117.5], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    stories.forEach(story => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
      }
    });
  }

  showError(error) {
    this.listContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
