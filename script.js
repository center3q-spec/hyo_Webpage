// GitHub Pages에서 별도 서버 없이 동작합니다.
const backTop = document.querySelector('.back-top');
function updateBackTop() { backTop.classList.toggle('visible', window.scrollY > Math.max(250, window.innerHeight * .55)); }
window.addEventListener('scroll', updateBackTop, { passive: true });
updateBackTop();

// 02 / MOODBOARD: 6장 이미지 클릭 확대 / 이전·다음 / ESC 닫기
(() => {
  const images = [
    ['./assets/mood-1.png', '마법 구체'],
    ['./assets/mood-2.png', '붉은 마법진'],
    ['./assets/mood-3.png', '붉은 달의 마왕성'],
    ['./assets/mood-4.png', '붉은 에너지 구체'],
    ['./assets/mood-5.png', '금속 질감'],
    ['./assets/mood-6.png', '붉은 달과 성']
  ];
  const modal = document.getElementById('mood-lightbox');
  const large = modal.querySelector('.mood-large');
  const count = modal.querySelector('.mood-count');
  let current = 0;
  let lastFocus = null;
  function show(index) {
    current = (index + images.length) % images.length;
    large.src = images[current][0];
    large.alt = images[current][1];
    count.textContent = `${current + 1} / ${images.length} · ${images[current][1]}`;
  }
  function open(index) {
    lastFocus = document.activeElement;
    show(index);
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mood-open');
    modal.querySelector('.mood-close').focus();
  }
  function close() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mood-open');
    large.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('.mood-hotspot').forEach(btn => {
    btn.addEventListener('click', () => open(Number(btn.dataset.mood)));
  });
  modal.querySelector('.mood-prev').addEventListener('click', () => show(current - 1));
  modal.querySelector('.mood-next').addEventListener('click', () => show(current + 1));
  modal.querySelector('.mood-close').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Tab') {
      const controls = [modal.querySelector('.mood-close'),modal.querySelector('.mood-prev'),modal.querySelector('.mood-next')];
      const i = controls.indexOf(document.activeElement);
      if (e.shiftKey && i === 0) {e.preventDefault();controls[2].focus();}
      else if (!e.shiftKey && i === 2) {e.preventDefault();controls[0].focus();}
    }
  });
})();
