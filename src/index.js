import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch (evt){
    const searchQuery = evt.target.value.trim();
    if (searchQuery !== '') {
        fetchCountries(searchQuery);
    }
};

function fetchCountries(name) {
    
    return fetch(`https://restcountries.com/v3.1/name/${name}/?fields=name,capital,population,flags,languages`).then(responce => {
        if (!response.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name.')
        } else { responce.json() }
    }).then(renderMarkup).catch(error => console.log(error))
}


function renderMarkup(countries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if (countries.status === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name.')
    }

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        return
    } if (countries.length > 2 && countries.length < 10) {
        const markcupListCountries = countries.map(({name, flags}) =>
            `<li class='country'>
            <img class='country-flag' alt="${name.official}" src='${flags.svg}' width=40 height=30>
            <span class='country-name'>${name.official}</span></li>`).join('');
        
        refs.countryList.innerHTML = markcupListCountries;
        return
    }
    if (countries.length === 1) {
        const [{ name, flags, capital, population, languages }] = countries;
        refs.countryInfo.innerHTML =
            `<div class='container'>
                <img class='country-flag' alt=${name.official} src='${flags.svg}' width=70 height=50>
                <h1 class='country-title'>${name.official}</h1>
            </div>
            <p><span class='title-info'>Capital:</span> ${capital}</p>
            <p><span class='title-info'>Population:</span> ${population}</p>
            <p><span class='title-info'>Languages:</span> ${Object.values(languages).join('')}</p>`
        return
    }
    if (countries.length === 0) {
        Notiflix.info('Oops, there is no country with that name')
        return
    }
    
}