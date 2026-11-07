export const notebook = {
  description: "关于自动驾驶，也关于每一次认真想明白。",
  repository: "https://github.com/genshindawang/genshindawang.github.io",
  branch: "main",
  writingBackend: "https://app.pagescms.org/genshindawang/genshindawang.github.io/main",
};
export function editUrl(file: string) {
  return `${notebook.repository}/edit/${notebook.branch}/${file.split("/").map(encodeURIComponent).join("/")}`;
}
export function writerUrl() {
  return `${notebook.writingBackend}/collection/papers`;
}
export function newPaperUrl() {
  return `${writerUrl()}/new`;
}
export function paperEditorUrl(file: string) {
  return `${writerUrl()}/edit/${encodeURIComponent(file)}`;
}
