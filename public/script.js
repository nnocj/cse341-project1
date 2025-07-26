// script.js

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('show');
    }, index * 300); // I'M staggering animations by 300ms
  });
});
