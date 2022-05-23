import axios from "axios";

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = null;
    }

    async onFindPhotos() {
    const BASIC_URL = 'https://pixabay.com';
    const URL_KEY = '27593469-896b3f7b8b670d808c482de21';

    return await axios.get(`${BASIC_URL}/api/?key=${URL_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    
}
    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
    
    resetPage(){
        this.page = 1;
    }
    increasePagу() {
        this.page += 1;
    }
}
