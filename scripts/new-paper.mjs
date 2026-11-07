import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2);const queue=args.includes('--queue');const slug=args.find(a=>!a.startsWith('--'));
if(!slug||!/^[a-z0-9][a-z0-9-]*$/.test(slug)){console.error('用法：pnpm new-post paper-name 或 pnpm new-queue paper-name（小写字母、数字和连字符）');process.exit(1);}
const root=path.resolve('src/content/posts');const file=path.resolve(root,slug+'.md');
if(!file.startsWith(root+path.sep))throw Error('文件必须位于论文目录内');
await mkdir(root,{recursive:true});
const content=`---\ntitle: "${slug}"\npublished: ${new Date().toISOString().slice(0,10)}\ncategory: "未分类"\ntags: []\nstatus: "${queue?'queue':'reading'}"\ndraft: true\nisSample: false\npaperTitle: ""\npaperUrl: ""\ncodeUrl: ""\nauthors: ""\nvenue: ""\ndescription: ""\n---\n\n## 这篇论文想解决什么问题？\n\n## 方法：输入怎样变成输出？\n\n## 关键公式与推导\n\n$$\n\\mathcal{L} = \\mathbb{E}[\\ell(f_\\theta(x),y)]\n$$\n\n## 实验支持什么结论？\n\n## 我的理解与疑问\n\n## 复习问题\n\n<details>\n<summary>这里写一个问题</summary>\n\n这里写参考答案。\n\n</details>\n`;
await writeFile(file,content,{encoding:'utf8',flag:'wx'}).catch(error=>{throw Error(error.code==='EEXIST'?'同名笔记已经存在，不会覆盖。':error.message)});
console.log(file);
