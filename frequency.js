(() => {
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const meter = document.createElement('div');
  meter.className = 'frequency-meter';
  meter.setAttribute('aria-hidden', 'true');
  document.body.append(meter);
  let scrollFrame = 0;
  function updateMeter() {
    scrollFrame = 0;
    const range = document.documentElement.scrollHeight - innerHeight;
    meter.style.setProperty('--page-progress', range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0);
  }
  const queueMeter = () => { if (!scrollFrame && motion.matches) scrollFrame = requestAnimationFrame(updateMeter); };
  addEventListener('scroll', queueMeter, {passive:true});
  addEventListener('resize', queueMeter);
  motion.addEventListener('change', queueMeter);
  if ('ResizeObserver' in window) new ResizeObserver(queueMeter).observe(document.body);
  queueMeter();

  if ('IntersectionObserver' in window) {
    const arrivals = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        arrivals.unobserve(entry.target);
        if (motion.matches) entry.target.classList.add('frequency-arrive');
      }
    }, {threshold:.25});
    document.querySelectorAll('.section-heading, .collections h2, .spot-text, .story > p, .newsletter h2').forEach(el => arrivals.observe(el));
  }

  let foilFrame = 0;
  document.addEventListener('pointermove', event => {
    if (!motion.matches || event.pointerType === 'touch') return;
    const foil = event.target.closest('.product-image, .spot-image');
    if (!foil) return;
    cancelAnimationFrame(foilFrame);
    foilFrame = requestAnimationFrame(() => {
      const box = foil.getBoundingClientRect();
      foil.style.setProperty('--foil-x', `${100 * (event.clientX - box.left) / box.width}%`);
      foil.style.setProperty('--foil-y', `${100 * (event.clientY - box.top) / box.height}%`);
    });
  }, {passive:true});
})();
