import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import renderingMarkup from './js/renderingMarkup';

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
        fetchCountries(searchQuery).then(renderingMarkup).catch(error => console.log(error));
    }
};