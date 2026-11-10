// GitHub Pages에서 별도 서버 없이 동작합니다.
const backTop = document.querySelector('.back-top');
function updateBackTop() { backTop.classList.toggle('visible', window.scrollY > Math.max(250, window.innerHeight * .55)); }
window.addEventListener('scroll', updateBackTop, { passive: true });
updateBackTop();
