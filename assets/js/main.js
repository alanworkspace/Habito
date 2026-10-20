/* =========================================================
   Habito · Landing Page interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Store badge placeholders ---------- */
  /* Replace the href="#" in index.html with your real store URLs. */
  document.querySelectorAll('[data-store]').forEach(function (badge) {
    badge.addEventListener('click', function (e) {
      if (badge.getAttribute('href') === '#') {
        e.preventDefault();
        var name = badge.getAttribute('data-store') === 'appstore' ? 'App Store' : 'Google Play';
        showToast('即將於 ' + name + ' 上架，敬請期待！');
      }
    });
  });

  function showToast(message) {
    var toast = document.createElement('div');
    toast.textContent = message;
    toast.setAttribute(
      'style',
      [
        'position:fixed',
        'left:50%',
        'bottom:2rem',
        'transform:translateX(-50%) translateY(12px)',
        'background:#1A1E2A',
        'color:#fff',
        'padding:0.85rem 1.25rem',
        'border-radius:1rem',
        'border:1px solid rgba(255,255,255,0.1)',
        'box-shadow:0 20px 50px -20px rgba(0,0,0,0.9)',
        'font-size:0.875rem',
        'z-index:9999',
        'opacity:0',
        'transition:opacity .3s ease, transform .3s ease',
        'pointer-events:none',
      ].join(';')
    );
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(12px)';
      setTimeout(function () {
        toast.remove();
      }, 320);
    }, 2400);
  }

  /* ---------- Dynamic year ---------- */
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
