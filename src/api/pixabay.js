import axios from "axios";

export default class NewsApiService {
    constructor() {
        this.q = '';
        this.page = 1;
        this.totalHits = null;
        
    }

    async onFindPhotos() {
        const BASIC_URL = 'https://pixabay.com';
        const URL_KEY = '27593469-896b3f7b8b670d808c482de21';

        const queryString= `q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
        const url = await axios.get(`${BASIC_URL}/api/?key=${URL_KEY}&${queryString}`); 
        this.incrementPage()
        return (await axios(url)).data;
    }

    
    setTotalHits(hits) {
        this.totalHits = hits;
    }
    
    resetPage() {
        this.page = 1;
    }
    incrementPage() {
        this.page += 1;
    }
    lastTotalHils() {
        this.totalHits -= 40;
    }
}

