const RegisterView = {
  render() {
    return `
      <section class="login-regist-container">
        <h1>Register</h1>
        <form id="regist-form">
          <label for="name">Nama</label> 
          <input type="text" name="name" placeholder="Name" required /><br />
          <label for="email">Email</label>
          <input type="email" name="email" placeholder="Email" required /><br />
          <label for="password">Password</label>
          <input type="password" name="password" placeholder="Password" required /><br />
          <button type="submit">Register</button>
        </form>
        <p id="registerMessage"></p>
      </section>
    `;
  },

  bindRegisterHandler(handler) {
    const form = document.getElementById('regist-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      handler(name, email, password);
    });
  },

  showMessage(msg) {
    document.getElementById('registerMessage').innerText = msg;
  },

  navigateToLogin() {
    window.location.hash = '#/login';
  },
};

export default RegisterView;
