import Notiflix from 'notiflix';

export default function renderingMarkup(countries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        return
    }
    
    if (countries.length > 2 && countries.length < 10) {
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
}