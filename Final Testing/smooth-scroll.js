
(() => {
  let scrollCurrent = window.scrollY;
  let scrollTarget = window.scrollY;

  const ease = 0.1;
  const scrollMultiplier = 40;
  const maxScrollDelta = 120;
  let draggingScrollbar = false;

  // Smooth wheel scrolling
  window.addEventListener('wheel', e => {
    if (draggingScrollbar) return;

    const delta = Math.max(-maxScrollDelta, Math.min(maxScrollDelta, e.deltaY * scrollMultiplier));
    scrollTarget = Math.max(0, Math.min(scrollTarget + delta, document.body.scrollHeight - window.innerHeight));
    e.preventDefault();
  }, { passive: false });

  // Smooth anchor link scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) {
        scrollTarget = Math.max(0, Math.min(section.offsetTop, document.body.scrollHeight - window.innerHeight));
      }
    });
  });

  // Detect scrollbar dragging
  window.addEventListener('mousedown', e => {
    if (e.clientX > window.innerWidth - 20) draggingScrollbar = true;
  });
  window.addEventListener('mouseup', () => {
    draggingScrollbar = false;
    scrollCurrent = scrollTarget = window.scrollY;
  });
  window.addEventListener('scroll', () => {
    if (draggingScrollbar) scrollCurrent = scrollTarget = window.scrollY;
  });

  // Animation loop
  const smoothScroll = () => {
    if (!draggingScrollbar) {
      scrollCurrent += (scrollTarget - scrollCurrent) * ease;
      window.scrollTo(0, scrollCurrent);
    }
    requestAnimationFrame(smoothScroll);
  };

  smoothScroll();
})();
