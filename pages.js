(() => {
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#primary-navigation');
  menu.onclick=()=>{const expanded=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(expanded))};
  nav.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus()}});
  document.querySelectorAll('a[href="#size-guide"]').forEach(a=>a.href='size-guide.html');
  if(document.body.dataset.page==='shop'){
    document.querySelector('#drop h2').textContent='THE ARCHIVE ✳';
    const wishlist=()=>{if(location.hash==='#wishlist'){
      const button=document.querySelector('.wishlist-toolbar>button');
      if(button?.getAttribute('aria-pressed')!=='true')button?.click();
      document.querySelector('.wishlist-toolbar')?.scrollIntoView();
    }};
    wishlist();addEventListener('hashchange',wishlist);
  }
})();
