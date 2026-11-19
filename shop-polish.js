(() => {
  const drop=el('drop');
  if(document.body.dataset.page==='shop'){
    drop.querySelector('.eyebrow').innerHTML='<span>11STREET / THE COLLECTOR EDIT</span><span>FIND YOUR NEXT ROTATION</span>';
    drop.querySelector('.section-heading p').innerHTML='Browse the edit. Check the details.<br>Find the piece that feels like you.';
    const reset=document.createElement('button');reset.type='button';reset.className='reset-filters';reset.textContent='RESET FILTERS ↺';
    drop.querySelector('.selects').append(reset);
    reset.onclick=()=>{
      ['size','price','availability'].forEach(id=>el(id).value='');
      if(el('archive-query'))el('archive-query').value='';
      const wishlist=document.querySelector('.wishlist-toolbar>button');
      if(wishlist?.getAttribute('aria-pressed')==='true')wishlist.click();
      document.querySelector('#categories [data-category="All"]').click();
    };
    el('empty').textContent='No pieces match this search. Clear your search or reset filters to explore the full edit.';
  }
  function polishCards(){
    drop.querySelectorAll('.product').forEach(card=>{
      if(card.querySelector('.piece-specs'))return;
      const p=inventory.find(p=>p.id===Number(card.dataset.id));if(!p)return;
      const specs=document.createElement('div');specs.className='piece-specs';
      specs.innerHTML=`<span>SIZE <strong>${p.size}</strong></span><span class="piece-state ${p.status==='archived'?'is-archive':''}">${p.status==='archived'?'ARCHIVE ONLY':'PREVIEW ONLY'}</span>`;
      const condition=document.createElement('p');condition.className='piece-condition';condition.textContent=p.status==='archived'?'Reference piece · unavailable to order':'Condition inspection pending';
      const cta=document.createElement('span');cta.className='piece-cta';cta.innerHTML='INSPECT PIECE <span aria-hidden="true">↗</span>';
      const name=card.querySelector('h3');name.after(specs);card.append(condition,cta);
      card.querySelector('.product-meta').innerHTML=`<span>${p.label}</span>`;
      const badge=card.querySelector('.tag');if(badge)badge.textContent=p.status==='archived'?'ARCHIVE REFERENCE':'CONCEPT EDIT';
    });
  }
  new MutationObserver(polishCards).observe(el('products'),{childList:true});polishCards();
})();
