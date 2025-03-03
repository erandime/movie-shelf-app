// Get all the navigation links
 const navLinks = document.querySelectorAll('.nav-link');

 // Loop through the links and check if their href matches the current URL
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');  // Add 'active' class to the current link
  }
});