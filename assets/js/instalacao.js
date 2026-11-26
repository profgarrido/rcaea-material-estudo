(function () {
  'use strict';

  /* ── Botões de cópia ── */
  function initCopyButtons() {
    document.querySelectorAll('[data-command-block]').forEach(function (block) {
      var button = block.querySelector('[data-copy-command]');
      var code = block.querySelector('pre code');
      var status = block.querySelector('[data-copy-status]');
      if (!button || !code) return;
      button.style.display = '';
      button.addEventListener('click', function () {
        var command = code.textContent.trim();
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          if (status) status.textContent = 'Selecione e copie manualmente.';
          return;
        }
        navigator.clipboard.writeText(command).then(function () {
          if (status) status.textContent = 'Copiado.';
          button.textContent = 'Copiado!';
          setTimeout(function () {
            button.textContent = 'Copiar';
            if (status) status.textContent = '';
          }, 2000);
        }).catch(function () {
          if (status) status.textContent = 'Selecione e copie manualmente.';
        });
      });
    });
  }

  /* ── Accordeão OS: apenas um aberto por vez (fallback) ── */
  function initOsAccordions() {
    var osDetails = Array.prototype.slice.call(
      document.querySelectorAll('.os-accordion')
    );
    if (osDetails.length === 0) return;

    var supportsNamedDetails = (function () {
      try {
        var d = document.createElement('details');
        d.setAttribute('name', '__test__');
        return typeof d.name === 'string';
      } catch (e) {
        return false;
      }
    })();

    if (!supportsNamedDetails) {
      osDetails.forEach(function (detail) {
        detail.addEventListener('toggle', function () {
          if (!detail.open) return;
          osDetails.forEach(function (other) {
            if (other !== detail && other.open) {
              other.open = false;
            }
          });
        });
      });
    }
  }

  /* ── Navegação por hash: abrir ancestral recolhido ── */
  function openAncestorsForHash(hash) {
    if (!hash) return;
    var target = document.getElementById(hash.replace('#', ''));
    if (!target) return;
    var el = target;
    while (el && el !== document.body) {
      if (el.tagName === 'DETAILS' && !el.open) {
        el.open = true;
      }
      el = el.parentElement;
    }
    setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
  }

  function initHashNav() {
    if (window.location.hash) {
      openAncestorsForHash(window.location.hash);
    }
    window.addEventListener('hashchange', function () {
      openAncestorsForHash(window.location.hash);
    });
  }

  /* ── Scrollspy: destaca seção ativa no nav lateral ── */
  function initScrollspy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = {};
    document.querySelectorAll('.lateral [href^="#"], .nav-movel [href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (!navLinks[id]) navLinks[id] = [];
      var li = a.closest('li');
      if (li) navLinks[id].push(li);
    });
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var links = navLinks[e.target.id];
          if (links) links.forEach(function (li) { li.classList.toggle('ativo', e.isIntersecting); });
        });
      }, { rootMargin: '-15% 0px -60% 0px' });
      sections.forEach(function (s) { obs.observe(s); });
    }
  }

  /* ── Menu móvel ── */
  function initMobileMenu() {
    var btn = document.getElementById('btn-nav-movel');
    var nav = document.getElementById('nav-movel');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        nav.setAttribute('hidden', '');
      } else {
        nav.removeAttribute('hidden');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCopyButtons();
    initOsAccordions();
    initHashNav();
    initMobileMenu();
    initScrollspy();
  });
})();
