let apiKey = 'bd85c8e1';

let banner_poster = document.querySelector('#banner_poster');

function bannerDetail(){
    let request = fetch(`http://www.omdbapi.com/?y=2023&apikey=${apiKey}`);
    request.then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data);
        // banner_poster.src = data.Poster;
    })
}

async function searchMovie(){
    let input = document.querySelector('#search_movie_input').value;
    let recomendationHeading = document.querySelector('#all_movies_heading');
    let allMoviesSection = document.querySelector('.all-movies');

    input = input.trim();
    
    try{

        let url =  `http://www.omdbapi.com/?s=${input}&page=1&apikey=${apiKey}`;
        const req = await fetch(url);
        const res = await req.json();

        allMoviesSection.innerHTML = '';
        if(input.length==0){
            recomendationHeading.classList.remove('noMovieFound');
            recomendationHeading.textContent = 'Recommended Movies';
            populateInitialMovie(4);
            return;
        }
        
        if(res.Response==="True"){
            recomendationHeading.classList.remove('noMovieFound');
            allMoviesSection.style.display = 'flex';
            recomendationHeading.textContent = 'Recommended Movies';
            
            let array = res.Search;

            array.forEach((curr)=>{
                createCardAllMovies(curr);
            })
        }
        else{
            recomendationHeading.classList.add('noMovieFound');
            recomendationHeading.textContent = 'OOPS!! No recommendations ';
        }
    }
    catch(err){
        console.log(err);
    }

}



function populateInitialMovie(pageNumber){
    let request = fetch(`http://www.omdbapi.com/?s=marvel&page=${pageNumber}&apikey=${apiKey}`);
    request.then((res)=>{
        return res.json();
    })
    .then((data)=>{

        let array = data.Search;

        array.forEach((curr)=>{
            createCardAllMovies(curr);
        })
        
    })
}

function createCardAllMovies(curr){
    let allMovieSection = document.querySelector('.all-movies');

    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    allMovieSection.appendChild(movieCard);

    let cardImage = document.createElement('img');
    cardImage.classList.add('image_card');
    cardImage.src = curr.Poster;

    let footerCard = document.createElement('div');
    footerCard.classList.add('footer_card');

    let heartIcon = document.createElement('i');
    heartIcon.classList.add('fas');
    heartIcon.classList.add('fa-heart');
    heartIcon.classList.add('favouriteIcon');

    let detailIcon = document.createElement('i');
    detailIcon.classList.add('fas');
    detailIcon.classList.add('fa-circle-info');
    detailIcon.classList.add('detailIcon');

    let movieName = document.createElement('h3');
    movieName.classList.add('movie-name');
    movieName.textContent = curr.Title;

    movieCard.appendChild(cardImage);
    movieCard.appendChild(footerCard);
    footerCard.appendChild(heartIcon);
    footerCard.appendChild(detailIcon);
    movieCard.appendChild(movieName);
}


function render(){
    // populate the initial movies
    for(let i=1;i<5;i++){
        populateInitialMovie(i);
    }
}

render();
