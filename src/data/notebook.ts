export const notebook = {
  description: "关于自动驾驶，也关于每一次认真想明白。",
  repository: "https://github.com/genshindawang/genshindawang.github.io",
  branch: "main",
};
export function editUrl(file: string) {
  return `${notebook.repository}/edit/${notebook.branch}/${file.split("/").map(encodeURIComponent).join("/")}`;
}
export function newPaperUrl(queue = false) {
  const content = `---\ntitle: "新论文笔记"\npublished: ${new Date().toISOString().slice(0,10)}\ncategory: "未分类"\ntags: []\nstatus: "${queue ? "queue" : "reading"}"\ndraft: true\npaperTitle: ""\npaperUrl: ""\ncodeUrl: ""\ndescription: ""\n---\n\n## 这篇论文想解决什么问题？\n\n## 方法：输入怎样变成输出？\n\n## 关键公式与推导\n\n## 实验支持什么结论？\n\n## 我的理解与疑问\n`;
  return `${notebook.repository}/new/${notebook.branch}?filename=src/content/posts/my-paper.md&value=${encodeURIComponent(content)}`;
}
