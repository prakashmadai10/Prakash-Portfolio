(function () {
  'use strict';

  var selectors = [
    '.card', '.exp-card', '.job-card', '.proj-card',
    '.section-heading', '.achievement-featured', '.achievement-card',
    '.skills-list', '.filter-bar', '.page-metrics', '.pub-meta'
  ].join(', ');

  var targets = Array.prototype.slice.call(document.querySelectorAll(selectors));
  if (!targets.length) return;

  // Fallback: no IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('reveal', 'is-visible'); });
    return;
  }

  // Stagger siblings within the same parent container
  var seen = new Map();
  targets.forEach(function (el) {
    var parent = el.parentElement;
    var idx = seen.has(parent) ? seen.get(parent) : 0;
    seen.set(parent, idx + 1);
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(idx * 0.08, 0.3) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
