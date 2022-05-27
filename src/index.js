import './css/styles.css';
import NewsApiService from './api/pixabay';
import Notiflix from 'notiflix';
import hits from './hbs/hits';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import './if';
// import './io';

let lightbox = null;

const refs={
        form: document.querySelector('#search-form'),
        gallery: document.querySelector('.gallery'),
        sentinel: document.querySelector('.sentinel'),
    }

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
    e.preventDefault();
    // newsApiService.resetPage();
   newsApiService.resetPage();
    const form =e.target
    newsApiService.q = form.elements.searchQuery.value;
    // generateMarckupUI();
    createItems()

  refs.gallery.innerHTML = '';
  refs.sentinel.textContent = '';
 
}

function createItems() {
  newsApiService.onFindPhotos().then(items => {
    console.log(items);
    showNotification(items);
    doNewMarcup(items);
    
  })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`${error}`)
    })


  // const result = await newsApiService.onFindPhotos()
  // doNewMarcup(result.data.hits);
        
  // newsApiService.setTotalHits(result.data.totalHits);
  // console.log(result.data)
}
 async function doNewMarcup(items) {
  const markupGallery = hits(items.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markupGallery);
  var lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh()
}
      
  function showNotification(items) {
    if (items.totalHits !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${items.totalHits} images.`);
      
    }
    if (items.total === 0) {
      clearMarcup();
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    
      return;
    }
    if (newsApiService.totalHits <= 0) {
      refs.sentinel.textContent = "We're sorry, but you've reached the end of search results";
    }
  }


// function loadMore() {
//     lightbox.refresh();
//     newsApiService.page += 1;
//     generateMarckupUI();
     
// }
// generateMarkupUI получает данные с сервера и рендерит разметку





// function clearMarcup() {
//     refs.gallery.innerHTML = '';
// }
// function onLastPhotos() {
//     if (newsApiService.totalHils <= 40) {
//         // hiddeShowMoreBtn()
//         Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
//         clearMarcup();
//         return;
//     }
    

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





  