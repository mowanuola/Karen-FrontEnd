function toggleSideNav() {
  const hamburger = document.querySelector("#hamburger");
  const sideNav = document.querySelector("#sidenav");
  hamburger.classList.toggle("change");
  sideNav.classList.toggle("sidenav-open");
}
function registerServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(reg => {
        console.log(
          "Service Worker Registration Successful with scope:",
          reg.scope
        );
      })
      .catch(error => {
        console.log("Service Worker Registration Failed:", error);
      });
  }
}
registerServiceWorker();
