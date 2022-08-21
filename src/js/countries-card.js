export default function createCardMarkup(country) {
  const {
    name: { official },
    capital,
    population,
    flags: { svg },
    languages,
  } = country[0];
  // console.log(official);
  const langList = Object.values(languages);

  return `<div class='country__header'>
    <img src="${svg}" alt="flag" width="60" height="45  " class="country__img" />
     <h2 class="country__name">${official}</h2>
</div>
<ul class="country__list">
  <li class="country__item">
    <p class="country__property">Capital: <span class="country__info">${capital}</span></p>
  </li>
  <li class="country__item">
    <p class="country__property">Population: <span class="country__info">${population}</span></p>
  </li>
  <li class="country__item">
    <p class="country__property">Languages: <span class="country__info">${langList}</span></p>
  </li>
</ul>`;
}
