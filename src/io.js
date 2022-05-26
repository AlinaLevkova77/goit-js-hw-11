const callback = (entries,io) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Hi');
            console.log(entry.target);
        }
    });
}
const options = {};

const observer = new IntersectionObserver(callback,options);

const sentinel = document.querySelector('.container');
observer.observe(refs.sentinel);