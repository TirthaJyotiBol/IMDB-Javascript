The following are the features : 
    1. Search for Favourite movies.
    2. Search for movies.
    3. Get details of a particular movie.
    4. Add and remove from Favourites.
    5. Responsiveness

Description: 

# HOME PAGE

    # Navbar 
    -> It is having elements : [Logo, Home Tab, Favourites Tab, Favourites search input, Icon]
    -> Click on the home tab to stay at the page.
    -> Click on favourites tab to move to favourites page.
    -> You can search all your liked movies using the imput field in the Navbar.

    # Banner
    -> Its just a simple hard coded poster of a movie

    # Search Movies
    -> You can live search and get recommended movies list using search facility
    -> Async Await is used to fetch API for that 
        [ when any user's key in up it immediately searches for that element in the API]
        [ Here API fetch using title is used]

    # All Movie Section
    -> Each Movie box is having 4 elements 
        "Image","like icon","detail icon","Name"
    -> Each Image is set with some border , radius and box shadow
    -> when we hover over any of the 2 icons it scales up.
    -> click on the like button to add that element to Liked List
    -> Once liked the icon colour changes to red, click on that icon again to unlike that movie.

    LOGIC BEHIND LIKE/UNLIKE
    ........................

    -> used local storage of browser to store liked elements
    -> Local storage is having key of movie ID and its movie object is the equivalent value.
    -> When user likes the movie it is set to local storage
    -> If it's already liked and user reclicks to that movie , it gets unlike

    {
        - found online reference to use key as "favourites" and it value as Array
        - didnot used that because I thought for this we need to travel the entire array to fetch element
        and as a result would increase time complexity
        - So I used Key Value with key as ID and value as object , just like a hashmap
    }

    LOGIC BEHIND SEARCH OF FAVOURITE MOVIES
    .......................................

    -> when any user searches any word, it linearly searches with each word typed
    -> It checks if that letter/word is included in any of the Object
    -> when found that element is displayed

# Favourites Page

    -> It shows all the favourite movies
    -> when user clicks on the delete button that movie gets deleted
    -> whenuser clicks on the DELETE ALL in the top, all of the movies are deleted
        [localStorage.clear is used to clear all the movies]

# Detail Page
    -> whenever any user clicks on any of the page detail then user is redirected to Page Detail Page.
    -> LHS of it shows the movie Image
    -> while RHS shows the details
    -> In the button the ratings of those from different Platforms are shown.

# RESPONSIVENESS
    -> Proper responsivensess is taken care of.
    -> User in Small devices will have the facility of side bar,
    -> Clicking on the HAMBURGER icon would display the Sidebar, while clicking on the 
        cross icon would vanish the sidebar

LINK : https://tirthajyotibol.github.io/IMDB-Javascript/