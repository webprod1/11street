(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const intro = document.createElement('div');
  intro.className = 'street-intro';
  intro.setAttribute('aria-label', '11street opening intro');
  intro.innerHTML = '<div class="intro-top"><span>11STREET® / FREQUENCY 001</span><span>INDEPENDENT STYLE. NO REPEATS.</span></div><div class="intro-center"><div class="intro-cross" aria-hidden="true">✳</div><div class="intro-mark" aria-hidden="true">11</div><div class="intro-word">11street<span>®</span></div><p>RARE FINDS. REAL STREET.</p><div class="intro-track" aria-hidden="true"><span></span></div><div class="intro-status"><span>TUNING INTO YOUR FREQUENCY</span><span aria-hidden="true" id="intro-count">00</span></div></div><div class="intro-bottom"><span>FROM THE UNDERGROUND / INTO YOUR ROTATION</span><button type="button">SKIP INTRO ↗</button></div>';
  document.body.prepend(intro);
  const started = performance.now();
  let frame;
  let closed = false;
  const finish = () => {
    if (closed) return;
    closed = true;
    cancelAnimationFrame(frame);
    const wasFocused = intro.contains(document.activeElement);
    intro.classList.add('intro-out');
    if (wasFocused) document.querySelector('header a')?.focus({preventScroll:true});
    window.setTimeout(() => intro.remove(), 550);
    document.removeEventListener('keydown', escape);
  };
  const escape = e => { if(e.key === 'Escape') finish(); };
  document.addEventListener('keydown', escape);
  intro.querySelector('button').addEventListener('click', finish);
  const tick = now => {
    if (closed) return;
    const progress = Math.min(100, Math.floor((now-started)/22));
    intro.querySelector('#intro-count').textContent = String(progress).padStart(2,'0');
    if (progress === 100) finish();
    else frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  window.setTimeout(finish, 2800);
})();
