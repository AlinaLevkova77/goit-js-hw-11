import './css/styles.css';
import NewsApiService from './api/pixabay';
import Notiflix from 'notiflix';
import hits from './hbs/hits';
// import './if';
// import './io';
const refs = getRefs()

function getRefs() {
    return {
        form: document.querySelector('#search-form'),
        gallery: document.querySelector('.gallery'),
        sentinel: document.querySelector('.sentinel'),
    }
}
const newsApiService = new NewsApiService();


refs.form.addEventListener('submit', onSearch)

async function onSearch(e) {
    e.preventDefault();
    clearMarcup()

   newsApiService.resetPage()
   newsApiService.query = e.currentTarget.elements.searchQuery.value;

    if (newsApiService.query === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        // hiddeShowMoreBtn()
        return;
    }
    newsApiService.resetPage()
    clearMarcup()
    
     try {
        const result = await newsApiService.onFindPhotos()
        doNewMarcup(result)
        clearMarcup()
        
         newsApiService.setTotalHits(result.data.setTotalHits);
         onLastPhotos()
        //  showMoreBtn()
    } catch (error) {
        Notiflix.Notify.failure("Sorry ,there are no images matching your search query.Please try again.");
    }

}
// refs.onLoadMoreBtn.addEventListener('click',onLoadMore)

// async function onLoadMore() {
//     newsApiService.increasePagу()
// }

function doNewMarcup(marcup) {
 refs.gallery.insertAdjacentHTML('beforeend',hits(marcup))
}

function clearMarcup() {
    refs.gallery.innerHTML = '';
}
function onLastPhotos() {
    if (newsApiService.lastTotalHils <= 40) {
        hiddeShowMoreBtn()
       Notiflix.Notify.info("We're sorry, but you've reached the end of search results");

   }
}
// function hiddeShowMoreBtn() {
//     refs.onLoadMoreBtn.classList.add('is-hidden')
// }

// function showMoreBtn() {
//     refs.onLoadMoreBtn.classList.remove('is-hidden')
// }

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('пора' + DataTransfer.now());
        }
    })
}


const observer = new IntersectionObserver(onEntry,options);
const options = {}; 

observer.observe(refs.sentinel);

