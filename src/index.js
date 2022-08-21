import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
const axios = require('axios').default;
import { refs } from './modules/refs.js';
// var debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;
const BASE_URL = '';
const config = {
  url: 'https://pixabay.com/api/',
  method: 'get',
  params: {
    key: '29419460-174de553ef6eeb556d53fec27',
    q: '',
    image_type: 'photo',
    per_page: 12,
    page: 2,
  },
};
refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  // console.log(refs.searchQuery.value.split(' ').join('+'));
  config.params.q = refs.searchQuery.value.split(' ').join('+');
  // console.log(config);
  // return config;
  getUser();
}
console.log(config);
async function getUser() {
  try {
    // const response = await axios.get(
    //   'https://pixabay.com/api/?key=29419460-174de553ef6eeb556d53fec27&q=yellow+flowers&image_type=photo&per_page=10&page=2'

    // );

    // const response = await axios.get('https://pixabay.com/api/', config);
    const response = await axios(config);
    console.log(response.data);
  } catch (error) {
    console.error(error => console.log(error));
  }
}

// const sres = () => {
//   return '1';
// };
// console.log(sres());
