/* Lightweight state switcher for the AeroRisk UI mockups.
   Each mockup page declares "screens" (data-screen) and buttons
   (data-show) so reviewers can step through the use-case flow. */
(function () {
  function show(group, name) {
    document.querySelectorAll('[data-screen="' + group + '"]').forEach(function (el) {
      el.classList.toggle('hidden', el.getAttribute('data-name') !== name);
    });
    document.querySelectorAll('[data-show="' + group + '"]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-target') === name);
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-show]');
    if (!b) return;
    e.preventDefault();
    show(b.getAttribute('data-show'), b.getAttribute('data-target'));
  });

  // Initialize each group to its first declared screen.
  document.addEventListener('DOMContentLoaded', function () {
    var groups = {};
    document.querySelectorAll('[data-screen]').forEach(function (el) {
      var g = el.getAttribute('data-screen');
      if (!(g in groups)) groups[g] = el.getAttribute('data-name');
    });
    Object.keys(groups).forEach(function (g) { show(g, groups[g]); });
  });
})();
