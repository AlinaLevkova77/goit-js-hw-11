import './css/styles.css';
import NewsApiService from './api/pixabay';
import Notiflix from 'notiflix';
import hits from './hbs/hits';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import './if';
// import './io';

let lightbox = null;
const refs = getRefs()

function getRefs() {
    return {
        form: document.querySelector('#search-form'),
        gallery: document.querySelector('.gallery'),
        sentinel: document.querySelector('.sentinel'),
    }
}
const newsApiService = new NewsApiService();



refs.form.addEventListener('submit', onSearch);

async function generateMarckupUI() {

  const result = await newsApiService.onFindPhotos()
  doNewMarcup(result.data.hits);
        
  newsApiService.setTotalHits(result.data.totalHits);
  console.log(result.data.total)
        // onLastPhotos()
      //  showMoreBtn()
      lightbox = new SimpleLightbox('.gallery a', {
        overlayOpacity: 0.4,
        animationSpeed: 100,
      });
    if (newsApiService.totalHits !== 0 ) {
    Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`);  
    return;
    }
    if (newsApiService.totalHits === 0) {
     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
    }
  onLastPhotos()
}
async function onSearch(e) {
    e.preventDefault();
    newsApiService.resetPage();
    clearMarcup();

    newsApiService.q = e.currentTarget.elements.searchQuery.value;
    generateMarckupUI();

 
}
function loadMore() {
    lightbox.refresh();
    newsApiService.page += 1;
    generateMarckupUI();
     
}
// generateMarkupUI получает данные с сервера и рендерит разметку

function doNewMarcup(marcup) {
    refs.gallery.insertAdjacentHTML('beforeend', hits(marcup));
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


    function onObserver(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio && newsApiService.q !== "") {
        loadMore();
      }
    })
  }
  
  const options = {
    rootMargin: "400px",
  };
  
  const observer = new IntersectionObserver(onObserver, options);
  observer.observe(refs.sentinel);
   










// if (newsApiService.totalHits !== 0) {
    
//     Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`);
       
//     return;
//   }
//   if (newsApiService.totalHits === 0) {
    
//     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    
//     return;
//   }
//   if (newsApiService.totalHits <= 0) {
    
//     refs.sentinel.textContent = "We're sorry, but you've reached the end of search results";
//   }





  