(() => {
  const hero = document.querySelector('.hero');
  const collage = hero?.querySelector('.collage');
  if (!collage) return;
  const canHover = matchMedia('(any-hover:hover) and (any-pointer:fine) and (prefers-reduced-motion:no-preference)');
  const clamp = n => Math.min(1, Math.max(0, n));
  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    hero.classList.remove('is-tracking');
    collage.classList.remove('is-tracking');
    collage.style.removeProperty('--drift-x');
    collage.style.removeProperty('--drift-y');
  };
  hero.addEventListener('pointermove', event => {
    if (!canHover.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const position = element => {
        const rect = element.getBoundingClientRect();
        return [(event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height];
      };
      const [hx, hy] = position(hero);
      const [x, y] = position(collage);
      hero.style.setProperty('--hero-x', `${clamp(hx) * 100}%`);
      hero.style.setProperty('--hero-y', `${clamp(hy) * 100}%`);
      hero.classList.add('is-tracking');
      const overCollage = x === clamp(x) && y === clamp(y);
      collage.classList.toggle('is-tracking', overCollage);
      if (overCollage) {
        collage.style.setProperty('--glow-x', `${x * 100}%`);
        collage.style.setProperty('--glow-y', `${y * 100}%`);
      }
      collage.style.setProperty('--drift-x', `${overCollage ? (x - .5) * 18 : 0}px`);
      collage.style.setProperty('--drift-y', `${overCollage ? (y - .5) * 12 : 0}px`);
    });
  }, {passive:true});
  hero.addEventListener('pointerleave', reset);
  hero.addEventListener('pointercancel', reset);
  canHover.addEventListener('change', reset);
})();
