export default function createCountriesList(country) {
  const {
    name: { official },
    flags: { svg },
  } = country;
  console.log(country);
  return `<li class = "list__item"> 
    <img src="${svg}" alt="flag" width="40" height="30" class="list__img" />
    <span class="list__name">${official}</span>
  </li>`;
}
