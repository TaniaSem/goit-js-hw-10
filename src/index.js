import './css/styles.css';

// const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  fetchCountries('peru')
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    // console.log(response.json());
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = createCardMarkup(country);
  refs.card.innerHTML = markup;
}

function createCardMarkup(country) {
  return country
    .map(({ name, capital, population, flags, languages }) => {
      return `
        <img src="${flags.svg}" alt="flag" width="40" height="30" class="item-img" />
        <h2 class="country__name">${name.official}</h2>
        <ul class="country__description">
            <li class="country__item>
                <p class="country__property">Capital: <span class="country__info">${capital}</span></p>
            </li>
            <li class="country__item>
                <p class="country__property">Population: <span class="country__info">${population}</span></p>
            </li>
            <li class="country__item>
                <p class="country__property">Languages: <span class="country__info">${languages}</span></p>
            </li>
        </ul>
    
      `;
    })
    .join(' ');
}
