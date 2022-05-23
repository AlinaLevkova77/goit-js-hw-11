import './css/styles.css';
import NewsApiService from './api/pixabay';
import Notiflix from 'notiflix';
import hits from './hbs/hits';

const refs = {
    form: document.querySelector('#search-form'),
    submit: document.querySelector('button[button-submit]'),
    gallery:document.querySelector('.gallery')
}

const newsApiService = new NewsApiService;

refs.submit.addEventListener('submit', onSearch)
refs.submit.addEventListener('click',onLoadMore)

async function onSearch(e) {
    e.preventDefault();
    clearMarcup()

    newsApiService.resetPage()
    newsApiService.query = e.currentTarget.elements.searchQuery.value;

    if (newsApiService.query === '') {
        Notiflix.Notify.failure("Please enter something in the field.");
        newsApiService.resetPage()
        return;
    }
}

async function onLoadMore() {
    newsApiService.resetPage()
}

function clearMarcup() {
    refs.gallery.innerHTML = '';
}

