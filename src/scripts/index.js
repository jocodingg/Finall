import '../styles/styles.css';

import App from './pages/app';

import { registerServiceWorker } from './utils';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();
  await registerServiceWorker();

 let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButton = document.createElement('button');
    installButton.id = 'install-button';
    installButton.innerText = 'Install Aplikasi';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '16px';
    installButton.style.right = '16px';
    installButton.style.padding = '8px 12px';
    installButton.style.zIndex = '999';
    installButton.style.borderRadius = '8px';
    installButton.style.background = '#6200ee';
    installButton.style.color = 'white';
    document.body.appendChild(installButton);

    installButton.addEventListener('click', async () => {
      installButton.remove();
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted install');
      } else {
        console.log('User dismissed install');
      }
      deferredPrompt = null;
    });
  });
  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
