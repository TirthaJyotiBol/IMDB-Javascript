let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let apiKey = 'bd85c8e1';

let image = document.querySelector('img');
let movieName = document.querySelector('#movie-name');
let releaseYear = document.querySelector('#movie-release-year');
let movieType = document.querySelector('#type');
let genre = document.querySelector('#genre');
let movieDirectors = document.querySelector('#directors');
let movieRating = document.querySelector('#rating');
let movieLanguage = document.querySelector('#language');


function showDetails(id){
    let request = fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    request.then((res)=>{
        return res.json();
    })
    .then((data)=>{
        image.src = data.Poster;
        movieName.textContent = data.Title;
        releaseYear.textContent = data.Released;
        movieType.textContent = data.Type;
        genre.textContent = data.Genre;
        movieDirectors.textContent = data.Director;
        movieRating.textContent = data.imdbRating;
        movieLanguage.textContent = data.Language;
    })
}

showDetails(id);