import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.btn.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const clearGallery = () => {
  galleryEl.innerHTML = '';
};

export const createGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const showLoader = () => {
  loaderEl.classList.remove('hidden');
};

export const hideLoader = () => {
  loaderEl.classList.add('hidden');
};

export const showLoadMoreButton = () => {
  loadMoreButton.classList.remove('hidden');
};

export const hideLoadMoreButton = () => {
  loadMoreButton.classList.add('hidden');
};
