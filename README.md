# digital-humanities

这是一个基于 Vue 3 + Vite 的「数字人文多媒体案例资源库」前端项目。

## 项目介绍

“数字人文多媒体案例资源库”是一个面向全球（一期主要集中于中文世界和英文世界）的数字人文综合性资源管理与研究平台，旨在汇聚并分享已完成或正在进行的数字人文实践项目。该平台通过对大量数字人文经典案例进行多维度语义标注与聚合研究，致力于发现数字人文领域的共性、关系与规律，以支持数字人文实践与学科史的深入探讨与批判性发展。

在此项目中，“关于数字人文的数字人文”（Digital Humanities about Digital Humanities）是核心理念，即通过数字化的方式对数字人文实践案例进行整理、分析与可视化，从而支持数字人文未来的教学、科研与学科建设。同时，该资源库还为研究者提供了案例收藏、评价、创建、维护等功能，构建了一个学术共同体的共享与众建平台。

## 技术栈

- **前端框架：** [Vue 3](https://vuejs.org/)  
- **构建工具：** [Vite](https://vitejs.dev/)  
- **语言：** [TypeScript](https://www.typescriptlang.org/)  
- **样式与插件：** [UnoCSS](https://github.com/unocss/unocss)  
- **语义与本体：** 基于《数字人文领域规范词表》与《数字人文领域本体》进行语义标注与关联分析  
- **其他可选技术：** Vue Router、Pinia/Vuex 等（根据项目需求选择）

## 项目功能要点

1. **多维度案例管理：** 整合全球范围内的数字人文案例，提供结构化的检索、筛选和专题聚合功能。  
2. **语义标注与本体应用：** 基于规范词表和领域本体，为每个案例进行精准标注，实现案例的自动聚类与关联展示。  
3. **数字学术平台：** 为数字人文研究者提供案例收藏、评价、创建、维护等多种自主研究功能，支持学术共同体的协作与共享。  
4. **案例专题库：** 包括 GLAM 案例库、数字人文奖（DHA）案例库、高校案例库等，满足不同用户的专题研究需求。  
5. **批判性发展与学科史研究：** 通过大规模案例数据分析，探讨数字人文的发展规律与学科史，为教学、科研与学科建设提供参考。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) （并禁用 Vetur） + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## .vue 文件的 TypeScript 支持

TypeScript 默认无法处理 `.vue` 文件的类型信息，因此我们使用 `vue-tsc` 来进行类型检查。  
在编辑器中，需要 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 让 TypeScript 语言服务识别 `.vue` 类型。

如果你觉得独立的 TypeScript 插件速度不够，可以启用 Volar 的 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)，步骤如下：

1. 禁用内置的 TypeScript 扩展  
   1) 在 VSCode 命令面板中运行 `Extensions: Show Built-in Extensions`  
   2) 找到 `TypeScript and JavaScript Language Features`，右键选择 `Disable (Workspace)`
2. 在命令面板中运行 `Developer: Reload Window` 重载 VSCode 窗口

## 自定义配置

详见 [Vite 配置参考](https://vitejs.dev/config/)。

## 项目安装与运行

### 安装依赖

```bash
npm install
