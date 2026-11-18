(() => {
  const page=document.body.dataset.page;
  const pages={home:'index.html',shop:'shop.html',fit:'build-your-fit.html',size:'size-guide.html'};
  const nav=document.querySelector('header nav');
  nav.id='primary-navigation';
  nav.innerHTML=[['home','HOME'],['shop','SHOP'],['fit','BUILD YOUR FIT'],['size','SIZE GUIDE']].map(([key,title])=>`<a href="${pages[key]}" ${page===key?'aria-current="page"':''}>${title}</a>`).join('');
  document.querySelectorAll('a.logo').forEach(a=>a.href='index.html');
  const actions=document.createElement('div');actions.className='header-actions';
  const bagButton=el('bag');bagButton.before(actions);
  actions.innerHTML='<a class="header-wishlist" href="shop.html#wishlist" aria-label="Open wishlist">♡ SAVED</a><button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false">MENU ☰</button>';
  actions.append(bagButton);
  const menu=actions.querySelector('.menu-toggle');
  menu.onclick=()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open))};
  document.querySelectorAll('a[href="#drop"],a[href="#collections"]').forEach(a=>a.href='shop.html');
  document.querySelectorAll('a[href="#style-lab"]').forEach(a=>a.href='build-your-fit.html');
  document.querySelectorAll('a[href="#size-guide"]').forEach(a=>a.href='size-guide.html');
  document.querySelectorAll('a[href="#story"]').forEach(a=>a.href='index.html#story');
  if(page==='home'){
    const link=document.createElement('a');link.className='button blue page-shop-link';link.href='shop.html';link.textContent='VIEW ALL PIECES ↗';el('drop').append(link);
  }
  if(page==='shop'){
    el('drop').querySelector('h2').textContent='THE ARCHIVE ✳';
    const openWishlist=()=>{if(location.hash==='#wishlist'){
      const button=document.querySelector('.wishlist-toolbar>button');
      if(button?.getAttribute('aria-pressed')!=='true')button?.click();
      document.querySelector('.wishlist-toolbar')?.scrollIntoView();
    }};
    openWishlist();addEventListener('hashchange',openWishlist);
  }
  if(page!=='home')document.querySelector('.street-intro')?.remove();
})();
