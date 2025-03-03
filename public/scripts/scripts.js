// /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }

 // Get all the navigation links
  const navLinks = document.querySelectorAll('.nav-link');

  // Loop through the links and check if their href matches the current URL
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');  // Add 'active' class to the current link
    }
  });