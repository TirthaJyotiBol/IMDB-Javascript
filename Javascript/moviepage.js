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
let section = document.querySelector('section');


function showDetails(id){
    let request = fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    let ratingBox_container = document.querySelector('#rating-box-container');

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

        let ratingArray = data.Ratings;
        ratingArray.forEach((curr)=>{
            let tag = `
            <div class="rating-box">
                <h3 class="rated-by">${curr.Source}</h3>
                <p class="rated-value">${curr.Value}</p>
            </div>
            `
            ratingBox_container.insertAdjacentHTML("afterbegin",tag);
        })

    })
}

showDetails(id);