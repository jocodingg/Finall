export default class NotFoundPage {
  async render() {
    return `
      <section class="not-found" style="text-align: center; padding: 2rem;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">404 - Halaman Tidak Ditemukan</h2>
        <p style="margin-bottom: 1.5rem;">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <a href="#/" style="color: #007bff; text-decoration: underline;">Kembali ke Beranda</a>
      </section>
    `;
  }

  async afterRender() {
  }
}
