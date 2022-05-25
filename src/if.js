import InfiniteScroll from 'infinite-scroll';
console.log(InfiniteScroll);

var unsplashID = '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';


const infScroll = new InfiniteScroll( '.container', {
    responseBody: 'text',
    history: false,
    path() {
        const url = `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;
        return url;
  }
});
// console.log(infScroll)
infScroll.loadNextPage()

// infScroll.on('load',( response,path) =>{
//     console.log(JSON.parse(response));
//     console.log(path);
// });

// const fragment = document.createDocumentFragment();

// fragment.innerHTML = marcupEl;
// console.log(fragment);