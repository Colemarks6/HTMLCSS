
(() => {
  let current = window.scrollY;
  let target = window.scrollY;

  const wheelEase = 0.1;        // easing for wheel
  const wheelMultiplier = 40;   // scale deltaY
  const maxDelta = 120;         // max delta
  let isDraggingScrollbar = false;

  // MWheel
  window.addEventListener('wheel', e => {
    if (isDraggingScrollbar) return;

    const delta = Math.max(-maxDelta, Math.min(maxDelta, e.deltaY * wheelMultiplier));
    target = Math.max(0, Math.min(target + delta, document.body.scrollHeight - window.innerHeight));
    e.preventDefault();
  }, { passive: false });

  // sidebar
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = document.getElementById(link.getAttribute('href').slice(1));
      if (section) target = Math.max(0, Math.min(section.offsetTop, document.body.scrollHeight - window.innerHeight));
    });
  });

  // Scrollbar
  window.addEventListener('mousedown', e => { if (e.clientX > window.innerWidth - 20) isDraggingScrollbar = true; });
  window.addEventListener('mouseup', () => { isDraggingScrollbar = false; current = target = window.scrollY; });
  window.addEventListener('scroll', () => { if (isDraggingScrollbar) current = target = window.scrollY; });

  // Animation
  const animate = () => {
    if (!isDraggingScrollbar) {
      current += (target - current) * wheelEase;
      window.scrollTo(0, current);
    }
    requestAnimationFrame(animate);
  };

  animate();
})();
