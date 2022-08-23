import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.css';
import { refs } from './modules/refs.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import photosTemplate from './templates/photosTemplate.hbs';
import PixabayAPI from './modules/pixabayAPI.js';

const picAPI = new PixabayAPI();
refs.gallery.innerHTML = '';
refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();
  let query = refs.searchQuery.value.split(' ').join('+');
  // console.log(query);
  picAPI.config.params.page = 1;
  refs.gallery.innerHTML = '';
  refs.loadMore.classList.add('is-hidden');

  let searchResult = await picAPI.getPictures(query);
  console.log(searchResult);
  refs.searchQuery.value = '';

  if (searchResult.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your query. Try again.'
    );
  } else {
    Notify.success('Hooray! We found totalHits images.');
    renderMarkup(searchResult);
    // if (searchResult.length > picAPI.config.params.per_page)
    refs.loadMore.classList.remove('is-hidden');
  }
}
async function onLoadMoreClick() {
  picAPI.config.params.page += 1;
  let searchResult = await picAPI.getPictures();
  if (searchResult.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your query. Try again.'
    );
  } else {
    Notify.success('Hooray! We found totalHits images.');
    renderMarkup(searchResult);
    refs.loadMore.classList.remove('is-hidden');
  }
}
function renderMarkup(result) {
  refs.gallery.innerHTML += photosTemplate(result);
  let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}
