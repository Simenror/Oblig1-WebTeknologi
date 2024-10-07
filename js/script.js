const postContainer = document.getElementById("post_container");
let currentPage = 1; // Sets current page to 1 so it allways starts at 1

function fetchPosts(page) {

    // Fetches pages from the api with a maximum of the posts per page
    fetch(`https://jsonplaceholder.typicode.com/posts/?_page=${page}&_limit=3`)
      .then(response => response.json()) // Translates to JSON
      .then(posts => {
            // Goes through each post it recieved from the API and adds it
            posts.forEach(post => {
                const postContent = document.createElement('div');
                postContent.classList.add('post_content')

                // Puts the title and the body from the post into the postContent
                postContent.innerHTML =`
                <h2>${post.title}</h2> 
                <p>${post.body}</p>
                `;

                // Adds the postContent to the container on the page
                postContainer.appendChild(postContent);
            })
        })
}
fetchPosts(currentPage); // Fetches the initial posts

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-20){
        currentPage++;
        fetchPosts(currentPage); // Fetches a new page with 3 posts when it reaches the bottom
    }
})