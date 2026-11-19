(() => {
  const search = document.createElement('div'); search.className='archive-search';
  search.innerHTML='<label for="archive-query">SEARCH THE ARCHIVE</label><div><input type="search" id="archive-query" placeholder="Try denim, static, outerwear…" autocomplete="off"><button type="button" id="clear-query">CLEAR ↗</button></div><p>Search names, categories and collection labels. Your selected filters still apply.</p><span id="search-results" role="status" aria-live="polite"></span>';
  el('drop').querySelector('.filters').before(search);
  const input=el('archive-query');
  input.addEventListener('input',render);
  el('clear-query').onclick=()=>{input.value='';render();input.focus()};
  let history=[];
  try {const data=JSON.parse(localStorage.getItem('11street-recent')||'[]');if(Array.isArray(data))history=[...new Set(data.filter(id=>inventory.some(p=>p.id===id)))].slice(0,8)}catch{}
  const recent=document.createElement('section');recent.className='section recent-section';recent.id='recently-viewed';
  recent.innerHTML='<div class="eyebrow">[ YOUR TRAIL / BACK TO THE GOOD FINDS ]</div><div class="recent-heading"><h2>RECENTLY VIEWED</h2><button type="button" id="clear-recent">CLEAR HISTORY ×</button></div><p class="recent-note">Your last viewed pieces, saved on this browser.</p><div class="recent-grid" id="recent-pieces"></div><p role="status" id="recent-status"></p>';
  el('drop').after(recent);
  function drawRecent(){
    el('clear-recent').disabled=!history.length;
    el('recent-pieces').innerHTML=history.length?history.map(id=>{const p=inventory.find(p=>p.id===id);return `<button type="button" class="recent-piece" data-recent-id="${id}" aria-label="View ${p.name}"><img loading="lazy" src="${photo(p,480)}" alt="Illustrative reference for ${p.name}"><span>${p.name} ↗</span><small>SIZE ${p.size} / ${money(p.price)} sample</small></button>`}).join(''):'<p>Open a product to start your trail. Your recent finds will appear here.</p>';
  }
  document.addEventListener('product:opened',event=>{const id=event.detail.id;history=[id,...history.filter(x=>x!==id)].slice(0,8);drawRecent();});
  el('recent-pieces').onclick=event=>{const piece=event.target.closest('[data-recent-id]');if(!piece)return;openProduct(Number(piece.dataset.recentId))};
  el('clear-recent').onclick=()=>{history=[];try{localStorage.removeItem('11street-recent')}catch{}drawRecent();el('recent-status').textContent='Viewing history cleared.'};
  drawRecent();render();
})();
