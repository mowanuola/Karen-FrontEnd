function toggleSideNav() {
  const hamburger = document.querySelector("#hamburger");
  const sideNav = document.querySelector("#sidenav");
  hamburger.classList.toggle("change");
  sideNav.classList.toggle("sidenav-open");
}
