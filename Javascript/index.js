let apiKey = 'bd85c8e1';
let banner_poster = document.querySelector('#banner_poster');
let banner_name = document.querySelector('#movie-name-banner');

// localStorage.clear();
// let favourites = JSON.parse(localStorage.getItem("favourites")) || [];


function bannerDetail(){
    let request = fetch(`http://www.omdbapi.com/?s=india&apikey=${apiKey}`);
    request.then((res)=>{
        return res.json();
    })
    .then((data)=>{
        let array = data.Search;
        
        let curr = 0;
        if(curr>=array.length){
            curr= 0;
        }

        banner_poster.src = array[curr].Poster;
        banner_name.textContent = array[curr].Title;

        setInterval(()=>{
            curr+=1;
        },1000);

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


// this function works to move to movie detail page and shows details about that movie
function moveToDetails(movieObject){
    window.location.href  = '/moviepage.html?id='+movieObject.imdbID;
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
    heartIcon.id = curr.imdbID;


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

    detailIcon.addEventListener('click',(e)=>{
        moveToDetails(curr);
    });

    // add to favourites
    heartIcon.addEventListener('click',()=>{    
        let key = heartIcon.id;

        if(!localStorage.getItem(key)){
            localStorage.setItem(key,JSON.stringify(curr));
            console.log("liked"); 
        }
        else{
            localStorage.removeItem(key);
            console.log("removed");
        }
         
    })

}


// function toggleLikes(button,movieObject){
//     let find = favourites.findIndex((ele)=>{
//         return ele.imdbID===movieObject.imdbID;
//     })

//     // add to favourites
//     if(favourites.length==0 || find==-1){
//         favourites.push(movieObject);
//     }

//     // remove from favourites
//     else{
//         favourites.splice(find,1);
//     }
//     localStorage.setItem("favourites",JSON.stringify(movieObject));
//     // console.log(favourites);
// }



function render(){
    // populate the initial movies
    for(let i=1;i<5;i++){
        populateInitialMovie(i);
    }
}

render();

