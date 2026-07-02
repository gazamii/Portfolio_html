/* ============================================================
   Friendly Warm — Portfolio 인터랙션
   1) Troubleshooting 아코디언 열고 닫기
   2) 내비게이션 부드러운 스크롤 (CSS scroll-behavior 보완 + 헤더 높이 보정)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. 아코디언 ---------- */
  var accordionBtns = document.querySelectorAll('.accordion__btn');

  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;            // .accordion__panel
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('open', !isOpen);
    });
  });

  /* ---------- 2. 부드러운 스크롤 (헤더 높이만큼 보정) ---------- */
  var HEADER_OFFSET = 72; // 상단 고정 내비 높이(px)
  var navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

});
