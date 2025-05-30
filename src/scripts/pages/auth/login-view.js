const LoginView = {
  render() {
    return `
      <section class="login-regist-container">
        <h1>Login Page</h1>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Email" required />
          <label for="password" class="label-password-login">Password</label>
          <input type="password" id="password" placeholder="Password" required />
          <br/>
          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </section>
    `;
  },

  bindLoginHandler(handler) {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      handler(email, password);
    });
  },

  showError(message) {
    alert(`Error: ${message}`);
  },

  showSuccess() {
    alert('Login berhasil!');
    window.location.hash = '#/';
  },
};

export default LoginView;
