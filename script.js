import { API_ACCESS_KEY } from './modules/credentials.mjs';

const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let photosArray = [];

const count = 10;
const apikey = API_ACCESS_KEY;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

// Helper Function to set attributes on DOM
function setAttributes(elements, attributes) {
  for (const key in attributes) {
    elements.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      targe: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom os page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
  }
});

// On Load
getPhotos();
