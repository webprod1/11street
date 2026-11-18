const fs=require('node:fs');
let source=fs.readFileSync('dist/index.html','utf8');
source=source.replace('</head>','<link rel="stylesheet" href="pages.css"></head>').replace('</body>','<script src="pages.js"></script></body>').replace('src="fit.js"','src="fit.js?v=pages1"');
for(const [file,key,title] of [['index.html','home','Rare finds. Real street.'],['shop.html','shop','Shop the archive'],['build-your-fit.html','fit','Build your fit'],['size-guide.html','size','Size guide']]){
  let html=source.replace('<body>','<body data-page="'+key+'">').replace(/<title>.*?<\/title>/,'<title>11street — '+title+'</title>');
  if(key!=='home')html=html.replace('<script src="intro.js?v=1"></script>','');
  fs.writeFileSync('dist/'+file,html);
}
