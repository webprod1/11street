(() => {
  const lab=el('style-lab');
  lab.querySelector('h2').innerHTML='BUILD<br>YOUR FIT<span class="pink">✳</span>';
  lab.querySelector('.section-heading p').innerHTML='Your pieces. Your combination.<br>Pick, shuffle, save your rotation.';
  const controls=document.createElement('div');controls.className='builder-controls';
  const slots=[['top','TEE',['Tees','Rare finds']],['denim','DENIM',['Denim']],['layer','JACKET',['Outerwear']]];
  controls.innerHTML=slots.map(([key,label,categories])=>`<label>${label}<select data-slot="${key}" aria-label="Choose ${label.toLowerCase()}"><option value="">No ${label.toLowerCase()}</option>${inventory.filter(p=>categories.includes(p.category)).map(p=>`<option value="${p.id}">${p.name}${p.status==='archived'?' / archive reference':''}</option>`).join('')}</select></label>`).join('')+'<button type="button" id="shuffle-fit">SHUFFLE FIT ↻</button><button type="button" id="save-fit">SAVE OUTFIT ♡</button>';
  lab.querySelector('.fit-tabs').after(controls);
  const notice=document.createElement('p');notice.setAttribute('role','status');notice.className='builder-status';
  controls.after(notice);
  const savedPanel=document.createElement('div');savedPanel.className='saved-fits';lab.append(savedPanel);
  const select=key=>controls.querySelector(`[data-slot="${key}"]`);
  let fits=[];
  try {const data=JSON.parse(localStorage.getItem('11street-outfits')||'[]');if(Array.isArray(data)) fits=data.filter(f=>Array.isArray(f)&&f.length&&f.every(id=>inventory.some(p=>p.id===id))).slice(0,20)}catch{}
  const chosen=()=>slots.map(([key])=>Number(select(key).value)).filter(Boolean);
  function preview(){
    const pieces=chosen().map(id=>inventory.find(p=>p.id===id));
    lab.querySelectorAll('[data-fit]').forEach(b=>b.setAttribute('aria-pressed','false'));
    el('fit-board').innerHTML=`<div class="fit-caption"><span>YOUR CUSTOM ROTATION</span><h3>MAKE IT<br>YOUR OWN.</h3><p>Tap any piece for measurements, condition and photo zoom.</p><strong>${money(pieces.reduce((sum,p)=>sum+p.price,0))}</strong><small>Sample total · ${pieces.length} pieces</small><small>Reference photos / not a virtual try-on</small></div><div class="fit-pieces builder-collage">${pieces.length?pieces.map(p=>`<button type="button" class="fit-piece" data-open-piece="${p.id}" aria-label="Inspect ${p.name}"><img loading="lazy" src="${photo(p,650)}" alt="Illustrative reference for ${p.name}"><span>${p.name} ↗</span><small>SIZE ${p.size} / ${money(p.price)} sample${p.status==='archived'?' / ARCHIVED':''}</small></button>`).join(''):'<p>Choose a piece above to start your fit.</p>'}</div>`;
    el('save-fit').disabled=!pieces.length;
  }
  function setPieces(ids){slots.forEach(([key])=>{const s=select(key);s.value=String(ids.find(id=>[...s.options].some(o=>o.value===String(id)))||'')});preview()}
  function renderSaved(){
    savedPanel.innerHTML='<h3>MY OUTFIT WISHLIST ♡</h3><p>Saved on this browser. Sample outfits do not reserve stock.</p>'+(!fits.length?'<p>No saved outfits yet.</p>':fits.map((ids,i)=>`<div class="saved-fit"><span>${ids.map(id=>inventory.find(p=>p.id===id).name).join(' + ')}</span><button type="button" data-load-fit="${i}">LOAD ↗</button><button type="button" data-delete-fit="${i}" aria-label="Remove saved outfit ${i+1}">REMOVE</button></div>`).join(''));
  }
  controls.addEventListener('change',()=>{notice.textContent='';preview()});
  lab.querySelector('.fit-tabs').addEventListener('click',event=>{const tab=event.target.closest('[data-fit]');if(tab)setPieces(Number(tab.dataset.fit)===0?[1,2]:[3,1,2])});
  el('shuffle-fit').onclick=()=>{
    const before=chosen().join(',');let next;
    for(let attempt=0;attempt<10;attempt++) {next=slots.map(([key])=>{const options=[...select(key).options].map(o=>Number(o.value));const eligible=key==='top'?options.filter(Boolean):options;return eligible[Math.floor(Math.random()*eligible.length)]}).filter(Boolean);if(next.join(',')!==before)break}
    if(next.join(',')===before)next=before==='1,2'?[1,2,3]:[1,2];
    setPieces(next);notice.textContent='New combination. Limited sample pieces; more variety comes with actual inventory.';
  };
  el('save-fit').onclick=()=>{
    const ids=chosen();if(!ids.length)return;
    if(fits.some(f=>[...f].sort().join(',')===[...ids].sort().join(','))){notice.textContent='This outfit is already in your wishlist.';return}
    if(fits.length>=20){notice.textContent='Your 20 outfit slots are full. Remove one to save another.';return}
    fits.push(ids);persist();renderSaved();
  };
  function persist(){try{localStorage.setItem('11street-outfits',JSON.stringify(fits));notice.textContent='Outfit wishlist updated.'}catch{notice.textContent='Saved for this visit. Browser storage is unavailable.'}}
  savedPanel.onclick=event=>{const load=event.target.closest('[data-load-fit]'),remove=event.target.closest('[data-delete-fit]');if(load){setPieces(fits[Number(load.dataset.loadFit)]);notice.textContent='Saved outfit loaded.'}if(remove){fits.splice(Number(remove.dataset.deleteFit),1);persist();renderSaved()}};
  setPieces([1,2]);renderSaved();
})();
