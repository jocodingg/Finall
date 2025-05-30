import { initPush } from './push-init';
export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker API unsupported');
    return;
  }
 
  try {
    const registration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
    console.log('Service worker terpasang:', registration);

    if (!registration.active) {
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (registration.active) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    const token = localStorage.getItem('token');
    if (token) {
      await initPush(registration);
    }
    
  } catch (error) {
    console.log('Failed to install service worker or Push:', error);
  }
}