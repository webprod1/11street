const fs=require('node:fs');
const crypto=require('node:crypto');
const shell=JSON.parse(fs.readFileSync('templates/shell.json','utf8'));
const routes=JSON.parse(fs.readFileSync('templates/routes.json','utf8'));
const asset=file=>file+'?v='+crypto.createHash('sha256').update(fs.readFileSync('dist/'+file)).digest('hex').slice(0,8);
for(const route of routes){
  const nav=routes.map(r=>`<a href="${r.file}"${r.key===route.key?' aria-current="page"':''}>${({home:'HOME',shop:'SHOP',fit:'BUILD YOUR FIT',size:'SIZE GUIDE'})[r.key]}</a>`).join('');
  const styles=[...new Set([...shell.commonCSS.filter(file=>file!=='performance.css'),...route.css,'performance.css'])].map(file=>`<link rel="stylesheet" href="${asset(file)}">`).join('');
  const scripts=[...route.js,'pages.js','frequency.js'].map(file=>`<script defer src="${asset(file)}"></script>`).join('');
  const head=shell.head.replace(/<title>.*?<\/title>/,`<title>11street — ${route.title}</title>`)+styles+scripts+'</head>';
  const intro=route.key==='home'?`<script src="${asset('intro.js')}"></script>`:'';
  fs.writeFileSync('dist/'+route.file,head+`<body data-page="${route.key}">`+intro+shell.topline+shell.header.replace('{{NAV}}',nav)+'<main>'+route.content+'</main>'+shell.footer+shell.dialogs+'</body></html>\n');
}
console.log('Built four standalone pages with content-based asset versions.');
