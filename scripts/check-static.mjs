// Validate real static outputs, draft exclusion and local navigation/assets.
import {readFile,readdir,stat,access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
async function walk(dir){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files=await walk(root);const htmlFiles=files.filter(f=>f.endsWith('.html'));
assert(htmlFiles.length>=6,'No complete static site');
for(const required of ['index.html','to-read/index.html','categories/index.html','search/index.html','admin/index.html','404.html','pagefind/pagefind.js'])await access(path.join(root,required));
let checked=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');
 assert(!html.includes('/api/notes')&&!html.includes('signin-with-chatgpt'),'Backend-only URL in static page');
 for(const m of html.matchAll(/\b(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)){
   const raw=m[1].replaceAll('&amp;','&');
   if(raw.startsWith('https://app.pagescms.org/')){
     const link=new URL(raw);
     const prefix='/genshindawang/genshindawang.github.io/main/collection/papers';
     assert(link.pathname===prefix||link.pathname===prefix+'/new'||link.pathname.startsWith(prefix+'/edit/'),'CMS link targets the wrong repository or collection');
     if(link.pathname.startsWith(prefix+'/edit/')){
       const source=decodeURIComponent(link.pathname.slice((prefix+'/edit/').length));
       assert(source.startsWith('src/content/posts/')&&!source.includes('..'),'CMS edit link leaves notes directory');
       await access(path.resolve(source));
     }
   }
   if(raw.startsWith('https://github.com/genshindawang/genshindawang.github.io/edit/main/')){
     const source=decodeURIComponent(raw.split('/edit/main/')[1]);
     assert(source.startsWith('src/'),'Editing link leaves source directory');
     await access(path.resolve(source));
   }
   if(/^(?:[a-z]+:|\/\/)/i.test(raw))continue;
   let target=path.resolve(raw.startsWith('/')?root:path.dirname(file),'.'+(raw.startsWith('/')?raw:'/'+raw));
   // Relative URLs are resolved against the page's directory.
   if(!raw.startsWith('/'))target=path.resolve(path.dirname(file),raw);
   assert(target===root||target.startsWith(root+path.sep),'URL leaves the static output');
   try{target=decodeURIComponent(target);let info=await stat(target);if(info.isDirectory())await access(path.join(target,'index.html'));}catch{throw Error(`Broken local URL ${raw} in ${path.relative(root,file)}`);}
   checked++;
 }
 assert(!html.includes('QA-DRAFT-MUST-NOT-BE-PUBLISHED'),'Draft content leaked into output');
}
console.log(JSON.stringify({static_pages:htmlFiles.length,local_links_and_assets_checked:checked,backend_dependencies:false},null,2));
