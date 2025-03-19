// Get all the navigation links
 const navLinks = document.querySelectorAll('.nav-link');

 // Loop through the links and check if their href matches the current URL
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');  // Add 'active' class to the current link
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const moviesData = JSON.parse(
    document.getElementById("movies-data").textContent
  );
  const movieContainer = document.querySelector(
    ".row.row-cols-1.row-cols-sm-2.row-cols-md-3.g-3"
  );

  // Variables to hold the current filter and search state
  let currentFilter = "All"; // default filter (all movies)
  let currentSearchQuery = ""; // default search query

  // Function to render movies based on a given array
  function renderMovies(movies) {
    movieContainer.innerHTML = ""; // Clear current movies
    if (movies.length === 0) {
      movieContainer.innerHTML =
        '<div class="alert alert-warning">No movies found.</div>';
    } else {
      movies.forEach(function (movie) {
        movieContainer.innerHTML += `
          <div class="col">
            <div class="card shadow-sm">
              <img src="${
                movie.upload_image ? "/" + movie.upload_image : "/default.jpg"
              }" class="card-img-top" alt="${movie.movie_name}" />
              <div class="card-body">
                <div class="card-text">
                  <p>Movie Name: ${movie.movie_name}</p>
                  <p>Your Rating: ${Array.from(
                    { length: 5 },
                    (_, i) =>
                      `<span class="fa fa-star ${
                        i < movie.rating ? "checked" : ""
                      }"></span>`
                  ).join("")}</p>
                  <p>Genre: ${movie.genre.join(", ")}</p>
                  <p>Watch Status: ${movie.watch_status}</p>
                  <p>Added On: ${new Date(
                    movie.date_added
                  ).toLocaleDateString()}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group ms-auto">
                    <a href="/view/${
                      movie.id
                    }" class="btn btn-sm btn-success">View</a>
                    <button type="button" class="btn btn-sm btn-danger" onclick="document.getElementById('modal-${
                      movie.id
                    }').style.display='block'">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }
  }

  // Function to filter movies by watch status and search query
  function filterMovies() {
    let filteredMovies = moviesData;

    // Filter by watch status
    if (currentFilter !== "All") {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.watch_status === currentFilter
      );
    }

    // Filter by search query
    if (currentSearchQuery) {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.movie_name.toLowerCase().includes(currentSearchQuery) ||
          movie.genre.some((genre) =>
            genre.toLowerCase().includes(currentSearchQuery)
          )
      );
    }

    return filteredMovies;
  }

  // Function to sort movies
  function sortMovies(movies, option) {
    switch (option) {
      case "1": // Highest Rated First
        return movies.sort((a, b) => b.rating - a.rating);
      case "2": // Lowest Rated First
        return movies.sort((a, b) => a.rating - b.rating);
      case "3": // New to Old
        return movies.sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );
      case "4": // Old to New
        return movies.sort(
          (a, b) => new Date(a.date_added) - new Date(b.date_added)
        );
      default:
        return movies;
    }
  }

  // Handle filter change
  document.getElementById("filter").addEventListener("change", function () {
    currentFilter = this.value; // Update filter state
    const filteredMovies = filterMovies(); // Get filtered movies
    renderMovies(filteredMovies); // Render the filtered list
  });

  // Handle sort change
  document.getElementById("sort").addEventListener("change", function () {
    const sortOption = this.value;
    const filteredMovies = filterMovies(); // Apply current filter before sorting
    const sortedMovies = sortMovies(filteredMovies, sortOption); // Sort the filtered movies
    renderMovies(sortedMovies); // Render the sorted movies
  });

  // Handle search functionality
  document.getElementById("search-btn").addEventListener("click", function () {
    const searchQuery = document
      .querySelector('input[type="text"]')
      .value.toLowerCase();
    currentSearchQuery = searchQuery; // Update search query state
    const filteredAndSearchedMovies = filterMovies(); // Apply current filter and search
    renderMovies(filteredAndSearchedMovies); // Render the filtered and searched movies
  });

  // Handle reset functionality
  document.getElementById("reset-btn").addEventListener("click", function () {
    document.querySelector('input[type="text"]').value = ""; // Clear search input
    currentSearchQuery = ""; // Reset search state
    const filteredMovies = filterMovies(); // Apply filter (without search)
    renderMovies(filteredMovies); // Render the list
  });

  // Initial render
  renderMovies(moviesData);
});

