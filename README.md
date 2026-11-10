# 计算凝聚态物理

公众号「计算凝聚态物理」的开放学习站。

网站：**https://turney0524.github.io/**

## 内容入口

- [课本蒸馏](https://turney0524.github.io/textbooks.html)：量子力学详细第二版与《群论在化学中的应用》全书动态伴读。
- [知识笔记](https://turney0524.github.io/notes.html)：概念、公式推导与日常知识。
- [科研进展](https://turney0524.github.io/papers.html)：文献报告与标明年份的经典回读。
- [开源软件](https://turney0524.github.io/software.html)：工具使用与可运行的模型代码。
- [合集](https://turney0524.github.io/collections.html)：按主题与学习顺序组织内容。

现有量子力学课程的 `v2-index.html`、`v2-chapter-01.html` 等网址保留。初版书架为 `quantum-v1.html`，原有 `chapter-01.html` 等网址也保留。

## 日常发布：写 Markdown，然后推送

网站已经配置 GitHub Actions 构建。每次向 `main` 推送，自动读取文章、生成页面、检查链接，再部署 GitHub Pages。无需手动修改首页 HTML 或上传构建文件。

1. 复制 `content/_template.md`，改名并放到对应目录：
   - `content/notes/`：知识笔记，`category` 写 `notes`。
   - `content/papers/`：科研进展，`category` 写 `papers`。
   - `content/software/`：开源软件，`category` 写 `software`。
2. 文件开头两条 `---` 之间填写 JSON 元数据：标题、唯一的英文 `slug`、摘要、日期、标签和预计阅读时间。不要保留模板名开头的 `_`，这种文件不参与发布。
3. 在第二条 `---` 后写正文。支持标题、列表、链接、引用、代码块、行内 `$...$` 和独立 `$$...$$` 公式。
4. 提交并推送：

```sh
git add content/
git commit -m "Add a new physics note"
git push origin main
```

新文章自动出现在对应栏目、最近整理、搜索与 RSS 中。不要复用已有 slug。文献报告请列原文 DOI/链接并明确论文发表年份；代码示例列明边界条件、单位和运行依赖。

## 管理合集

编辑 `content/collections.json`。每个合集的 `items` 是有顺序的阅读节点，格式为：

```json
["notes", "先理解对称性", "这一节点的学习目的", "articles/bloch.html", "Bloch 定理"]
```

依次为栏目、阶段标题、说明、站内链接、文章标题。`slug` 决定合集网址 `collection-<slug>.html`。添加合集后也会自动生成总列表与详情页。

课本是独立长篇 HTML，目前量子力学沿用原有文件。增加另一部课本时，在构建器的课本数据与展示区域注册入口；不需要把整本课本写成一篇笔记。

## 本地预览与验证

推荐使用虚拟环境：

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-site.txt
python scripts/build_site.py
python scripts/check_links.py
python -m http.server 8000
```

打开 http://localhost:8000 。构建只需要两个 Python 库；公开页面使用本地 CSS/JavaScript、原生 MathML 与 Canvas，无外部字体或 CDN。

- `site.css`：全站排版、手机布局与文章样式。
- `site.js`：搜索、主题筛选、代码复制、手机导航、SSH 能带交互。
- `scripts/build_site.py`：文章和栏目生成器。
- `scripts/check_links.py`：站内链接、锚点、公式与 XML 检查。
- `scripts/prepare_pages.py`：只收集公开资源到 `_site/`。
- `.github/workflows/publish.yml`：自动构建与部署。
- `examples/ssh_chain.py`：NumPy SSH 开链示例。

## 内容说明

本次网站整理稿包括三篇知识笔记、一篇经典文献的模型入口与一篇 NumPy 实战，不代表已经导入历史公众号文章。量子力学为依据所提供 Griffiths 第二版中文译本独立编写的伴读，公开仓库不附原书 PDF，也不含全部章末习题答案。每篇新增文章应按自己的来源保留引用。


## 群论在化学中的应用

课程位于 `courses/chemical-applications-group-theory/`，共11章、84组交互，列入课本蒸馏和群论合集。独立教程与交互代码随Pages构建发布，公开版不含整页教材扫描，运行不依赖CDN。全站搜索收录课程和11章入口。

更新本地审定稿后，执行 `python3 scripts/import_cotton.py <教材蒸馏目录>`，再构建、检查和推送。导入排除压缩包、制作过程OCR、缓存和预览截图。
