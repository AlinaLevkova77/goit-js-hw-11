import './css/styles.css';
import NewsApiService from './api/pixabay';
import Notiflix from 'notiflix';
import hits from './hbs/hits';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

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
  console.log(result.data)
      lightbox = new SimpleLightbox('.gallery a', {
        overlayOpacity: 0.4,
        animationSpeed: 100,
      });
 
}
 function onSearch(e) {
  newsApiService.resetPage();
  newsApiService.q = e.currentTarget.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  e.preventDefault();
  generateMarckupUI();
   newsApiService.onFindPhotos().then(({ data } = {}) => {
     if (data?.total === 0) {
       Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       return;
     }
     totalHitsNotification(data?.total)
   });
  }
  
function totalHitsNotification() {
  if (newsApiService.totalHits !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${newsApiService.totalHits} images.`);
  }
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
   










