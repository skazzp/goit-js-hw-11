const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

export default class {
  config = {
    url: 'https://pixabay.com/api/',
    params: {
      key: '29419460-174de553ef6eeb556d53fec27',
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: 1,
    },
  };
  constructor() {}
  async getPictures(query) {
    try {
      if (query === undefined) query = this.config.params.q;
      else this.config.params.q = query;
      const response = await axios(this.config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMore.classList.add('is-hidden');
      console.log('ERROR', error);
    }
  }
}
