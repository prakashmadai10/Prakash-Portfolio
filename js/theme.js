(function () {
  var storageKey = "prakash-portfolio-theme";
  var root = document.documentElement;
  var colorPreference = window.matchMedia("(prefers-color-scheme: dark)");

  function readStoredTheme() {
    try {
      var value = window.localStorage.getItem(storageKey);
      return value === "dark" || value === "light" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function systemTheme() {
    return colorPreference.matches ? "dark" : "light";
  }

  function currentTheme() {
    return root.dataset.theme || readStoredTheme() || systemTheme();
  }

  function applyTheme(theme, remember) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (remember) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (error) {
        // The theme still works for this page when storage is unavailable.
      }
    }

    updateToggle(theme);
  }

  function updateToggle(theme) {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    var darkMode = theme === "dark";
    var nextTheme = darkMode ? "light" : "dark";
    var icon = toggle.querySelector(".theme-toggle-icon");
    var label = toggle.querySelector(".theme-toggle-label");

    toggle.setAttribute("aria-pressed", String(darkMode));
    toggle.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
    toggle.title = "Switch to " + nextTheme + " mode";

    if (icon) icon.className = "fa " + (darkMode ? "fa-sun-o" : "fa-moon-o") + " theme-toggle-icon";
    if (label) label.textContent = darkMode ? "Light" : "Dark";
  }

  applyTheme(readStoredTheme() || systemTheme(), false);

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.getElementById("mynavbar");
    if (!nav || nav.querySelector(".theme-toggle")) return;

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.innerHTML =
      '<i class="fa theme-toggle-icon" aria-hidden="true"></i>' +
      '<span class="theme-toggle-label"></span>';

    var navCta = nav.querySelector(".nav-cta");
    var navActions = document.createElement("div");
    navActions.className = "nav-actions";

    if (navCta) {
      nav.insertBefore(navActions, navCta);
      navActions.appendChild(navCta);
    } else {
      nav.appendChild(navActions);
    }

    navActions.appendChild(toggle);
    updateToggle(currentTheme());

    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey && (event.newValue === "dark" || event.newValue === "light")) {
      applyTheme(event.newValue, false);
    }
  });

  if (typeof colorPreference.addEventListener === "function") {
    colorPreference.addEventListener("change", function () {
      if (!readStoredTheme()) applyTheme(systemTheme(), false);
    });
  }
})();
