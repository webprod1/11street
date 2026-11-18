(() => {
  const section = document.createElement('section');
  section.id = 'style-lab'; section.className = 'section style-lab';
  section.innerHTML = `<div class="eyebrow">[ STYLE LAB / BUILD YOUR ROTATION ]</div><div class="section-heading"><h2>COMPLETE<br>THE FIT<span class="pink">✳</span></h2><p>Two ways to wear the archive.<br>Illustrative styling, your own attitude.</p></div><div class="fit-tabs" role="group" aria-label="Choose outfit"><button type="button" aria-pressed="true" data-fit="0">01 / STREET SIGNAL</button><button type="button" aria-pressed="false" data-fit="1">02 / AFTER HOURS</button></div><div id="fit-board"></div><p class="demo-note">Concept outfits and sample prices. Each piece has its own size; check measurements before pairing. No live stock is reserved.</p><a class="text-link" href="#size-guide">CHECK YOUR FIT / SIZE GUIDE ↘</a>`;
  document.querySelector('#collections').after(section);
  const looks = [{name:'STREET SIGNAL',desc:'A graphic tee and washed denim. Keep it loose, keep it personal.',ids:[1,2]},{name:'AFTER HOURS',desc:'Add a dark outer layer to the tee-and-denim rotation.',ids:[3,1,2]}];
  function showLook(index) {
    const look = looks[index];
    section.querySelectorAll('[data-fit]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.fit)===index)));
    const pieces = look.ids.map(id=>inventory.find(p=>p.id===id));
    el('fit-board').innerHTML = `<div class="fit-caption"><span>LOOK / 0${index+1}</span><h3>${look.name}</h3><p>${look.desc}</p><strong>${money(pieces.reduce((sum,p)=>sum+p.price,0))}</strong><small>Sample outfit total · ${pieces.length} pieces</small></div><div class="fit-pieces">${pieces.map(p=>`<button type="button" class="fit-piece" data-open-piece="${p.id}" aria-label="Inspect ${p.name}"><img loading="lazy" src="${photo(p,650)}" alt="Illustrative reference for ${p.name}"><span>${p.name} ↗</span><small>SIZE ${p.size} / ${money(p.price)} sample</small></button>`).join('')}</div>`;
  }
  section.addEventListener('click',e=>{
    const tab=e.target.closest('[data-fit]'); if(tab) showLook(Number(tab.dataset.fit));
    const item=e.target.closest('[data-open-piece]');
    if(item) { const trigger=document.createElement('button'); trigger.dataset.id=item.dataset.openPiece; el('products').onclick({target:trigger}); }
  });
  showLook(0);

  const guide = document.createElement('section'); guide.id='size-guide';guide.className='section size-guide';
  guide.innerHTML=`<div class="eyebrow">[ FIT CHECK / MEASURE BEFORE YOU COLLECT ]</div><div class="section-heading"><h2>KNOW YOUR FIT.</h2><p>Use a piece you already love.<br>Lay it flat. Compare the numbers.</p></div><div class="measure-toolbar"><div role="group" aria-label="Garment type"><button type="button" data-garment="top" aria-pressed="true">TEES & JACKETS</button><button type="button" data-garment="denim" aria-pressed="false">DENIM</button></div><div role="group" aria-label="Measurement unit"><button type="button" data-unit="cm" aria-pressed="true">CM</button><button type="button" data-unit="in" aria-pressed="false">IN</button></div></div><div class="measure-layout"><div id="measure-art"></div><div><h3>HOW TO MEASURE</h3><ol id="measure-steps"></ol><p class="measure-warning">Measure the garment, not your body. Chest and waist here are flat widths. A waist circumference is twice the flat waistband measurement.</p><h3>SAMPLE MEASUREMENT REFERENCE</h3><div id="measure-reference"></div><p class="demo-note">Examples only, not universal size ranges or verified inventory measurements. Vintage sizing varies by brand and era. Actual listing measurements take priority.</p></div></div>`;
  section.after(guide);
  let garment='top',unit='cm';
  function measure(){
    guide.querySelectorAll('[data-garment]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.garment===garment)));
    guide.querySelectorAll('[data-unit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.unit===unit)));
    const top=garment==='top';
    const shape=top?'<path d="M100 80 155 55 195 78 235 55 290 80 330 155 280 180 260 140 260 345 130 345 130 140 110 180 60 155Z"/>':'<path d="M130 65H270L285 345H215L200 165 185 345H115Z"/>';
    const arrows=top?'<path d="M137 180H253M142 174 136 180 142 186M248 174 254 180 248 186M240 90V333M234 96 240 89 246 96M234 327 240 334 246 327"/><text x="150" y="169">A / CHEST</text><text x="268" y="260" transform="rotate(-90 268 260)">B / LENGTH</text>':'<path d="M137 80H263M142 74 136 80 142 86M258 74 264 80 258 86M204 176 222 333"/><text x="148" y="105">A / WAIST</text><text x="240" y="280" transform="rotate(-90 240 280)">B / INSEAM</text>';
    el('measure-art').innerHTML=`<svg viewBox="0 0 400 400" role="img" aria-label="${top?'Top showing chest width from armpit to armpit and length from shoulder to hem':'Jeans showing flat waistband width and inseam from crotch to leg hem'}"><g fill="#eae9e3" stroke="#171717" stroke-width="3">${shape}</g><g fill="none" stroke="#ff68b4" stroke-width="3">${arrows.replace(/<text[\s\S]*$/,'')}</g><g fill="#171717" font-size="11" font-family="monospace">${arrows.match(/<text[\s\S]*/)?.[0]||''}</g></svg><span>FLAT LAY / NO STRETCH</span>`;
    el('measure-steps').innerHTML=(top?['Lay your tee or jacket flat and smooth out wrinkles.','A / Chest: measure straight across, armpit to armpit.','B / Length: measure from the highest shoulder point to the bottom hem.']:['Button the jeans and lay them flat without stretching.','A / Waist: measure straight across the waistband. Double it for circumference.','B / Inseam: measure along the inside leg, from crotch seam to hem.']).map(s=>`<li>${s}</li>`).join('');
    const n=v=>`${unit==='cm'?v:(v/2.54).toFixed(1)} ${unit}`;
    el('measure-reference').innerHTML=top?`<dl><dt>A / Flat chest</dt><dd>${n(56)}</dd><dt>B / Length</dt><dd>${n(72)}</dd></dl>`:`<dl><dt>A / Flat waist</dt><dd>${n(40.5)}</dd><dt>Waist circumference</dt><dd>${n(81)}</dd><dt>B / Inseam</dt><dd>${n(78)}</dd></dl>`;
  }
  guide.addEventListener('click',e=>{const g=e.target.closest('[data-garment]'),u=e.target.closest('[data-unit]');if(g)garment=g.dataset.garment;if(u)unit=u.dataset.unit;if(g||u)measure()});
  measure();
  new MutationObserver(()=>{
    const target=el('detail-body').querySelector('dl');if(!target||el('detail-body').querySelector('.open-size-guide'))return;
    const link=document.createElement('button');link.type='button';link.className='open-size-guide';link.textContent='HOW TO MEASURE ↗';link.onclick=()=>{el('detail').close();guide.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});guide.querySelector('button').focus({preventScroll:true})};target.before(link);
  }).observe(el('detail-body'),{childList:true});
})();
