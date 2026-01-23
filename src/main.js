import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
const PER_PAGE = 15;
let totalHits = 0;

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btn.load-more');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) return;

  page = 1;
  totalHits = '';

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching <br> your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    totalHits = data.totalHits;
    createGallery(data.hits);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});


function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const { height } = card.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
