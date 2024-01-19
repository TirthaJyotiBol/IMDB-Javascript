
//  get the ID from the URL 
// using the ID the equivalent movie details are fetched
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let apiKey = 'bd85c8e1';

// fetch required elements
let image = document.querySelector('img');
let movieName = document.querySelector('#movie-name');
let releaseYear = document.querySelector('#movie-release-year');
let movieType = document.querySelector('#type');
let genre = document.querySelector('#genre');
let movieDirectors = document.querySelector('#directors');
let movieRating = document.querySelector('#rating');
let movieLanguage = document.querySelector('#language');
let section = document.querySelector('section');
let plot = document.querySelector('#plot');

// if the movie image is not loaded then this default image is shown
function setDefault(){
    image.src = 'Images/default.jpg';
}

// get the ID from URL and show the movie details
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
        plot.textContent = data.Plot;

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

// sidebar for small devices
function sidebar(){
    let cross = document.querySelector('.cross_icon');
    let sidebar = document.querySelector('#sidebar');
    let hamIcon = document.querySelector('.ham_icon');

    cross.addEventListener('click',()=>{
        sidebar.style.display = 'none';
        hamIcon.style.display = 'none';
    })

    hamIcon.addEventListener('click',()=>{
        sidebar.style.display = 'block';
    })
}


showDetails(id);

sidebar();