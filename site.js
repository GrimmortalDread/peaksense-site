// PeakSense site: the menu on small screens, things fading up as they come
// into view, and screenshots that aren't there yet stepping aside (add
// ?shots to the address to see where each one goes).
(function () {
  var nav = document.querySelector('.nav'), btn = nav && nav.querySelector('.nav-toggle');
  if (btn) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  if (/[?&]shots\b/.test(location.search)) document.documentElement.classList.add('show-shots');
  document.querySelectorAll('img[data-shot-img]').forEach(function (img) {
    var box = img.closest('[data-shot]');
    var miss = function () { if (box) box.classList.add('pending'); };
    if (img.complete && !img.naturalWidth) miss();
    img.addEventListener('error', miss);
  });
  var els = document.querySelectorAll('.reveal, .stage-shot');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  els.forEach(function (e) { io.observe(e); });
})();
