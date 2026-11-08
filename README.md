# 量子力学导论简化版

网站：https://turney0524.github.io

十二章量子力学交互课本，合计 46 个互动；第 2—12 章有实际运行的可折叠源码。

本仓库采用无构建的静态 HTML、CSS、JavaScript 与原生 MathML。

- index.html：课程书架。
- chapter-01.html 至 chapter-12.html：章节课本。
- lab.html：第一章交互实验室。
- notes.md：第一章 Markdown 笔记。
- series_models.js：后续章节物理计算模型。
- series_reader.js：控件、绘图与动画。
- .nojekyll：直接发布已有静态文件。

GitHub Pages 发布来源：main 分支，/(root)。本仓库不附原书 PDF。正文为依据 Griffiths《量子力学概论》第二版所做的独立教学重述，完整证明与习题请另行阅读原著。

数值核验：node verify.cjs 与 node verify_series.cjs，无第三方依赖。
