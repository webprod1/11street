(() => {
  let saved = new Set();
  try { const data = JSON.parse(localStorage.getItem('11street-wishlist') || '[]'); if (Array.isArray(data)) saved = new Set(data.filter(id => inventory.some(p => p.id === id))); } catch {}
  let onlySaved = false;
  const toolbar = document.createElement('div');
  toolbar.className = 'wishlist-toolbar';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  const note = document.createElement('span');
  note.textContent = 'Your finds, saved on this browser.';
  const status = document.createElement('span');
  status.className = 'collector-status';
  status.setAttribute('role','status');
  toolbar.append(toggle, note, status);
  el('products').before(toolbar);
  const empty = document.createElement('p');
  empty.textContent = 'No saved pieces match these filters. Tap a heart to start your collection.';
  empty.hidden = true;
  el('products').after(empty);
  function refresh() {
    toggle.textContent = `${onlySaved ? 'SHOW ALL PIECES' : '♡ MY WISHLIST'} [${saved.size}]`;
    toggle.setAttribute('aria-pressed', String(onlySaved));
    let visible = 0;
    el('products').querySelectorAll('.collector-card').forEach(card => {
      const id = Number(card.querySelector('[data-id]').dataset.id);
      const heart = card.querySelector('.save-piece');
      heart.textContent = saved.has(id) ? '♥' : '♡';
      heart.setAttribute('aria-pressed', String(saved.has(id)));
      heart.setAttribute('aria-label', `${saved.has(id) ? 'Remove' : 'Save'} ${inventory.find(p=>p.id===id).name} ${saved.has(id) ? 'from' : 'to'} wishlist`);
      card.hidden = onlySaved && !saved.has(id);
      if (!card.hidden) visible++;
    });
    empty.hidden = !onlySaved || visible > 0;
    if (onlySaved) el('empty').hidden = true;
  }
  function enhanceCards() {
    el('products').querySelectorAll(':scope > .product').forEach(product => {
      const card = document.createElement('div');
      card.className = 'collector-card';
      const heart = document.createElement('button');
      heart.type = 'button'; heart.className = 'save-piece';
      product.before(card); card.append(product, heart);
      heart.onclick = () => {
        const id = Number(product.dataset.id);
        saved.has(id) ? saved.delete(id) : saved.add(id);
        try { localStorage.setItem('11street-wishlist', JSON.stringify([...saved])); status.textContent = saved.has(id) ? 'Saved to your wishlist.' : 'Removed from wishlist.'; }
        catch { status.textContent = 'Saved for this visit. Browser storage is unavailable.'; }
        refresh();
      };
    });
    refresh();
  }
  toggle.onclick = () => { onlySaved = !onlySaved; refresh(); };
  new MutationObserver(enhanceCards).observe(el('products'), {childList:true});
  enhanceCards();

  const detail = el('detail-body');
  new MutationObserver(() => {
    const image = detail.querySelector('.detail-grid img');
    if (!image || image.closest('.zoom-photo')) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'zoom-photo';
    button.setAttribute('aria-label','Enlarge product photo');
    button.setAttribute('aria-pressed','false');
    image.before(button); button.append(image);
    const hint = document.createElement('span');
    hint.className = 'zoom-hint'; hint.textContent = '⊕ TAP TO INSPECT'; button.append(hint);
    const viewport = document.createElement('div');
    viewport.className = 'zoom-viewport'; button.before(viewport); viewport.append(button);
    button.onclick = () => {
      const zoomed = viewport.classList.toggle('is-zoomed');
      button.setAttribute('aria-pressed', String(zoomed));
      button.setAttribute('aria-label',zoomed ? 'Return to full product photo' : 'Enlarge product photo');
      hint.textContent = zoomed ? '⊖ TAP TO RESET · SCROLL TO EXPLORE' : '⊕ TAP TO INSPECT';
      if (zoomed) image.src = image.src.replace(/w=\d+/, 'w=2000');
      else { viewport.scrollTop = 0; viewport.scrollLeft = 0; }
    };
  }).observe(detail, {childList:true});
})();
