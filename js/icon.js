function myFunction() {
  var x = document.getElementById("mynavbar");
  if (!x) return;

  var isOpen = x.classList.toggle("responsive");
  var button = x.querySelector(".nav-toggle");
  if (button) button.setAttribute("aria-expanded", String(isOpen));
}

document.addEventListener("DOMContentLoaded", function () {
  var nav = document.getElementById("mynavbar");
  if (!nav) return;

  nav.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("responsive");
      var button = nav.querySelector(".nav-toggle");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  });
});
