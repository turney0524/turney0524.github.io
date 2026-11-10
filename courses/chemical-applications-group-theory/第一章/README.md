# 第一章 · 绪论：动态伴读

## 直接打开

双击 `第一章_绪论_动态课本.html` 或 `index.html`。两者相同，均内置全部样式、数学公式、模型和交互程序，不需要网络、插件、npm 或 Python。浏览器需支持现代 JavaScript、Canvas 与原生 MathML。

推荐流程：阅读一个问题 → 先预测 → 调滑块或选项 → 看图与计算结果 → 展开源码 → 返回推导。

## 内容依据


- `../../Chemical-Applications-of-Group-Theory.pdf`：书页3–5，对应PDF第12–14页。
- `../../群论在化学中的应用.pdf`：书页3–4，对应PDF第18–19页。

以上路径以本文件所在的“第一章”目录为基准。`核对资料/` 内是核对时生成的私人中间资料，不是课程发布资源。第一章原为简短绪论，无编号小节和公式；教程用独立表述覆盖原章论点，以八组原创模型扩展教学。正文末有主题与页码对应。

## 文件

- `第一章_绪论.md`：完整 Markdown 正文，可用于后续编辑。
- `assets/physics.js`：浏览器和 Node 可共用的纯数值核心。
- `assets/chapter.js`：Canvas、控件、暂停、交互、源码折叠等。
- `assets/chapter.css`：奶油白、藏蓝与金色主题，桌面与手机布局。
- `examples.py`：可独立运行的 NumPy 复现，包括双轨道、四轨道环、跃迁积分、水的模式和点阵干涉。
- `source/build.py`：由 Markdown、样式和程序生成内置资源的 HTML。
- `source/verify.cjs`：验证解析谱、本征方程残差、正交性、积分、零模、对称性和干涉极值。

## 复现和重建

```sh
# 运行数值核验（无需第三方 Node 包）
node source/verify.cjs

# 运行独立 Python 算例
python -m pip install numpy
python examples.py

# 改完 Markdown / JS / CSS 后重建成品
python -m pip install markdown2 latex2mathml
python source/build.py
```

构建器对本机既有临时库路径做兼容检测；标准 pip 安装后也可以直接运行。HTML 成品不依赖这些临时库路径。

## 模型范围

所有模型使用教学单位。双轨道与四轨道环不拟合真实分子；选择定则面板的奇偶混合是独立设置；晶场是单电子八面体示意；振动由内部坐标谐势的质量加权 Hessian 求得，频率不是实验波数；点阵为一维单散射模型。各面板均注明假设。

本章已作为全书课程的一部分发布在课本蒸馏栏目，并加入群论合集。
