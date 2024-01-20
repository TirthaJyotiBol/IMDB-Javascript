
// this redirects to the movie detail page with the ID as parameter
function moveToDetails(movieObject){
    window.location.href  = 'moviepage.html?id='+movieObject.imdbID;
}

//  window.location.href  = '/IMDB-Javascript/moviepage.html?id='+movieObject.imdbID;

// create movie card and show in the page
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

    cardImage.addEventListener('click',()=>{
        moveToDetails(curr);
    })

    let footerCard = document.createElement('div');
    footerCard.classList.add('footer_card');

    let heartIcon = document.createElement('i');
    heartIcon.classList.add('fas');
    heartIcon.classList.add('fa-trash-alt');
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
            window.location.reload();
        }
         
    })

}

// Removes all the data from local storage
function clearAllFavourites(){
    let clear_btn = document.querySelector('#clear_favourites');
    clear_btn.addEventListener('click',()=>{
        localStorage.clear();
        window.location.reload();
    })
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



// populate favourites
function render(){

    let isAvailable = false;
    let heading  = document.querySelector('#fav_heading');
    let clear_btn = document.querySelector('#clear_favourites');

    Object.keys(localStorage).forEach(key => {
        if(key!='loglevel'){
            heading.textContent = 'Favourites';
            clear_btn.style.display = 'block';
            isAvailable = true;
            let obj = JSON.parse(localStorage.getItem(key));
            let listItem = document.createElement('li');
            listItem.textContent = obj.Title;
            createCardAllMovies(obj);
        }
    });

    if(!isAvailable){
        clear_btn.style.display = 'none';
        heading.textContent = 'No Favourites';
    }
    clearAllFavourites();
    sidebar();
}




render();




