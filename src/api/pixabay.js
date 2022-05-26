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
        // console.log(this);

        const queryString= `q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&pageSize=4&page=${this.page}`
        const response = await axios.get(`${BASIC_URL}/api/?key=${URL_KEY}&${queryString}`); 
        if (!response.data.total) {
            throw new Error('error');
        }
        return response;
        
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    setTotalHits(hits) {
        this.totalHits = hits;
    }
    
    resetPage() {
        this.page = 1;
    }
    increasePagу() {
        this.page += 1;
    }
    lastTotalHils() {
        this.totalHits -= 40;
    }
}

