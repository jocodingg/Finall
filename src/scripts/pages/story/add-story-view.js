export default class AddStoryView {
  constructor() {
    this.form = null;
    this.description = null;
    this.photoInput = null;
    this.lat = null;
    this.lon = null;
    this.map = null;
    this.marker = null;
    this.useCameraBtn = null;
    this.video = null;
    this.canvas = null;
    this.captureBtn = null;
    this.imageBlob = null;
    this.stream = null;
  }

  getTemplate() {
    return `
      <section class="add-container">
        <h1>Tambah Cerita Baru</h1>
        <form id="add-story-form">
          <textarea id="description" placeholder="Deskripsi cerita" required></textarea><br/>
          <div class="button-group">
            <button type="button" id="use-camera-btn">Ambil dari Kamera</button>
            <input type="file" id="photo" accept="image/*" /><br/>
          </div>
          <div id="camera-container" style="display:none; margin-top:10px;">
            <video id="video" autoplay playsinline style="max-width:100%; height:auto;"></video><br/>
            <button type="button" id="capture-btn">Ambil Gambar</button>
          </div>
          <canvas id="canvas" style="display:none;"></canvas>

          <label for="lat">Latitude</label>
          <input type="number" id="lat" step="any" placeholder="Klik peta untuk ambil lokasi" readonly required /><br/>
          <label for="lon">Longitude</label>
          <input type="number" id="lon" step="any" placeholder="Klik peta untuk ambil lokasi" readonly required /><br/>
          <div id="map" style="height: 300px; margin: 10px 0;"></div>

          <button type="submit">Kirim Cerita</button>
        </form>
      </section>
    `;
  }

  initElements() {
    this.form = document.getElementById('add-story-form');
    this.description = document.getElementById('description');
    this.photoInput = document.getElementById('photo');
    this.lat = document.getElementById('lat');
    this.lon = document.getElementById('lon');
    this.useCameraBtn = document.getElementById('use-camera-btn');
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.captureBtn = document.getElementById('capture-btn');

    this.initMap();
    this.initCamera();
  }

  initMap() {
    this.map = L.map('map').setView([-2.5, 117.5], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this.lat.value = lat.toFixed(6);
      this.lon.value = lng.toFixed(6);

      if (this.marker) this.map.removeLayer(this.marker);
      this.marker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup("Lokasi dipilih").openPopup();
    });
  }

  initCamera() {
    const cameraContainer = document.getElementById('camera-container');

    this.useCameraBtn.addEventListener('click', async () => {
      this.photoInput.value = ''; // Reset file input
      this.imageBlob = null;

      cameraContainer.style.display = 'block';

      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        this.video.srcObject = this.stream;
      } catch (err) {
        alert('Tidak dapat mengakses kamera: ' + err.message);
      }
    });

    this.captureBtn.addEventListener('click', () => {
      const context = this.canvas.getContext('2d');
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

      this.canvas.toBlob((blob) => {
        this.imageBlob = blob;
        alert('Gambar berhasil diambil dari kamera!');
        this.stopCamera();
      }, 'image/jpeg');
    });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      document.getElementById('camera-container').style.display = 'none';
    }
  }

  onSubmit(callback) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      let photoFile = null;
      if (this.imageBlob) {
        photoFile = new File([this.imageBlob], 'photo.jpg', { type: 'image/jpeg' });
      } else if (this.photoInput.files[0]) {
        photoFile = this.photoInput.files[0];
      } else {
        alert('Silakan ambil gambar dari kamera atau pilih dari galeri.');
        return;
      }

      const data = {
        description: this.description.value,
        photo: photoFile,
        lat: parseFloat(this.lat.value),
        lon: parseFloat(this.lon.value),
      };

      callback(data);
    });
  }
}
