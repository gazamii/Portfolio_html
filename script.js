/* ============================================================
   Friendly Warm — Portfolio 인터랙션
   1) Troubleshooting 아코디언 열고 닫기
   2) 프로젝트 카드 확장(자세히 보기/접기) — 한 번에 하나만 열림
   3) 내비게이션 부드러운 스크롤 (CSS scroll-behavior 보완 + 헤더 높이 보정)
   4) 유튜브 파사드 — 클릭 전엔 썸네일만, 클릭 시에만 iframe 로드
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

  /* ---------- 2. 프로젝트 카드 확장 ---------- */
  var projectToggles = document.querySelectorAll('.project__toggle');

  function closeProject(toggle) {
    var project = toggle.closest('.project');
    var detail = project.querySelector('.project__detail');
    var label = toggle.querySelector('.project__toggle-label');

    toggle.setAttribute('aria-expanded', 'false');
    detail.classList.remove('open');
    label.textContent = '자세히 보기';

    // 카드를 접으면 재생 중인 영상 iframe을 제거해 소리가 계속 나지 않게 함
    // (파사드 버튼은 그대로 남아 있어 다시 펼치면 재생 버튼부터 시작)
    var playing = detail.querySelector('.project__video iframe');
    if (playing) playing.remove();
  }

  function openProject(toggle) {
    var project = toggle.closest('.project');
    var detail = project.querySelector('.project__detail');
    var label = toggle.querySelector('.project__toggle-label');

    toggle.setAttribute('aria-expanded', 'true');
    detail.classList.add('open');
    label.textContent = '접기';
  }

  projectToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';

      projectToggles.forEach(function (other) {
        if (other !== toggle) closeProject(other);
      });

      if (isOpen) {
        closeProject(toggle);
      } else {
        openProject(toggle);
      }
    });
  });

  /* ---------- 4. 유튜브 파사드 ---------- */
  var facades = document.querySelectorAll('.project__video-facade');

  facades.forEach(function (btn) {
    var videoId = btn.getAttribute('data-video');
    var thumb = btn.querySelector('img');

    // maxresdefault 썸네일이 없는 영상이면 hqdefault로 폴백
    thumb.addEventListener('error', function () {
      thumb.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
    }, { once: true });

    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
      iframe.title = btn.getAttribute('aria-label');
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      // 파사드 위에 얹기만 하고 버튼은 남겨둠 — 카드 접을 때 iframe만 제거하면 복원됨
      btn.parentElement.appendChild(iframe);
    });
  });

  /* ---------- 3. 부드러운 스크롤 (헤더 높이만큼 보정) ---------- */
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
