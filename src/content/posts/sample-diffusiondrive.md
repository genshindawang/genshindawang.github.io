---
title: "DiffusionDrive：从多模态轨迹到截断扩散"
published: "2026-11-07"
updated: "2026-11-07"
category: "生成式规划"
tags: ["Diffusion","端到端驾驶","NAVSIM"]
status: "reading"
draft: false
isSample: true
pinned: true
paperTitle: "DiffusionDrive: Truncated Diffusion Model for End-to-End Autonomous Driving"
paperUrl: "https://arxiv.org/abs/2411.15139"
codeUrl: "https://github.com/hustvl/DiffusionDrive"
authors: "Bencheng Liao et al."
venue: "CVPR 2025"
description: "为什么规划需要多种可能的轨迹？用带有驾驶先验的锚点，理解截断扩散的出发点。"
---

> 这是一篇用于体验网站的示例笔记，不代表你的阅读记录。内容依据下方原论文，未包含本地复现实验。

## 这篇论文想解决什么问题？

同一个交通场景可能有多种合理动作。扩散策略可以建模这种多样性，但反复去噪会带来计算开销。论文关注如何兼顾多种驾驶意图和实时规划。

## 方法的关键：从锚点附近开始

DiffusionDrive 使用多种驾驶模式的先验锚点，让去噪从锚定高斯分布开始，而不是从完整的纯噪声过程开始；再用级联解码器结合场景条件。

**阅读时要追踪的输入与输出：**

| 环节 | 要追踪的内容 |
| --- | --- |
| 场景编码 | 图像与车辆状态怎样变成条件特征 |
| 轨迹锚点 | 锚点来源、坐标系及其覆盖的驾驶意图 |
| 截断去噪 | 噪声如何加入、网络预测什么 |
| 候选输出 | 多条轨迹怎样评分和选择 |

## 我的理解与待核对问题

这里的“多种模式”主要指不同的驾驶行为，不能直接等同于传感器的多模态输入。复习时可以尝试画出锚点到候选轨迹的信息流。

## 阅读来源

[原论文 · arXiv:2411.15139](https://arxiv.org/abs/2411.15139) · [官方代码](https://github.com/hustvl/DiffusionDrive)


## 复习问题

<details>
<summary>截断扩散与从纯高斯噪声开始的扩散，有什么关键区别？</summary>

它引入多种驾驶模式的锚点，从锚定高斯分布开始去噪，并截断扩散日程。复习时重点解释先验锚点改变了什么，以及由此带来的覆盖范围问题。

</details>

<details>
<summary>读规划实验时，应该先核对哪些比较条件？</summary>

数据集与评测协议、输入信息、主干网络、轨迹采样预算及推理硬件。指标差异需要在条件可比时解释。

</details>
