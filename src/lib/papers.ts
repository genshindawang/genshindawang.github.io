import { getCollection, type CollectionEntry } from "astro:content";
import { getPostUrlBySlug, url } from "../utils/url-utils";
export type Paper = CollectionEntry<"posts">;
export const STATUS = { queue: "待读", reading: "正在读", finished: "已读完" } as const;
export async function papers(): Promise<Paper[]> {
  const entries = await getCollection("posts", ({data}) => !import.meta.env.PROD || !data.draft);
  return entries.sort((a,b)=>Number(b.data.pinned)-Number(a.data.pinned) || (b.data.updated ?? b.data.published).getTime()-(a.data.updated ?? a.data.published).getTime());
}
export function topicUrl(topic: string) { return url(`/categories/${encodeURIComponent(topic)}/`); }
export function tagUrl(tag: string) { return url(`/tags/${encodeURIComponent(tag)}/`); }
export function paperUrl(paper: Paper) { return getPostUrlBySlug(paper.slug); }
export function sourceFile(paper: Paper) { return `src/content/posts/${paper.id}`; }
export function dateText(value: Date) { return value.toISOString().slice(0,10).replaceAll("-", "."); }
export function topics(entries: Paper[]) { return [...new Set(entries.map(p=>p.data.category ?? "未分类"))].sort((a,b)=>a.localeCompare(b,"zh-CN")); }
