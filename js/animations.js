(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;

  var TARGETS = '.job-card, .proj-card, .card.achievement-card, .card.exp-card, .edu-card, .highlight-slider, .skills-list > div';
  var items = document.querySelectorAll(TARGETS);

  items.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease ' + (i % 5) * 70 + 'ms, transform 0.55s ease ' + (i % 5) * 70 + 'ms';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();
