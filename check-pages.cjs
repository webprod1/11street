const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync('dist/'+file,'utf8'),{filename:file});
const routes=JSON.parse(fs.readFileSync('templates/routes.json','utf8'));
for(const route of routes){
 const html=fs.readFileSync('dist/'+route.file,'utf8');
 const scripts=[...html.matchAll(/<script[^>]+src="([^"?]+)/g)].map(m=>m[1]);
 for(const m of html.matchAll(/(?:src|href)="([^"?]+\.(?:js|css))(?:\?[^"]*)?"/g))assert.ok(fs.existsSync('dist/'+m[1]),m[1]);
 for(const target of routes)assert.ok(html.includes('href="'+target.file+'"'),route.file+' navigation');
 if(route.key!=='home')assert.ok(!html.includes('class="hero"')&&!scripts.includes('intro.js')&&!scripts.includes('hover.js'),route.file+' no hidden hero');
 if(route.key!=='shop')assert.ok(!scripts.includes('discovery.js'),route.file+' no search/history script');
 if(route.key!=='fit')assert.ok(!scripts.includes('builder.js')&&!scripts.includes('fit-page.js'),route.file+' no hidden builder');
 if(route.key!=='size')assert.ok(!scripts.includes('size-page.js'),route.file+' no hidden guide');
 assert.ok(!html.includes('id="collections"')&&!html.includes('class="spotlight')&&!html.includes('class="newsletter'),route.file+' no removed sections');
 console.log(route.file+': '+Buffer.byteLength(html)+' bytes; '+scripts.length+' scripts; route assets and links verified');
}
