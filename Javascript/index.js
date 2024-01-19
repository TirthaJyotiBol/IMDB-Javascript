
// Fetch all the necessary elements
let apiKey = 'bd85c8e1';
let banner_poster = document.querySelector('#banner_poster');
let banner_name = document.querySelector('#movie-name-banner');


/* 
    when user Types and the key is up then
    This function automatically searches with the keyword matcking movies
    - If response is OK then createCard() will create the movie card and append to
      its respective position
*/
async function searchMovie()
{
    let input = document.querySelector('#search_movie_input').value;

    let recomendationHeading = document.querySelector('#all_movies_heading');
    let allMoviesSection = document.querySelector('.all-movies');

    input = input.trim();
    allMoviesSection.innerHTML = '';
    try{

        let url =  `http://www.omdbapi.com/?s=${input}&apikey=${apiKey}`;
        const req = await fetch(url);
        const res = await req.json();

        // if user only types space or clears the input value
        // then show the default page of Marvel movie
        if(input.length==0){
            recomendationHeading.classList.remove('noMovieFound');
            recomendationHeading.textContent = 'Trendings Movies';
            populateInitialMovie(6);
            return;
        }
        
        if(res.Response==="True"){
            recomendationHeading.classList.remove('noMovieFound');
            allMoviesSection.style.display = 'flex';
            recomendationHeading.textContent = 'Recommended Movies';
            console.log(res);

            let array = res.Search;
            console.log(array);
            array.forEach((curr)=>{
                // This function will automaticlally create card and append to its
                // correct position
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
    window.location.href  = 'moviepage.html?id='+movieObject.imdbID;
}

// initially when the document loads
// This will be visible to user

// page number is taken as parameter because it depends on us how many results we wany user to visibe
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

// This is the function that takes movie object as parameter
// and automatically creates element and append to its respective place

function createCardAllMovies(curr){
    let allMovieSection = document.querySelector('.all-movies');

    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    allMovieSection.appendChild(movieCard);

    let cardImage = document.createElement('img');
    cardImage.classList.add('image_card');
    cardImage.src = curr.Poster;
    cardImage.onerror=()=>{
        cardImage.src = 'Images/default.jpg';
    }

    cardImage.onclick=()=>{
        moveToDetails(curr);
    }

    let footerCard = document.createElement('div');
    footerCard.classList.add('footer_card');

    let heartIcon = document.createElement('i');
    heartIcon.classList.add('fas');
    heartIcon.classList.add('fa-heart');
    // heartIcon.classList.add('favouriteIcon');
    heartIcon.id = curr.imdbID;

    //  change colour of like button if element is liked or not
    if(isLiked(curr.imdbID)){
        heartIcon.classList.add('favouriteIconLiked');
        heartIcon.classList.remove('favouriteIcon');
    }
    else{
        heartIcon.classList.remove('favouriteIconLiked');
        heartIcon.classList.add('favouriteIcon');
    }


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

    // when clicked on detail icon, The page redirects to detail page
    // where the detail about the movie is shown
    detailIcon.addEventListener('click',(e)=>{
        moveToDetails(curr);
    });

    // add to favourites
    heartIcon.addEventListener('click',()=>{    
        let key = heartIcon.id;

        //  used local storage of "key":"value" pair to store favourites
        /*
            key : imdbID
            value : movie-object
        */
        if(!localStorage.getItem(key)){

            // if not liked the add to local storagae
            localStorage.setItem(key,JSON.stringify(curr));

            // colouring 
            heartIcon.classList.add('favouriteIconLiked');
            heartIcon.classList.remove('favouriteIcon');
        }
        else{
            // if already liked the remove from storage
            localStorage.removeItem(key);

            // coloring
            heartIcon.classList.remove('favouriteIconLiked');
            heartIcon.classList.add('favouriteIcon');
        }
         
    })

}

//  checks if the movie is added to favourite or not
function isLiked(id){
    let ele = localStorage.getItem(id);
    if(ele){
        return true;
    }
    return false;
}


// sidebar implementation for small devices
function sidebar(){
    /*
        - sidebar is the div where elements are displayed
        - hamIcon is the hamburger icon that is displayed initialy at small screens
        - when we click on hamburger icon then the sidebar appears, hamIcon disappears and the 
           crossbar to shut the sidebar appears
        - whenever click on cross icon take place then sidebar disappers wth the cross button
            and the hamicon again appears.
     */
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

/*
    This is an extra functionality implemented in the navbar input field
    Here user can search his favourites and particularly boxes appear near the field
    The boxes contains search results
*/

function searchFavourites(){
    let input = document.querySelector('#navbar_input');
    let inputValue = input.value.trim();
    let ul = document.querySelector('#list-box-fav');
    ul.innerHTML = '';

    if(inputValue.length==0){
        ul.style.display = 'none';
        return;
    }
    else{
        ul.style.display = 'block';
    }

    // Traverse the whole local storage to search for results
    Object.keys(localStorage).forEach(key => {
        if(key!='loglevel'){
            let data = JSON.parse(localStorage.getItem(key));

            // user can search by "movie-name","year","Type" of the movie
            if(data.Title.includes(inputValue) || data.Year.includes(inputValue) ||  data.Type.includes(inputValue) ){
                
                let listItem = document.createElement('li');

                let tag = `
                    <div class="box" id="${key}">
                        <img src="${data.Poster}" alt="Loading...">
                        <div class="desc-box-fav">
                            <p class="movie-name-fav">${data.Title}</p>
                            <p class="movie-year-fav">${data.Year}</p>
                        </div>
                    </div>
                `;
                listItem.insertAdjacentHTML("afterbegin",tag);
                ul.appendChild(listItem);

                listItem.addEventListener('click',()=>{
                    window.location.href  = 'moviepage.html?id='+data.imdbID;
                })
            }
        }
    });

}





function render(){
    // populate the initial movies
    for(let i=1;i<5;i++){
        populateInitialMovie(i);
    }

    // use the siebar 
    sidebar();

    let date = document.querySelector('#date');
    let d = new Date();
    date.textContent = d.getFullYear();
}

render();

