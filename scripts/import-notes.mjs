import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const file=process.argv[2];if(!file){console.error('用法：pnpm import-notes path/to/dinner-notes.json');process.exit(1);}
const data=JSON.parse(await readFile(file,'utf8'));if(data.format!=='dinner-notes-v1'||!Array.isArray(data.notes))throw Error('不是可识别的 dinner 笔记备份。');
const root=path.resolve('src/content/posts');await mkdir(root,{recursive:true});let added=0,skipped=0;
for(const note of data.notes){
 if(typeof note.title!=='string'||typeof note.body!=='string')throw Error('备份中存在不完整的笔记。');
 const key=String(note.id??'').replace(/[^a-zA-Z0-9-]/g,'');if(!key)throw Error('笔记缺少有效 ID。');
 const fields={title:note.title,published:(note.createdAt??new Date().toISOString()).slice(0,10),updated:(note.updatedAt??new Date().toISOString()).slice(0,10),category:note.topic||'未分类',tags:note.tags||[],status:note.status||'reading',draft:true,isSample:false,pinned:!!note.pinned,paperTitle:note.paperTitle||'',paperUrl:note.paperUrl||'',codeUrl:note.codeUrl||'',authors:note.authors||'',venue:note.venue||'',description:note.summary||''};
 let body=note.body;const questions=note.questions??[];
 if(questions.length)body+='\n\n## 复习问题\n\n'+questions.map(q=>`<details>\n<summary>${String(q.q).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}</summary>\n\n${q.a}\n\n</details>`).join('\n\n');
 if(body.includes('/api/images/'))body+='\n\n> 导入提醒：这篇笔记包含原私有站点的图片链接，请先下载图片到本篇笔记旁并修改为相对路径，再公开发布。\n';
 const text='---\n'+Object.entries(fields).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n')+'\n---\n\n'+body+'\n';
 try{await writeFile(path.join(root,`imported-${key}.md`),text,{encoding:'utf8',flag:'wx'});added++;}catch(e){if(e.code==='EEXIST')skipped++;else throw e;}
}
console.log(`已导入 ${added} 篇草稿，跳过 ${skipped} 篇同名记录。检查内容和图片后，将需要公开的笔记改为 draft: false。`);
