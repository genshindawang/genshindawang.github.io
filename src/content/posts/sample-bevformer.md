---
title: "BEVFormer：多视角图像怎样变成 BEV？"
published: "2026-11-07"
updated: "2026-11-07"
category: "BEV 感知"
tags: ["BEV","Transformer","时序融合"]
status: "finished"
draft: false
isSample: true
pinned: false
paperTitle: "BEVFormer: Learning Bird’s-Eye-View Representation from Multi-Camera Images via Spatiotemporal Transformers"
paperUrl: "https://arxiv.org/abs/2203.17270"
codeUrl: "https://github.com/fundamentalvision/BEVFormer"
authors: "Zhiqi Li et al."
venue: "ECCV 2022"
description: "沿着 BEV query 的信息流，理解空间交叉注意力与历史 BEV 的时序融合。"
---

> 这是用于体验分类、公式和复习的示例笔记，不代表你的阅读记录。

## 问题：统一多相机的表示

多相机图像来自不同视角。BEVFormer 通过网格状 BEV queries，汇集空间和时间信息，为三维检测与地图分割提供统一表示。

## 两类注意力各自做什么？

- **空间交叉注意力**：让 BEV query 从相关相机视图的区域提取特征。
- **时序自注意力**：把历史 BEV 信息融合进当前表示。

可以先画一个 BEV 网格，再追踪其中一个 query 的空间取样与历史信息来源。

## 理解注意力的一条基础公式

下面是标准缩放点积注意力公式，用于复习基础；**它不是 BEVFormer 空间注意力的完整实现公式**。

$$
\operatorname{Attention}(Q,K,V) = \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

代回具体模型时，还需要核对查询构造、采样位置、相机投影和历史对齐。

## 待自己补充

历史 BEV 怎样处理自车运动？遮挡和不可见区域从哪里获得信息？这些问题需要结合原文和代码继续核对。

## 阅读来源

[BEVFormer 原论文](https://arxiv.org/abs/2203.17270) · [官方代码](https://github.com/fundamentalvision/BEVFormer) · [注意力基础公式来源](https://arxiv.org/abs/1706.03762)


## 复习问题

<details>
<summary>空间交叉注意力与时序自注意力，分别聚合哪些信息？</summary>

空间交叉注意力从多相机视图中聚合相关区域的图像特征；时序自注意力递归融合历史 BEV 信息。

</details>
