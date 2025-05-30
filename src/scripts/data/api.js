import CONFIG from '../config';

const register = async (name, email, password) => {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson;
};

const login = async (email, password) => {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  localStorage.setItem('token', `Bearer ${responseJson.loginResult.token}`);
  return responseJson;
};

const getStories = async () => {
  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson.listStory;
};

const postStory = async ({ description, photo, lat, lon }) => {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    body: formData,
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson;
};

const ENDPOINTS = {
  ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,
};

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}

export { register, login, getStories, postStory };