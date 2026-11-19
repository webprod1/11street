(() => {
  const section = document.createElement('section');
  section.id = 'style-lab'; section.className = 'section style-lab';
  section.innerHTML = `<div class="eyebrow">[ STYLE LAB / BUILD YOUR ROTATION ]</div><div class="section-heading"><h2>COMPLETE<br>THE FIT<span class="pink">✳</span></h2><p>Two ways to wear the archive.<br>Illustrative styling, your own attitude.</p></div><div class="fit-tabs" role="group" aria-label="Choose outfit"><button type="button" aria-pressed="true" data-fit="0">01 / STREET SIGNAL</button><button type="button" aria-pressed="false" data-fit="1">02 / AFTER HOURS</button></div><div id="fit-board"></div><p class="demo-note">Concept outfits and sample prices. Each piece has its own size; check measurements before pairing. No live stock is reserved.</p><a class="text-link" href="#size-guide">CHECK YOUR FIT / SIZE GUIDE ↘</a>`;
  document.querySelector('main').append(section);
  section.addEventListener('click',e=>{

    const item=e.target.closest('[data-open-piece]');
    if(item) openProduct(Number(item.dataset.openPiece));
  });


})();
