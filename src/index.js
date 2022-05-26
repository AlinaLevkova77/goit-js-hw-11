import './css/styles.css';
import NewsApiService from './api/pixabay';
import Notiflix from 'notiflix';
import hits from './hbs/hits';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import './if';
// import './io';

const lightbox = new SimpleLightbox('.photo-link', {
  overlayOpacity: 0.4,
  animationSpeed: 100,
});
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
    clearMarcup();

    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
   

    if (newsApiService.query === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        // hiddeShowMoreBtn()
        return;
    }
    newsApiService.resetPage();
    clearMarcup()
    
     try {
         const result = await newsApiService.onFindPhotos()
         console.log(result);
         clearMarcup();
         doNewMarcup(result.data.hits);
         
         newsApiService.setTotalHits(result.data.setTotalHits);
         onLastPhotos()
       //  showMoreBtn()
         
    } catch (error) {
        Notiflix.Notify.failure("Sorry ,there are no images matching your search query.Please try again.");
    }

}
async function loadMore(){
    lightbox.refresh();
    API.params.page += 1;
    doNewMarcup();
}
// generateMarkupUI получает данные с сервера и рендерит разметку

function doNewMarcup(marcup) {
    refs.gallery.insertAdjacentHTML('beforeend', hits(marcup))
    
}



function clearMarcup() {
    refs.gallery.innerHTML = '';
}
    function onLastPhotos() {
     if (newsApiService.totalHils <= 40) {
        
        // hiddeShowMoreBtn()
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
        clearMarcup();
        return;
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
            if (entry.IntersectionRatio && newsApiService.query !== '') {
               
                loadMore()
            }
        })
    }
    const options = {
        rootMargin: '150px',
    };
    const observer = new IntersectionObserver(onEntry, options);
    observer.observe(refs.sentinel);







