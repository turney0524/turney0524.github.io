---
{"slug":"ssh-reading","title":"经典回读：从聚乙炔到交替跃迁链","category":"papers","summary":"以 Su、Schrieffer 和 Heeger 的 1979 年论文为入口，用一个可计算的两带模型理解二聚化与能隙。","date":"2026-11-08","tags":["经典文献","SSH 模型"],"minutes":9,"label":"经典回读 · 1979"}
---
<div class="citation-box"><span>文献卡片 / CLASSIC PAPER</span><h2>Solitons in Polyacetylene</h2><p>W. P. Su, J. R. Schrieffer, A. J. Heeger<br>Physical Review Letters <strong>42</strong>, 1698 (1979)</p><a href="https://doi.org/10.1103/PhysRevLett.42.1698" target="_blank" rel="noopener">原文与 DOI ↗</a></div>

这是一次经典文献回读，不是近期研究新闻。原论文研究长链多烯中的孤子形成及相关能量、长度和运动特性；下面用简化的交替跃迁链建立阅读入口。本文的公式为教学模型推导，不代替原文完整的晶格自洽计算。[论文摘要与出版信息](https://doi.org/10.1103/PhysRevLett.42.1698)。

## 1. 为什么从两种键开始

考虑每个原胞有 A、B 两个格点，胞内跃迁为 $t_1$，胞间跃迁为 $t_2$。先固定晶格，不考虑自旋、相互作用与晶格动力学：

$$
H=\sum_j(t_1a_j^\dagger b_j+t_2b_j^\dagger a_{j+1}+\mathrm{h.c.}).
$$

两种不同的键让一个原胞包含两个自由度。在动量空间，取原胞长度为 1：

$$
H(k)=\begin{pmatrix}0&t_1+t_2e^{-ik}\\t_1+t_2e^{ik}&0\end{pmatrix}.
$$

## 2. 两行代数给出能带

记 $q=t_1+t_2e^{-ik}$，特征方程为 $E^2-|q|^2=0$。所以

$$
E_\pm(k)=\pm\sqrt{t_1^2+t_2^2+2t_1t_2\cos k}.
$$

当 $t_1,t_2>0$ 时，k=π 的带隙为 $2|t_1-t_2|$。相同的跃迁对应闭隙点；交换强弱键会重新打开带隙，却可能改变给定终止方式下的边界态。

<div class="inline-ssh" data-ssh><div class="plot-title"><strong>改变一条键，观察能带</strong><span>固定 t₂=1 · 无量纲能量</span></div><canvas aria-label="交替跃迁链能带图"></canvas><label>胞内跃迁 t₁ <output>0.60</output><input type="range" min="0.1" max="1.9" step="0.01" value="0.6"></label><p class="plot-readout" aria-live="polite"></p></div>

## 3. 一个原点周围的绕行

把矩阵写为 $H=d_x\sigma_x+d_y\sigma_y$，其中 $d_x=t_1+t_2\cos k$、$d_y=t_2\sin k$。k 走过一个布里渊区，$(d_x,d_y)$ 描出半径 $t_2$、圆心 $(t_1,0)$ 的圆。

在固定的原胞与手征对称约定下，$t_2>t_1$ 时该圆包围原点；$t_2<t_1$ 时不包围。边界态的判断还必须指定实际切断的是哪一条键。这个简单圆图把“是否有能隙”和“在同一约定下属于哪种相”区分开来。

## 4. 读回原论文时追问什么

- 晶格形变如何改变电子跃迁，而不是外部直接指定两种键？
- 两种二聚化构型之间的畴壁如何形成？
- 单粒子谱中的中隙态与孤子的电荷、自旋如何联系？
- 哪些结论来自冻结晶格模型，哪些需要电子—晶格耦合和占据情况？

本页只推导了均匀交替链的能带，不声称已经复现孤子的形成能或动力学。要复现这些量，需要回到原文的具体模型与计算。

## 从文献走到计算

[下一步：用 NumPy 构造有限开链](numpy-ssh.html)，在明确的边界条件下查看近零能态和空间分布。
