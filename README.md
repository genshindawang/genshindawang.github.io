# tyr10n的dinner空间 · GitHub Pages

一个基于 [Fuwari](https://github.com/saicaca/fuwari) 的自动驾驶论文阅读博客。横幅与头像使用逢坂大河主题插画。

发布后地址：https://genshindawang.github.io/

## 日常用在线写作后台

打开博客的 [写作空间](https://genshindawang.github.io/admin/)，进入 [Pages CMS 后台](https://app.pagescms.org/genshindawang/genshindawang.github.io/main/collection/papers)。标题、分类和阅读状态用表单填写，正文在编辑器里写；保存会自动提交到 GitHub 并触发发布。

首次使用：用 GitHub 登录 Pages CMS，并在安装 GitHub App 时选择 **Only select repositories**，只授权 `genshindawang.github.io`。此授权需要账号所有者完成。以后无需手动编辑文件头、起文件名、运行 Git 或填写 access token。

**写笔记**：首页“写笔记”进入新建表单；文章页“编辑这篇笔记”进入该篇表单。点击 Save 即保存并开始自动发布。**待读清单**：阅读状态选择「待读」「正在读」或「已读完」，不用移动文件。分类自由填写，会自动生成分类页。正文图片上传到 `public/uploads/`。

带 LaTeX 公式、HTML details 折叠自测等特殊 Markdown 的正文，请用编辑器的 **Source** 模式编辑和保存，避免普通富文本排版改写这些语法。后台字段和媒体目录由根目录 `.pages.yml` 配置；它不包含凭证。

## Markdown 格式（供本地写作使用）

每篇论文仍在 `src/content/posts/` 里对应一个 `.md` 文件。后台与本地写作使用同一份内容，已有格式不变。例如：

```yaml
---
title: "DiffusionDrive：我的阅读笔记"
published: 2026-11-07
category: "生成式规划"
tags: [Diffusion, Planning]
status: reading
draft: false
isSample: false
paperTitle: "DiffusionDrive: Truncated Diffusion Model for End-to-End Autonomous Driving"
paperUrl: "https://arxiv.org/abs/2411.15139"
codeUrl: "https://github.com/hustvl/DiffusionDrive"
description: "这里写一句话摘要。"
---

## 问题

这里写正文……
```

`draft: true` 只阻止文章出现在生成的网站中。公开仓库中的源文件仍然可以被别人读取，私密内容不要提交到公开仓库。

## 用本地编辑器写作

需要 Node.js 24 与 pnpm 11.25.0。推荐 VS Code 或 Typora 编辑 Markdown。

```powershell
pnpm install
pnpm new-post my-paper
# 待读论文也可以用 pnpm new-queue my-paper
pnpm dev
```

开发预览：http://127.0.0.1:4324/ 。本地开发会显示草稿。正式搜索索引由构建生成，用下面的方式预览搜索和正式排版：

```powershell
pnpm check
pnpm build
pnpm test:static
pnpm preview
```

构建预览：http://127.0.0.1:4325/ 。写完后提交：

```powershell
git add src/content/posts
git commit -m "Add paper reading notes"
git push
```

## 图片、公式、代码

可把一篇笔记放在文件夹中：`src/content/posts/my-paper/index.md`，同目录放 `figure.png`，正文用 `![图注](./figure.png)` 引用。支持行内 `$x^2$`、两行 `$$` 包围的公式、表格、代码块和 HTML details 折叠自测答案。完整模板见 `templates/paper.md`。

## 名称与配图

- `src/config.ts`：博客名称、导航、头像、横幅、主题色。
- `src/data/notebook.ts`：首页寄语、GitHub 仓库和分支。
- `public/taiga-study.png`：当前主题插画。
- `src/content/posts/sample-*.md`：三篇明确标注的示例，可直接改写或删除。

## 第一次发布

1. 将源码放入 `genshindawang/genshindawang.github.io` 仓库，主分支为 `main`。
2. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 推送源码，或在 Actions 中手动运行 **Deploy blog to GitHub Pages**。
4. 构建和发布通过后访问 https://genshindawang.github.io/ 。

工作流使用官方 Astro Action，包含类型检查、静态构建、链接检查和 Pages 发布。公开仓库可使用 GitHub Pages 免费托管。该项目生成纯静态文件，没有数据库和登录后台。

## 导入上一版的个人笔记

上一版站点仍保留。先在原站“空间管理”中导出 JSON，在本地运行：

```powershell
pnpm import-notes E:/path/to/dinner-notes.json
```

导入器只新增 `imported-<ID>.md` 文件，重复导入不会覆盖。所有导入内容默认是 **草稿**，需要检查后才能公开。旧站的 `/api/images/` 链接依赖原账号，请下载这些图片放到笔记旁并换成相对链接；JSON 不包含图片文件。不要把导入的私密草稿推送到公开仓库。

## 来源

直接沿用 Fuwari 的主网格、侧栏、主题样式与 Markdown 渲染，使用 MIT 许可，见 LICENSE 和 UPSTREAM.md。此版本恢复以 Markdown 为数据源，保留分类、论文详情、待读清单、全文搜索和复习问题。
