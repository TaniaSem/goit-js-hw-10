import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/countries-fetch';
import createCountriesList from './js/countries-list';
import createCardMarkup from './js/countries-card';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const name = e.target.value.trim();
  onClean();

  fetchCountries(name)
    .then(country => {
      console.log(country);
      if (country.length === 1) {
        onClean();
        const cardMarkup = createCardMarkup(country);
        refs.card.innerHTML = cardMarkup;
      } else if (country.length >= 2 && country.length <= 10) {
        const listMarkup = country.map(createCountriesList).join('');
        refs.list.insertAdjacentHTML('beforeend', listMarkup);
      } else if (country.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (name === '') {
        onClean();
        Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      onClean();
      Notify.failure('Oops, there is no country with that name');
    });
}

function onClean() {
  refs.list.innerHTML = '';
  refs.card.innerHTML = '';
}
